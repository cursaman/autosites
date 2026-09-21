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
    "코딩 없이",
    "내 홈페이지",
    "2기 모집 중",
    "선행 지식 필요 없음",
    "막히는 지점이 정해져 있기에",
    "설명보다",
    "매주 하나씩, 필요한 것만 배웁니다.",
    "결정에 필요한 정보만",
    "내가 따라갈 수 있는지 물어보기",
    "실제 작품 열어보기",
    "상세 커리큘럼 보기",
    "무료 API 실습자료 보기",
    "신청 전에 확인하세요.",
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
  for (const imagePath of ["/images/hero/ai-idea-animation-v2.webp", "/images/hero/ai-build-animation-v2.webp", "/images/hero/ai-deploy-animation-v2.webp", "/images/autosites-showcase.webp"]) {
    await fetchRequired(imagePath, "image/webp");
  }
  assert((await robots.text()).includes("Disallow: /api/"), "robots.txt의 API 차단 규칙이 없습니다.");
  const sitemapXml = await sitemap.text();
  assert(sitemapXml.includes("<urlset"), "sitemap.xml 형식이 올바르지 않습니다.");
  assert(sitemapXml.includes("/course"), "sitemap.xml에 교육과정 페이지가 없습니다.");
  assert(sitemapXml.includes("/resources"), "sitemap.xml에 무료 자료실 페이지가 없습니다.");
  assert(sitemapXml.includes("/setup"), "sitemap.xml에 작업환경 안내 페이지가 없습니다.");
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

  const resourcesHtml = await (await fetchRequired("/resources", "text/html")).text();
  for (const copy of ["막막한 API 연결,", "이 순서대로 시작하면 됩니다.", "무료 실습자료", "추천 대상", "난이도", "API 키는 소스나 GitHub에 올리지 마세요."]) {
    assert(resourcesHtml.includes(copy), `무료 자료실 필수 문구 누락: ${copy}`);
  }
  for (const href of ["/downloads/AI-API-실습-안내서.md", "/downloads/ai-api-workshop-sample.zip", "/downloads/AI와_함께_14일_웹서비스_만들기.pdf", "/downloads/local-food-complete-package.zip"]) {
    assert(resourcesHtml.includes(href), `무료 자료실 다운로드 링크 누락: ${href}`);
  }

  const [sampleZip, workshopGuide, localFoodZip, localFoodBook] = await Promise.all([
    fetchRequired("/downloads/ai-api-workshop-sample.zip", "application/zip"),
    fetchRequired("/downloads/AI-API-실습-안내서.md", "text/markdown"),
    fetchRequired("/downloads/local-food-complete-package.zip", "application/zip"),
    fetchRequired("/downloads/AI와_함께_14일_웹서비스_만들기.pdf", "application/pdf"),
  ]);
  const zipBytes = new Uint8Array(await sampleZip.arrayBuffer());
  assert(zipBytes[0] === 0x50 && zipBytes[1] === 0x4b, "API 샘플 ZIP 파일 형식이 올바르지 않습니다.");
  const guideText = await workshopGuide.text();
  assert(guideText.includes("OPENAI_API_KEY") && guideText.includes("완료 체크리스트"), "API 실습 안내서의 필수 내용이 없습니다.");
  const localFoodZipBytes = new Uint8Array(await localFoodZip.arrayBuffer());
  assert(localFoodZipBytes[0] === 0x50 && localFoodZipBytes[1] === 0x4b, "local-food ZIP 파일 형식이 올바르지 않습니다.");
  const bookBytes = new Uint8Array(await localFoodBook.arrayBuffer());
  assert(String.fromCharCode(...bookBytes.slice(0, 4)) === "%PDF", "14일 웹서비스 교재 PDF 형식이 올바르지 않습니다.");

  const setupHtml = await (await fetchRequired("/setup", "text/html")).text();
  for (const copy of ["처음 한 번만,", "ChatGPT 가입", "Git 설치", "GitHub 가입", "Vercel 가입", "Supabase — 로그인·DB가 필요할 때만"]) {
    assert(setupHtml.includes(copy), `작업환경 안내 필수 문구 누락: ${copy}`);
  }
  for (const id of ["roles", "steps", "supabase"]) assert(setupHtml.includes(`id="${id}"`), `작업환경 안내 섹션 ID 누락: #${id}`);
  for (const [page, pageHtml] of [["교육과정", courseHtml], ["작업환경", setupHtml], ["무료 자료실", resourcesHtml]]) {
    for (const marker of ["rel=\"canonical\"", "property=\"og:title\"", "property=\"og:description\"", "name=\"twitter:title\""]) {
      assert(pageHtml.includes(marker), `${page} 페이지 SEO 메타정보 누락: ${marker}`);
    }
  }
  await fetchRequired("/manifest.webmanifest", "application/manifest+json");

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
