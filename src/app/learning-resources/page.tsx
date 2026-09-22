import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../site-header";
import styles from "./learning-resources.module.css";

const externalUrl = "https://ai-together-mu.vercel.app/resources";
const groups = [
  { number: "01", title: "AI·홈페이지 학습", description: "AI 기초 용어부터 홈페이지 제작, 데이터베이스 실습까지 이어지는 학습 사이트" },
  { number: "02", title: "수업용 크롬 확장 프로그램", description: "전체 화면 캡처, 색상·글꼴 확인, 반응형 검사와 화면 녹화 도구" },
  { number: "03", title: "디자인 참고 사이트", description: "국내외 웹 디자인, 색상, 레이아웃과 로고 아이디어를 찾는 자료" },
  { number: "04", title: "웹 개발 문서", description: "HTML, CSS, JavaScript의 정확한 사용법과 브라우저 지원 여부 확인" },
  { number: "05", title: "아이콘 참고 사이트", description: "홈페이지에 사용할 다양한 스타일의 아이콘 검색과 라이선스 확인" },
];

export const metadata: Metadata = {
  title: "AI Together 학습 자료 안내 | AutoSites",
  description: "AI 기초학습, 크롬 확장 프로그램, 디자인, 웹 개발 문서와 아이콘 자료를 확인하세요.",
  alternates: { canonical: "/learning-resources" },
  openGraph: { type: "website", locale: "ko_KR", url: "/learning-resources", title: "AI Together 학습 자료 안내", description: "홈페이지 제작에 필요한 디자인·코딩 참고자료 모음", images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI Together 학습 자료 안내" }] },
};

export default function LearningResourcesPage() {
  return <div className={styles.page}>
    <a className={styles.skipLink} href="#learning-main">본문으로 바로가기</a><SiteHeader />
    <main id="learning-main" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`}><p className={styles.eyebrow}>AI TOGETHER · LEARNING RESOURCES</p><h1>배우고 만드는 데 필요한<br /><em>참고자료를 이어보세요.</em></h1><p>AutoSites 실습자료와 함께 보면 좋은 디자인·코딩 참고 사이트를 AI Together 자료실에서 확인할 수 있습니다.</p><div><a href={externalUrl} target="_blank" rel="noreferrer">AI Together 자료실 열기 <span>↗</span></a><Link href="/resources">AutoSites 무료 자료로 돌아가기</Link></div></section>
      <section className={`${styles.section} ${styles.container}`} aria-labelledby="included-title"><div className={styles.heading}><p className={styles.eyebrow}>WHAT IS INCLUDED</p><h2 id="included-title">이런 자료가<br />정리되어 있습니다.</h2></div><ol>{groups.map((group)=><li key={group.number}><span>{group.number}</span><div><h3>{group.title}</h3><p>{group.description}</p></div></li>)}</ol></section>
      <aside className={`${styles.notice} ${styles.container}`}><div><strong>사용 전 확인</strong><p>외부 사이트마다 무료·유료 범위와 라이선스 조건이 다릅니다. 내려받기 전에 각 사이트의 이용 조건을 확인하세요.</p></div><a href={externalUrl} target="_blank" rel="noreferrer">참고자료 전체보기 ↗</a></aside>
    </main>
  </div>;
}
