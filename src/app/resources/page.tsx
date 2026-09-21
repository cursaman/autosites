import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { courseContent } from "@/content/site-content";
import autoSitesLogo from "../../../public/images/brand/autosites-auto-logo-v2.png";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "무료 AI API 실습자료",
  description: "AI API 입문 안내서와 샘플 소스, local-food 실전 소스 및 22쪽 PDF 교재를 권장 순서대로 내려받으세요.",
  alternates: { canonical: "/resources" },
  openGraph: { type: "article", locale: "ko_KR", url: "/resources", title: "무료 AI API 실습자료 | AutoSites", description: "초보자를 위한 AI API 안내서부터 실전 웹서비스 소스까지 단계별 무료 자료실", images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites 무료 AI API 실습자료" }] },
  twitter: { card: "summary_large_image", title: "무료 AI API 실습자료 | AutoSites", description: "안내서, 샘플 소스, 14일 교재와 실전 프로젝트를 권장 순서대로 확인하세요.", images: ["/og.png"] },
};

export default function ResourcesPage() {
  const resources = courseContent.apiWorkshop.resources;
  return <div className={styles.page}>
    <a className={styles.skipLink} href="#resources-main">본문으로 바로가기</a>
    <header className={styles.header}><Link className={styles.brand} href="/" aria-label="AutoSites 홈으로 이동"><Image src={autoSitesLogo} alt="" width={40} height={40} priority />AutoSites</Link><nav aria-label="자료실 메뉴"><a href="#download-list">자료 목록</a><a href="#start-guide">시작 방법</a></nav><Link className={styles.headerAction} href="/course#api-workshop">2시간 실습표</Link></header>
    <main id="resources-main" tabIndex={-1}>
      <section className={styles.hero} aria-labelledby="resources-title"><div className={styles.container}><p className={styles.eyebrow}>FREE LEARNING RESOURCES</p><h1 id="resources-title">막막한 API 연결,<br />완성 예제부터 시작하세요.</h1><p>API가 처음인 분을 위해 읽는 순서와 실행 순서를 정리했습니다. 안내서와 샘플부터 시작하고, 준비되면 local-food 실전 프로젝트로 확장하세요.</p><a href="#download-list">내게 맞는 자료 찾기 ↓</a></div></section>
      <section id="start-guide" className={`${styles.section} ${styles.container}`} aria-labelledby="guide-title"><div className={styles.heading}><div><p className={styles.eyebrow}>RECOMMENDED ORDER</p><h2 id="guide-title">이 순서대로 시작하면 됩니다.</h2></div><p>문서를 먼저 읽고 작은 예제를 실행한 뒤, 교재와 완성 소스로 전체 웹서비스 흐름을 익힙니다.</p></div><ol className={styles.flow}>{resources.map((resource)=><li key={resource.href}><span>{resource.order}</span><strong>{resource.title}</strong><small>{resource.difficulty}</small></li>)}</ol></section>
      <section id="download-list" className={`${styles.section} ${styles.container}`} aria-labelledby="download-title"><div className={styles.heading}><div><p className={styles.eyebrow}>DOWNLOAD</p><h2 id="download-title">무료 실습자료</h2></div><p>모든 파일에는 실제 API 키가 포함되어 있지 않습니다. 내려받은 뒤 자신의 키를 환경변수에 설정하세요.</p></div><div className={styles.grid}>{resources.map((resource)=><article key={resource.href}><div className={styles.cardTop}><span>{resource.order}</span><b>{resource.type}</b></div><h3>{resource.title}</h3><p>{resource.description}</p><dl><div><dt>추천 대상</dt><dd>{resource.audience}</dd></div><div><dt>난이도</dt><dd>{resource.difficulty}</dd></div></dl><a href={resource.href} download={resource.fileName}>{resource.fileName} <span aria-hidden="true">↓</span></a></article>)}</div></section>
      <aside className={`${styles.notice} ${styles.container}`}><div><p className={styles.eyebrow}>SAFE START</p><h2>API 키는 소스나 GitHub에 올리지 마세요.</h2><p><code>.env</code> 또는 <code>.env.local</code>에 저장하고, 공개 저장소에 포함되지 않는지 반드시 확인하세요.</p></div><Link href="/course#api-workshop">2시간 API 실습 계획표 보기 →</Link></aside>
    </main>
    <footer className={styles.footer}><div className={styles.container}><strong>AutoSites Resources</strong><div><Link href="/">메인으로</Link><Link href="/course">4주 클래스</Link></div></div></footer>
  </div>;
}
