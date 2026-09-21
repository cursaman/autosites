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
  for (const copy of ["코딩 없이", "내 홈페이지", "2기 모집 중", "선행 지식 필요 없음", "막히는 지점이 정해져 있기에", "설명보다", "MOVIEBOX", "실제 작품 열어보기", "매주 하나씩, 필요한 것만 배웁니다.", "결정에 필요한 정보만", "신청 전에 확인하세요."]) {
    assert(html.includes(copy), `콘텐츠 요청 결과 누락: ${copy}`);
  }
  console.log("✓ 요청 1 — 메인 콘텐츠와 작업 흐름");

  for (const copy of ["당근에서 편하게 물어보기", "80,000원", "무료 API 실습자료 보기"]) {
    assert(html.includes(copy), `메인 교육과정 연결 누락: ${copy}`);
  }
  console.log("✓ 메인 랜딩페이지와 교육과정 연결");

  assert(html.includes("준비작업") && html.includes("준비 안내"), "메인 작업환경 안내 연결이 없습니다.");
  assert(html.indexOf("1일 체험") < html.indexOf("준비작업"), "준비작업 메뉴가 1일 체험 다음에 있지 않습니다.");
  assert(html.indexOf("1일 체험") < html.indexOf("클래스 소개"), "1일 체험 메뉴가 클래스 소개 앞에 있지 않습니다.");
  const setupHtml = await (await fetchRequired("/setup", "text/html")).text();
  for (const copy of ["처음 한 번만,", "ChatGPT 가입", "Codex", "GitHub", "Vercel", "Supabase — 로그인·DB가 필요할 때만"]) {
    assert(setupHtml.includes(copy), `작업환경 준비 안내 누락: ${copy}`);
  }
  console.log("✓ 별도 작업환경 준비 페이지와 선택 기능 안내");

  assert(html.includes("1일 체험"), "메인 메뉴에 1일 체험 연결이 없습니다.");
  const experienceHtml = await (await fetchRequired("/experience", "text/html")).text();
  for (const copy of ["AI와 함께 2시간 만에", "하루 2시간 체험 진행표", "2시간 뒤,", "인터넷 주소로 공개", "체험 일정 물어보기", "AI 애니메이션 앨범", "지브리풍 이미지로 변환", "정사각형·세로형·가로형", "앨범 주소 공개", "ChatGPT에는 이렇게", "HTML + CSS + JavaScript", "백엔드는 사용하지 않아"]) {
    assert(experienceHtml.includes(copy), `2시간 체험 페이지 누락: ${copy}`);
  }
  console.log("✓ 하루 2시간 체험 페이지와 별도 메뉴");

  const resourcesHtml = await (await fetchRequired("/resources", "text/html")).text();
  for (const copy of ["막막한 API 연결,", "이 순서대로 시작하면 됩니다.", "무료 실습자료", "추천 대상", "난이도", "영화·여행 사이트 소스", "MOVIEPIK 영화 사이트 소스", "TRIP 여행 사이트 소스", "API 키 제거 완료"]) {
    assert(resourcesHtml.includes(copy), `무료 자료실 누락: ${copy}`);
  }
  console.log("✓ 무료 자료실과 단계별 다운로드 안내");

  const courseHtml = await (await fetchRequired("/course", "text/html")).text();
  for (const copy of ["4주 뒤, 직접 만든", "당근에서 남은 자리 문의하기", "지금 할 일", "4주 과정 문의", "남은 자리 안내받기", "4주 뒤 내 손에 남는 것", "내 주제의 반응형 홈페이지", "실제로 열리는 운영 URL", "수업에서 배우는 제작 방식", "바이브코딩 흐름 안내", "채팅 요청부터 실제 배포까지", "AutoSites 운영자", "2시간 수업표", "GitHub 저장소 생성·첫 Push", "수업이 끝날 때마다 기록합니다.", "첫 커밋과 Push 실습", "1기의 과정이", "MOVIEBOX", "1기 수강생 작품 · 운영 중", "수강생 작품 보기", "2기 모집 안내", "2기는 10월 10일 토요일에 시작합니다.", "2026. 10. 10–10. 31", "2기 남은 자리 문의하기", "공개 자료 준비 중", "동의하지 않아도 불이익이 없습니다.", "1기 4주 과정을 수료했습니다.", "1기 4주 과정 수료 완료", "100%", "80,000원", "별도의 장소 이용료 없이", "오후 6시 정시 시작", "건물 주차 가능", "커피긱스 2층 8인룸", "자리 확인 후 신청 확정", "이 페이지에서는 이름·전화번호·이메일을 수집하거나 공개하지 않습니다."]) {
    assert(courseHtml.includes(copy), `4주 교육과정 페이지 누락: ${copy}`);
  }
  console.log("✓ 4주 교육과정 페이지와 1기 진행 정보");

  for (const id of ["progress", "records", "curriculum", "next-cohort", "information", "recruitment"]) {
    assert(courseHtml.includes(`id="${id}"`), `교육과정 이동 대상 누락: #${id}`);
  }
  for (const href of ["map.kakao.com/link/search", "www.daangn.com/kr/group/"]) {
    assert(courseHtml.includes(href), `교육과정 외부 링크 누락: ${href}`);
  }
  assert(courseHtml.includes("bb-movie-rho.vercel.app"), "1기 수강생 작품 운영 링크가 없습니다.");
  assert(!courseHtml.includes("coffee922ks"), "운영 페이지에 Wi-Fi 비밀번호가 노출됐습니다.");
  const courseCss = await readFile(new URL("../src/app/course/course.module.css", import.meta.url), "utf8");
  const selectorSource = await readFile(new URL("../src/app/course-selector.tsx", import.meta.url), "utf8");
  assert(courseCss.includes("@media(max-width:900px)") && courseCss.includes("@media(max-width:600px)"), "교육과정 반응형 기준이 누락됐습니다.");
  for (const marker of ["aria-expanded", "aria-controls", "Escape"]) {
    assert(selectorSource.includes(marker), `교육과정 선택 메뉴 접근성 누락: ${marker}`);
  }
  console.log("✓ 교육과정 링크, 반응형, 선택 메뉴 접근성과 비밀정보 비노출");

  // Request 2: simplified enrollment journey and responsive design source.
  for (const marker of ["id=\"about\"", "2기 클래스 핵심 정보", "클래스 검증 정보", "무료 API 실습자료 보기"]) {
    assert(html.includes(marker), `단순화된 신청 흐름 누락: ${marker}`);
  }
  const css = await readFile(new URL("../src/app/home.module.css", import.meta.url), "utf8");
  assert(css.includes("@media(max-width:900px)") && css.includes("@media(max-width:600px)"), "반응형 기준이 누락됐습니다.");
  console.log("✓ 요청 2 — 단순화된 신청 흐름과 반응형 디자인");

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
  for (const key of ["title", "description", "ogImage"]) {
    assert(template.seo[key], `고객 템플릿 seo.${key} 누락`);
  }
  assert(Array.isArray(template.pages) && template.pages.length > 0, "고객 템플릿 공개 페이지 구성이 없습니다.");
  for (const key of ["verifiedFacts", "approvedAssets", "privateInformation"]) {
    assert(Array.isArray(template.publishing[key]), `고객 템플릿 publishing.${key} 목록 누락`);
  }
  await access(new URL("../CUSTOMER_SITE_TEMPLATE.md", import.meta.url));
  console.log("✓ 새 고객 설정 템플릿과 복제 절차");
  console.log("✓ 10일 전체 시나리오 최종 검수 통과");
} catch (error) {
  console.error(`✗ 최종 인수 검사 실패: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
}
