import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const port = process.env.SITE_VERIFY_PORT ?? "3199";
const baseUrl = `http://127.0.0.1:${port}`;
const output = [];

const server = spawn(process.execPath, [nextBin, "start", "-p", port], {
  cwd: projectRoot,
  env: { ...process.env, NEXT_PUBLIC_APP_URL: baseUrl },
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", (chunk) => output.push(chunk.toString()));
server.stderr.on("data", (chunk) => output.push(chunk.toString()));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error("검증 서버를 시작하지 못했습니다.");
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return response;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("검증 서버가 30초 안에 응답하지 않았습니다.");
}

async function fetchRequired(pathname, expectedType) {
  const response = await fetch(`${baseUrl}${pathname}`);
  assert(response.ok, `${pathname} 응답 실패: HTTP ${response.status}`);
  assert(response.headers.get("content-type")?.includes(expectedType), `${pathname} 콘텐츠 형식이 ${expectedType}이 아닙니다.`);
  return response;
}

try {
  const homeResponse = await waitForServer();
  const html = await homeResponse.text();
  const requiredCopy = [
    "말로 요청하면,",
    "대화에서 배포까지,",
    "처음 한 번만,",
    "로그인·DB·CRUD",
    "교육과정 전체 보기",
    "주제가 달라지면,",
    "이렇게 요청하면 됩니다.",
    "자주 묻는 질문",
  ];

  for (const copy of requiredCopy) assert(html.includes(copy), `필수 문구 누락: ${copy}`);

  for (const marker of ["rel=\"canonical\"", "property=\"og:image\"", "name=\"twitter:card\""]) {
    assert(html.includes(marker), `SEO 메타정보 누락: ${marker}`);
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const hashLinks = [...html.matchAll(/\shref="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of hashLinks) assert(ids.has(target), `연결 대상이 없는 내부 링크: #${target}`);

  const [robots, sitemap, socialImage] = await Promise.all([
    fetchRequired("/robots.txt", "text/plain"),
    fetchRequired("/sitemap.xml", "application/xml"),
    fetchRequired("/og.png", "image/png"),
  ]);
  assert((await robots.text()).includes("Disallow: /api/"), "robots.txt의 API 차단 규칙이 없습니다.");
  assert((await sitemap.text()).includes("<urlset"), "sitemap.xml 형식이 올바르지 않습니다.");
  assert((await fetchRequired("/course", "text/html")).ok, "/course 페이지를 열 수 없습니다.");
  assert(Number(socialImage.headers.get("content-length") ?? 0) > 0, "공유 이미지가 비어 있습니다.");

  const runtimeOutput = output.join("");
  assert(!/(TypeError|ReferenceError|Unhandled|Internal Server Error)/i.test(runtimeOutput), "서버 실행 중 오류가 발견됐습니다.");
  console.log(`✓ 필수 문구 ${requiredCopy.length}개`);
  console.log(`✓ 내부 링크 ${hashLinks.length}개`);
  console.log("✓ SEO 메타정보, robots.txt, sitemap.xml, 공유 이미지");
  console.log("✓ 프로덕션 서버 응답 및 런타임 오류 검사");
} catch (error) {
  console.error(`✗ 홈페이지 자동 검증 실패: ${error instanceof Error ? error.message : error}`);
  const runtimeOutput = output.join("").trim();
  if (runtimeOutput) console.error(runtimeOutput);
  process.exitCode = 1;
} finally {
  server.kill();
}
