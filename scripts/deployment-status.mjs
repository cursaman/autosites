import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("../deployment-target.json", import.meta.url), "utf8"));
const headers = { Accept: "application/vnd.github+json", "User-Agent": "AutoSites-deployment-status" };

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function getJson(url) {
  const response = await fetch(url, { headers });
  assert(response.ok, `상태 조회 실패: ${url} (HTTP ${response.status})`);
  return response.json();
}

try {
  const localBranch = execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim();
  const localSha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  assert(localBranch === config.branch, `현재 브랜치가 ${config.branch}이 아닙니다: ${localBranch}`);

  const commit = await getJson(`https://api.github.com/repos/${config.repository}/commits/${config.branch}`);
  assert(localSha === commit.sha, `로컬 HEAD와 GitHub ${config.branch}가 다릅니다.`);

  const combinedStatus = await getJson(`https://api.github.com/repos/${config.repository}/commits/${commit.sha}/status`);
  const productionStatus = combinedStatus.statuses.find((status) => status.context === config.vercelStatusContext);
  assert(productionStatus, `${config.vercelProject}의 Vercel 상태를 찾지 못했습니다.`);
  assert(productionStatus.state === "success", `Vercel 상태가 success가 아닙니다: ${productionStatus.state}`);

  const [homepage, health] = await Promise.all([
    fetch(config.productionUrl),
    fetch(new URL("/api/health", config.productionUrl)),
  ]);
  assert(homepage.ok, `운영 홈페이지 응답 실패: HTTP ${homepage.status}`);
  assert(health.ok, `운영 상태 확인 실패: HTTP ${health.status}`);
  assert((await homepage.text()).includes("코딩 없이"), "운영 홈페이지의 필수 문구가 최신 상태가 아닙니다.");

  const vercelContexts = combinedStatus.statuses.filter((status) => status.context.startsWith("Vercel"));
  console.log(`✓ GitHub ${config.branch}: ${commit.sha.slice(0, 7)}`);
  console.log(`✓ Vercel ${config.vercelProject}: ${productionStatus.state.toUpperCase()}`);
  console.log(`✓ 운영 주소: ${config.productionUrl}`);
  console.log("✓ GitHub 커밋과 운영 배포 상태 일치");
  if (vercelContexts.length > 1) {
    const duplicates = vercelContexts.filter((status) => status.context !== config.vercelStatusContext).map((status) => status.context);
    console.warn(`! 중복 Vercel 연결 감지: ${duplicates.join(", ")}`);
  }
} catch (error) {
  console.error(`✗ 배포 상태 확인 실패: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
}
