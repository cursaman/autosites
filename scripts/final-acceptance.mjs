import { execFileSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";

const deployment = JSON.parse(await readFile(new URL("../deployment-target.json", import.meta.url), "utf8"));
const template = JSON.parse(await readFile(new URL("../templates/customer-site.example.json", import.meta.url), "utf8"));
const requiredCommits = ["45949e0", "07d3eac", "07bd809"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertCommitIncluded(sha) {
  execFileSync("git", ["merge-base", "--is-ancestor", sha, "HEAD"], { stdio: "ignore" });
}

async function fetchRequired(pathname, expectedType) {
  const response = await fetch(new URL(pathname, deployment.productionUrl));
  assert(response.ok, `${pathname} 응답 실패: HTTP ${response.status}`);
  assert(response.headers.get("content-type")?.includes(expectedType), `${pathname} 형식이 ${expectedType}이 아닙니다.`);
  return response;
}

try {
  for (const sha of requiredCommits) assertCommitIncluded(sha);

  const homepageResponse = await fetchRequired("/", "text/html");
  const html = await homepageResponse.text();

  // Request 1: homepage content and workflow landing page.
  for (const copy of ["말로 요청하면,", "대화에서 배포까지,", "이렇게 요청하면 됩니다."]) {
    assert(html.includes(copy), `콘텐츠 요청 결과 누락: ${copy}`);
  }
  console.log("✓ 요청 1 — 메인 콘텐츠와 작업 흐름");

  for (const copy of ["처음 한 번만,", "각 서비스는 이런 역할을 합니다.", "프론트·백엔드 배포", "로그인·DB·CRUD", "Supabase — 로그인·DB가 필요할 때만"]) {
    assert(html.includes(copy), `작업환경 준비 안내 누락: ${copy}`);
  }
  console.log("✓ 작업환경 준비와 선택 기능 안내");

  // Request 2: visual showcase and responsive design source.
  assert(html.includes("주제가 달라지면,"), "제작 사례 제목이 없습니다.");
  assert(html.includes("카페, 전문 컨설팅, 크리에이티브 포트폴리오"), "제작 사례 이미지 대체 텍스트가 없습니다.");
  await fetchRequired("/images/autosites-showcase.png", "image/png");
  const css = await readFile(new URL("../src/app/home.module.css", import.meta.url), "utf8");
  assert(css.includes("@media(max-width:900px)") && css.includes("@media(max-width:600px)"), "반응형 기준이 누락됐습니다.");
  console.log("✓ 요청 2 — 제작 사례 이미지와 반응형 디자인");

  // Request 3: SEO, accessibility, and production endpoints.
  for (const marker of ["rel=\"canonical\"", "property=\"og:image\"", "name=\"twitter:card\"", "본문으로 바로가기"]) {
    assert(html.includes(marker), `SEO·접근성 요청 결과 누락: ${marker}`);
  }
  await Promise.all([
    fetchRequired("/robots.txt", "text/plain"),
    fetchRequired("/sitemap.xml", "application/xml"),
    fetchRequired("/og.png", "image/png"),
    fetchRequired("/api/health", "application/json"),
  ]);
  console.log("✓ 요청 3 — SEO, 접근성과 운영 상태");

  for (const key of ["slug", "brandName", "industry", "primaryGoal", "targetCustomer"]) {
    assert(template.project[key], `고객 템플릿 project.${key} 누락`);
  }
  for (const key of ["repository", "branch", "vercelProject", "productionUrl"]) {
    assert(template.operations[key], `고객 템플릿 operations.${key} 누락`);
  }
  await access(new URL("../CUSTOMER_SITE_TEMPLATE.md", import.meta.url));
  console.log("✓ 새 고객 설정 템플릿과 복제 절차");
  console.log("✓ 10일 전체 시나리오 최종 검수 통과");
} catch (error) {
  console.error(`✗ 최종 인수 검사 실패: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
}
