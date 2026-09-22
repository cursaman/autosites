import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import autoSitesLogo from "../../../public/images/brand/autosites-auto-logo-v2.png";
import CourseSelector from "../course-selector";
import styles from "./ai-links.module.css";

export const metadata: Metadata = {
  title: "용도별 AI 링크 허브 | AutoSites",
  description: "대화, 조사, 이미지, 코딩, 배포까지 초보자가 목적에 맞는 AI와 웹 제작 도구를 바로 찾을 수 있습니다.",
  alternates: { canonical: "/ai-links" },
  openGraph: { type: "website", locale: "ko_KR", url: "/ai-links", title: "용도별 AI 링크 허브", description: "무엇을 하려는지 고르면 필요한 AI 도구를 바로 찾을 수 있습니다.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites 용도별 AI 링크 허브" }] },
};

export default function AiLinksPage() {
  const { categories } = siteContent.aiLinks;
  return <div className={styles.page}>
    <a className={styles.skipLink} href="#links-main">본문으로 바로가기</a>
    <header className={styles.header} data-site-header><Link className={styles.brand} href="/" aria-label="AutoSites 홈으로 이동"><Image src={autoSitesLogo} alt="" width={40} height={40} priority />AutoSites</Link><CourseSelector items={siteContent.navigation} /><Link className={styles.headerAction} href="/ai-guide">AI 비교 보기</Link></header>
    <main id="links-main" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="links-title">
        <p className={styles.eyebrow}>AI LINK HUB</p><h1 id="links-title">무엇을 할지 고르면,<br /><em>쓸 도구가 보입니다.</em></h1>
        <p>AI 이름을 모두 외울 필요는 없습니다. 6가지 용도별로 9개씩, 총 54개 도구 중 지금 필요한 것만 새 창으로 열어 사용하세요.</p>
        <nav className={styles.categoryNav} aria-label="용도별 바로가기">{categories.map((category) => <a key={category.id} href={`#${category.id}`}><span>{category.number}</span>{category.title}</a>)}</nav>
      </section>

      <section className={styles.startGuide} aria-labelledby="start-title"><div className={styles.container}><div><p>BEGINNER ROUTE</p><h2 id="start-title">처음이라면 이 세 개만<br />기억하세요.</h2></div><ol><li><span>01</span><p><strong>ChatGPT</strong>에서 아이디어와 계획을 정리합니다.</p></li><li><span>02</span><p><strong>Codex</strong>에서 실제 홈페이지 파일을 만듭니다.</p></li><li><span>03</span><p><strong>GitHub + Vercel</strong>로 저장하고 인터넷에 공개합니다.</p></li></ol></div></section>

      <div className={styles.directory}>{categories.map((category) => <section className={`${styles.category} ${styles.container}`} id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
        <div className={styles.categoryHeading}><span>{category.number}</span><div><h2 id={`${category.id}-title`}>{category.title}</h2><p>{category.description}</p></div></div>
        <div className={styles.toolGrid}>{category.tools.map((tool) => <article key={tool.name}><div className={styles.cardTop}><span>{tool.tag}</span><small>{tool.purpose}</small></div><h3>{tool.name}</h3><p>{tool.description}</p><a href={tool.href} target="_blank" rel="noreferrer" aria-label={`${tool.name} 공식 사이트 새 창으로 열기`}>공식 사이트 열기 <span aria-hidden="true">↗</span></a></article>)}</div>
      </section>)}</div>

      <section className={`${styles.caution} ${styles.container}`} aria-labelledby="caution-title"><div><p className={styles.eyebrow}>BEFORE YOU USE</p><h2 id="caution-title">가입하기 전에<br />한 번 확인하세요.</h2></div><ul><li>무료·유료 기능과 사용 한도는 서비스마다 다르며 수시로 변경될 수 있습니다.</li><li>주민번호, 비밀번호, API 키와 공개하면 안 되는 자료는 입력하지 않습니다.</li><li>AI가 만든 글·코드·이미지는 정확성, 저작권, 개인정보를 직접 확인한 뒤 사용합니다.</li><li>수업에서는 모든 도구에 가입하지 않고, 현재 실습에 필요한 도구만 사용합니다.</li></ul></section>
    </main>
    <footer className={styles.footer}><div className={styles.container}><p><strong>AutoSites</strong><span>아이디어를 나누면, 홈페이지가 세상에 나옵니다.</span></p><nav aria-label="하단 메뉴"><Link href="/ai-guide">AI 도구 비교</Link><Link href="/setup">준비작업</Link><Link href="/course">4주 교육과정</Link></nav></div></footer>
  </div>;
}
