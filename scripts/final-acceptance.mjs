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
  for (const copy of ["코딩 없이", "말 한마디에서", "이런 분께 추천합니다", "무엇을 만들 수 있나요?", "4주 동안 하나의", "처음 시작하는 사람을 위한 실전 클래스"]) {
    assert(html.includes(copy), `콘텐츠 요청 결과 누락: ${copy}`);
  }
  console.log("✓ 요청 1 — 메인 콘텐츠와 작업 흐름");

  for (const copy of ["4주 후에는", "4주 실전 클래스 신청하기", "50,000원", "클래스 신청하기"]) {
    assert(html.includes(copy), `메인 교육과정 연결 누락: ${copy}`);
  }
  console.log("✓ 메인 랜딩페이지와 교육과정 연결");

  for (const copy of ["처음 한 번만,", "ChatGPT", "Codex", "GitHub", "Vercel", "Supabase"]) {
    assert(html.includes(copy), `작업환경 준비 안내 누락: ${copy}`);
  }
  console.log("✓ 작업환경 준비와 선택 기능 안내");

  const courseHtml = await (await fetchRequired("/course", "text/html")).text();
  for (const copy of ["4주 뒤, 직접 만든", "당근에서 자리 문의하기", "지금 할 일", "4주 과정 문의", "남은 자리 안내받기", "4주 뒤 내 손에 남는 것", "내 주제의 반응형 홈페이지", "실제로 열리는 운영 URL", "최대 8명 소규모 수업 문의하기", "수업에서 배우는 제작 방식", "바이브코딩 흐름 안내", "2시간 수업표", "GitHub 저장소 생성·첫 Push", "수업이 끝날 때마다 기록합니다.", "첫 커밋과 Push 실습", "1기의 과정이", "2기 사전 관심 접수", "공개 자료 준비 중", "동의하지 않아도 불이익이 없습니다.", "1기 교육이 진행 중입니다.", "50,000원", "별도의 장소 이용료 없이", "오후 6시 정시 시작", "건물 주차 가능", "커피긱스 2층 8인룸", "자리 확인 후 신청 확정", "이 페이지에서는 이름·전화번호·이메일을 수집하거나 공개하지 않습니다.", "당근 모임에서 문의하기"]) {
    assert(courseHtml.includes(copy), `4주 교육과정 페이지 누락: ${copy}`);
  }
  console.log("✓ 4주 교육과정 페이지와 1기 진행 정보");

  for (const id of ["progress", "records", "curriculum", "next-cohort", "information", "recruitment"]) {
    assert(courseHtml.includes(`id="${id}"`), `교육과정 이동 대상 누락: #${id}`);
  }
  for (const href of ["map.kakao.com/link/search", "www.daangn.com/kr/group/"]) {
    assert(courseHtml.includes(href), `교육과정 외부 링크 누락: ${href}`);
  }
  assert(!courseHtml.includes("coffee922ks"), "운영 페이지에 Wi-Fi 비밀번호가 노출됐습니다.");
  const courseCss = await readFile(new URL("../src/app/course/course.module.css", import.meta.url), "utf8");
  const selectorSource = await readFile(new URL("../src/app/course-selector.tsx", import.meta.url), "utf8");
  assert(courseCss.includes("@media(max-width:900px)") && courseCss.includes("@media(max-width:600px)"), "교육과정 반응형 기준이 누락됐습니다.");
  for (const marker of ["aria-expanded", "aria-controls", "Escape"]) {
    assert(selectorSource.includes(marker), `교육과정 선택 메뉴 접근성 누락: ${marker}`);
  }
  console.log("✓ 교육과정 링크, 반응형, 선택 메뉴 접근성과 비밀정보 비노출");

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
