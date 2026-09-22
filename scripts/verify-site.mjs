import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
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
    "아이디어를 나누면,",
    "홈페이지가 세상에 나옵니다.",
    "Codex 제작",
    "요청 한 문장이 운영 사이트가 되는 순서",
    "도구는 어려운 이름보다",
    "이렇게 요청하면 됩니다.",
    "Codex 질문 예시 전체 보기",
    "바로 올리지 않고,",
    "준비작업 시작하기",
    "AutoSites 소개 보기",
  ];

  for (const copy of requiredCopy) assert(html.includes(copy), `필수 문구 누락: ${copy}`);
  assert(html.includes("준비작업"), "메인 메뉴에 준비작업 링크가 없습니다.");
  assert(html.includes('<a href="/ai-guide"><span>AI 도구 비교</span>'), "메인 메뉴에 AI 도구 비교 링크가 없습니다.");
  assert(html.includes('<a href="/ai-links"><span>AI 링크 허브</span>'), "메인 메뉴에 AI 링크 허브가 없습니다.");
  assert(html.includes('<a href="/course"><span>4주 교육과정</span>'), "상단 메뉴의 4주 교육과정이 페이지 상단으로 연결되지 않습니다.");
  assert(html.indexOf("1일 체험") < html.indexOf("준비작업"), "준비작업 메뉴가 1일 체험 다음에 있지 않습니다.");
  assert(html.indexOf("1일 체험") < html.indexOf("AutoSites 소개"), "1일 체험 메뉴가 AutoSites 소개 앞에 있지 않습니다.");

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
  for (const imagePath of ["/images/hero/ai-idea-animation-v2.webp", "/images/hero/ai-build-animation-v2.webp", "/images/hero/ai-deploy-animation-v2.webp", "/images/autosites-showcase.webp"]) {
    await fetchRequired(imagePath, "image/webp");
  }
  assert((await robots.text()).includes("Disallow: /api/"), "robots.txt의 API 차단 규칙이 없습니다.");
  const sitemapXml = await sitemap.text();
  assert(sitemapXml.includes("<urlset"), "sitemap.xml 형식이 올바르지 않습니다.");
  assert(sitemapXml.includes("/course"), "sitemap.xml에 교육과정 페이지가 없습니다.");
  assert(sitemapXml.includes("/about"), "sitemap.xml에 AutoSites 소개 페이지가 없습니다.");
  assert(sitemapXml.includes("/experience"), "sitemap.xml에 2시간 체험 페이지가 없습니다.");
  assert(sitemapXml.includes("/resources"), "sitemap.xml에 무료 자료실 페이지가 없습니다.");
  assert(sitemapXml.includes("/setup"), "sitemap.xml에 작업환경 안내 페이지가 없습니다.");
  assert(sitemapXml.includes("/ai-guide"), "sitemap.xml에 AI 도구 비교 페이지가 없습니다.");
  assert(sitemapXml.includes("/ai-links"), "sitemap.xml에 AI 링크 허브 페이지가 없습니다.");
  assert(sitemapXml.includes("/education/join.html"), "sitemap.xml에 클래스 신청 경로가 없습니다.");
  const joinResponse = await fetch(`${baseUrl}/education/join.html`, { redirect: "manual" });
  assert([307, 308].includes(joinResponse.status), "클래스 신청 경로가 교육과정으로 연결되지 않습니다.");

  const courseHtml = await (await fetchRequired("/course", "text/html")).text();
  for (const copy of ["4주 뒤, 직접 만든", "당근에서 남은 자리 문의하기", "지금 할 일", "4주 과정 문의", "4주 뒤 내 손에 남는 것", "실제로 열리는 운영 URL", "채팅 요청부터 실제 배포까지", "AutoSites 운영자", "1기 4주 과정을 수료했습니다.", "100%", "MOVIEBOX", "수강생 작품 보기", "2기는 10월 10일 토요일에 시작합니다.", "2026. 10. 10–10. 31", "2기 남은 자리 문의하기", "2시간 수업표", "80,000원"]) {
    assert(courseHtml.includes(copy), `교육과정 필수 문구 누락: ${copy}`);
  }
  for (const id of ["progress", "records", "curriculum", "next-cohort", "information", "recruitment"]) {
    assert(courseHtml.includes(`id="${id}"`), `교육과정 섹션 ID 누락: #${id}`);
  }
  assert(courseHtml.includes("바이브코딩 흐름 안내"), "바이브코딩 이미지 대체 텍스트가 없습니다.");
  assert(courseHtml.includes("map.kakao.com/link/search"), "카카오맵 링크가 없습니다.");
  assert(courseHtml.includes("www.daangn.com/kr/group/"), "당근 모임 링크가 없습니다.");
  assert(courseHtml.includes("bb-movie-rho.vercel.app"), "1기 수강생 작품 링크가 없습니다.");
  assert(courseHtml.includes("/downloads/ai-api-workshop-sample.zip"), "API 샘플 ZIP 다운로드 링크가 없습니다.");
  assert(courseHtml.includes("/downloads/AI-API-실습-안내서.md"), "API 실습 안내서 다운로드 링크가 없습니다.");
  assert(courseHtml.includes("/downloads/local-food-complete-package.zip"), "local-food 완성 패키지 링크가 없습니다.");
  assert(courseHtml.includes("/downloads/AI와_함께_14일_웹서비스_만들기.pdf"), "14일 웹서비스 교재 링크가 없습니다.");
  assert(courseHtml.includes("rel=\"noreferrer\""), "외부 링크 보안 속성이 없습니다.");
  assert(!courseHtml.includes("coffee922ks"), "Wi-Fi 비밀번호가 공개 페이지에 노출됐습니다.");
  assert(Number(socialImage.headers.get("content-length") ?? 0) > 0, "공유 이미지가 비어 있습니다.");

  const aboutHtml = await (await fetchRequired("/about", "text/html")).text();
  for (const copy of ["혼자 멈췄던 지점부터", "막히는 지점이 정해져 있기에", "설명보다", "MOVIEBOX", "실제 작품 열어보기", "이런 분과 함께합니다.", "결정에 필요한 정보만", "신청 전에 확인하세요.", "1일 체험 보기"]) {
    assert(aboutHtml.includes(copy), `AutoSites 소개 페이지 필수 문구 누락: ${copy}`);
  }

  const experienceHtml = await (await fetchRequired("/experience", "text/html")).text();
  for (const copy of ["AI와 함께 2시간 만에", "하루 2시간 체험 진행표", "내 홈페이지", "실제 URL", "작업환경 준비 안내 보기", "체험 일정 물어보기", "AI 애니메이션 앨범", "지브리풍 이미지로 변환", "다른 포맷으로 다시 만들기", "앨범 사이트 구성", "사진 준비 전 꼭 확인하세요.", "ChatGPT에는 이렇게", "HTML + CSS + JavaScript", "백엔드는 사용하지 않아", "마지막 검사 요청", "Codex에는 이렇게", "현재 열려 있는 작업공간의 절대 경로", "Sites 스킬은 사용하지 마", "GitHub main 브랜치에 올려줘", "sample 폴더", "중복 프로젝트 autosites는 건드리지 마"]) {
    assert(experienceHtml.includes(copy), `2시간 체험 페이지 필수 문구 누락: ${copy}`);
  }
  for (const id of ["result", "schedule", "album", "prompts", "codex-prompts", "preparation"]) assert(experienceHtml.includes(`id="${id}"`), `2시간 체험 섹션 ID 누락: #${id}`);

  const resourcesHtml = await (await fetchRequired("/resources", "text/html")).text();
  for (const copy of ["막막한 API 연결,", "이 순서대로 시작하면 됩니다.", "무료 실습자료", "추천 대상", "난이도", "API 키는 소스나 GitHub에 올리지 마세요."]) {
    assert(resourcesHtml.includes(copy), `무료 자료실 필수 문구 누락: ${copy}`);
  }
  for (const href of ["/downloads/AI-API-실습-안내서.md", "/downloads/ai-api-workshop-sample.zip", "/downloads/AI와_함께_14일_웹서비스_만들기.pdf", "/downloads/local-food-complete-package.zip"]) {
    assert(resourcesHtml.includes(href), `무료 자료실 다운로드 링크 누락: ${href}`);
  }
  for (const copy of ["영화·여행 사이트 소스", "MOVIEPIK 영화 사이트 소스", "TRIP 여행 사이트 소스", "API 키 제거 완료"]) assert(resourcesHtml.includes(copy), `무료 소스 안내 누락: ${copy}`);
  for (const href of ["/downloads/moviepik-source.zip", "/downloads/trip-source.zip"]) assert(resourcesHtml.includes(href), `무료 소스 링크 누락: ${href}`);

  const [sampleZip, workshopGuide, localFoodZip, localFoodBook, movieSource, tripSource] = await Promise.all([
    fetchRequired("/downloads/ai-api-workshop-sample.zip", "application/zip"),
    fetchRequired("/downloads/AI-API-실습-안내서.md", "text/markdown"),
    fetchRequired("/downloads/local-food-complete-package.zip", "application/zip"),
    fetchRequired("/downloads/AI와_함께_14일_웹서비스_만들기.pdf", "application/pdf"),
    fetchRequired("/downloads/moviepik-source.zip", "application/zip"),
    fetchRequired("/downloads/trip-source.zip", "application/zip"),
  ]);
  const zipBytes = new Uint8Array(await sampleZip.arrayBuffer());
  assert(zipBytes[0] === 0x50 && zipBytes[1] === 0x4b, "API 샘플 ZIP 파일 형식이 올바르지 않습니다.");
  const guideText = await workshopGuide.text();
  assert(guideText.includes("OPENAI_API_KEY") && guideText.includes("완료 체크리스트"), "API 실습 안내서의 필수 내용이 없습니다.");
  const localFoodZipBytes = new Uint8Array(await localFoodZip.arrayBuffer());
  assert(localFoodZipBytes[0] === 0x50 && localFoodZipBytes[1] === 0x4b, "local-food ZIP 파일 형식이 올바르지 않습니다.");
  const bookBytes = new Uint8Array(await localFoodBook.arrayBuffer());
  assert(String.fromCharCode(...bookBytes.slice(0, 4)) === "%PDF", "14일 웹서비스 교재 PDF 형식이 올바르지 않습니다.");
  for (const [name, response] of [["영화", movieSource], ["여행", tripSource]]) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    assert(bytes[0] === 0x50 && bytes[1] === 0x4b, `${name} 사이트 소스 ZIP 형식이 올바르지 않습니다.`);
  }

  const setupHtml = await (await fetchRequired("/setup", "text/html")).text();
  for (const copy of ["처음 한 번만,", "앱에서 무엇을", "ChatGPT Work", "질문은 Chat, 완성 문서는 Work", "데스크톱 앱에서는 이렇게 진행하세요.", "Google 계정 만들기 · Chrome 통일", "계정과 브라우저를 섞지 마세요.", "Windows 기본 브라우저를 Chrome으로 설정", "Edge에서 다른 계정으로 인증하지 않기", "ChatGPT 가입", "Git 설치", "GitHub 가입", "Vercel 가입", "Supabase 가입 · 계정 확인", "프로젝트나 데이터베이스를 만들지 않고", "Sign in with GitHub", "Supabase 가입·대시보드 열기", "Supabase 프로젝트 연결 — 필요할 때만", "Database 비밀번호"]) {
    assert(setupHtml.includes(copy), `작업환경 안내 필수 문구 누락: ${copy}`);
  }
  for (const id of ["roles", "steps", "supabase"]) assert(setupHtml.includes(`id="${id}"`), `작업환경 안내 섹션 ID 누락: #${id}`);
  assert(setupHtml.includes("https://supabase.com/dashboard"), "Supabase 가입 링크가 없습니다.");
  const aiGuideHtml = await (await fetchRequired("/ai-guide", "text/html")).text();
  for (const copy of ["어떤 AI를", "하나를 승자로 고르기보다", "ChatGPT", "Claude", "Gemini", "Google Workspace", "GPT 안에서도", "ChatGPT Work", "Codex", "기능과 제공 범위는", "공식 안내를"]) assert(aiGuideHtml.includes(copy), `AI 도구 비교 페이지 필수 문구 누락: ${copy}`);
  for (const id of ["quick-guide", "comparison", "gpt-roles", "workflow"]) assert(aiGuideHtml.includes(`id="${id}"`), `AI 도구 비교 섹션 ID 누락: #${id}`);
  for (const href of ["learn.chatgpt.com/docs/use-chatgpt", "docs.anthropic.com/en/docs/welcome", "support.google.com/gemini/answer/15229592"]) assert(aiGuideHtml.includes(href), `AI 도구 공식 출처 링크 누락: ${href}`);
  const aiLinksHtml = await (await fetchRequired("/ai-links", "text/html")).text();
  for (const copy of ["무엇을 할지 고르면", "총 54개", "대화 · 기획", "조사 · 학습", "이미지 · 디자인", "동영상 · 아바타", "코딩 · 웹 제작", "저장 · 배포 · 데이터", "처음이라면 이 세 개만", "가입하기 전에", "ChatGPT", "NotebookLM", "Canva AI", "Runway", "HeyGen", "Synthesia", "CapCut", "Codex", "GitHub + Vercel"]) assert(aiLinksHtml.includes(copy), `AI 링크 허브 필수 문구 누락: ${copy}`);
  assert((aiLinksHtml.match(/공식 사이트 새 창으로 열기/g) ?? []).length >= 54, "AI 링크 허브에 공식 링크 54개가 구성되지 않았습니다.");
  for (const id of ["conversation", "research", "visual", "video", "building", "publishing"]) assert(aiLinksHtml.includes(`id="${id}"`), `AI 링크 허브 분류 ID 누락: #${id}`);
  for (const href of ["https://chatgpt.com/", "https://claude.ai/", "https://gemini.google.com/", "https://notebooklm.google.com/", "https://www.canva.com/canva-ai/", "https://openai.com/codex/", "https://github.com/", "https://vercel.com/", "https://supabase.com/"]) assert(aiLinksHtml.includes(href), `AI 링크 허브 공식 링크 누락: ${href}`);
  for (const [page, pageHtml] of [["메인", html], ["AutoSites 소개", aboutHtml], ["교육과정", courseHtml], ["2시간 체험", experienceHtml], ["작업환경", setupHtml], ["무료 자료실", resourcesHtml], ["AI 도구 비교", aiGuideHtml], ["AI 링크 허브", aiLinksHtml]]) {
    assert(pageHtml.includes("전체 메뉴"), `${page} 상단에 공통 드롭다운 메뉴가 없습니다.`);
    assert(pageHtml.includes('aria-controls="main-menu"'), `${page} 드롭다운 접근성 연결이 없습니다.`);
    assert(pageHtml.includes("data-site-header"), `${page} 상단 메뉴 고정 표식이 없습니다.`);
  }
  for (const [page, pageHtml] of [["AutoSites 소개", aboutHtml], ["교육과정", courseHtml], ["2시간 체험", experienceHtml], ["작업환경", setupHtml], ["무료 자료실", resourcesHtml], ["AI 도구 비교", aiGuideHtml], ["AI 링크 허브", aiLinksHtml]]) {
    for (const marker of ["rel=\"canonical\"", "property=\"og:title\"", "property=\"og:description\"", "name=\"twitter:title\""]) {
      assert(pageHtml.includes(marker), `${page} 페이지 SEO 메타정보 누락: ${marker}`);
    }
  }
  await fetchRequired("/manifest.webmanifest", "application/manifest+json");

  const layoutCss = await Promise.all([
    readFile(new URL("../src/app/home.module.css", import.meta.url), "utf8"),
    readFile(new URL("../src/app/experience/experience.module.css", import.meta.url), "utf8"),
    readFile(new URL("../src/app/resources/resources.module.css", import.meta.url), "utf8"),
    readFile(new URL("../src/app/setup/setup-page.module.css", import.meta.url), "utf8"),
    readFile(new URL("../src/app/course/course.module.css", import.meta.url), "utf8"),
    readFile(new URL("../src/app/ai-guide/ai-guide.module.css", import.meta.url), "utf8"),
    readFile(new URL("../src/app/ai-links/ai-links.module.css", import.meta.url), "utf8"),
  ]);
  for (const css of layoutCss) assert(css.includes("calc(100% - var(--page-gutter)*2),var(--container-wide)"), "공개 페이지 공통 좌우 여백 기준이 누락됐습니다.");
  const globalCss = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
  for (const marker of ["[data-site-header]", "position:sticky!important", "top:0!important", "height:var(--nav-height)!important"]) assert(globalCss.includes(marker), `공통 상단 메뉴 고정 스타일 누락: ${marker}`);

  const runtimeOutput = output.join("");
  assert(!/(TypeError|ReferenceError|Unhandled|Internal Server Error)/i.test(runtimeOutput), "서버 실행 중 오류가 발견됐습니다.");
  console.log(`✓ 필수 문구 ${requiredCopy.length}개`);
  console.log(`✓ 내부 링크 ${hashLinks.length}개`);
  console.log("✓ SEO 메타정보, robots.txt, sitemap.xml, 공유 이미지");
  console.log("✓ 교육과정과 작업환경 안내 페이지, 지도·당근 링크와 비밀정보 비노출");
  console.log("✓ 프로덕션 서버 응답 및 런타임 오류 검사");
} catch (error) {
  console.error(`✗ 홈페이지 자동 검증 실패: ${error instanceof Error ? error.message : error}`);
  const runtimeOutput = output.join("").trim();
  if (runtimeOutput) console.error(runtimeOutput);
  process.exitCode = 1;
} finally {
  server.kill();
}
