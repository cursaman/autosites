import type { Metadata } from "next";
import Link from "next/link";
import { courseContent, recruitmentUrl, siteContent } from "@/content/site-content";
import SiteHeader from "../site-header";
import styles from "../home.module.css";

export const metadata: Metadata = {
  title: "AutoSites 소개 | 초보자 AI 홈페이지 실습",
  description: "AutoSites가 초보자와 함께 홈페이지를 만드는 방식, 1기 결과와 2기 클래스 정보를 확인하세요.",
  alternates: { canonical: "/about" },
  openGraph: { type: "website", locale: "ko_KR", url: "/about", title: "AutoSites 소개", description: "초보자와 함께 실제 홈페이지 주소까지 완성하는 AutoSites를 소개합니다.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites 초보자 AI 홈페이지 실습" }] },
};

export default function AboutPage() {
  const { beginnerStory, cohortProof, audience, faq, footer } = siteContent;
  const { fee, nextCohort } = courseContent;

  return <div className={styles.page}>
    <a className={styles.skipLink} href="#about-main">본문으로 바로가기</a>
    <SiteHeader />
    <main id="about-main" tabIndex={-1}>
      <section className={`${styles.aboutHero} ${styles.container}`} aria-labelledby="about-title"><p className={styles.eyebrow}>ABOUT AUTOSITES</p><h1 id="about-title">혼자 멈췄던 지점부터,<br /><em>함께 완성합니다.</em></h1><p>AutoSites는 코딩 경험보다 만들고 싶은 이유를 먼저 듣습니다. 같은 화면을 보며 막힌 곳을 넘고, 마지막에는 직접 운영할 수 있는 홈페이지 주소를 남깁니다.</p><div className={styles.actions}><a className={styles.primaryAction} href={recruitmentUrl}>내가 따라갈 수 있는지 물어보기 <span>→</span></a><Link className={styles.secondaryAction} href="/course#curriculum">4주 과정 확인</Link></div></section>

      <div className={`${styles.trustBar} ${styles.container}`} aria-label="클래스 검증 정보"><strong>1기 수료 완료</strong><span>진행률 100%</span><span>실제 운영 작품 공개</span><span>초보자 중심 소규모 실습</span></div>

      <section className={`${styles.section} ${styles.container}`} aria-labelledby="story-title"><SectionHeading eyebrow="처음이어도 괜찮습니다" title="막히는 지점이 정해져 있기에, 함께 넘을 수 있습니다." description={beginnerStory.description} id="story-title" /><ol className={styles.storyGrid}>{beginnerStory.chapters.map((chapter)=><li key={chapter.number}><span>{chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></li>)}</ol></section>

      <section className={styles.proof} aria-labelledby="proof-title"><div className={`${styles.container} ${styles.proofGrid}`}><div><p className={styles.lightEyebrow}>{cohortProof.eyebrow}</p><h2 id="proof-title">설명보다<br />완성된 결과를<br />먼저 보세요.</h2><p>{cohortProof.description}</p></div><article><span>{cohortProof.project.label}</span><h3>{cohortProof.project.title}</h3><p>{cohortProof.project.description}</p><ul>{cohortProof.facts.map((fact)=><li key={fact}>✓ {fact}</li>)}</ul><a href={cohortProof.project.href} target="_blank" rel="noreferrer">실제 작품 열어보기 <span aria-hidden="true">↗</span></a></article></div></section>

      <section className={`${styles.section} ${styles.container}`} aria-labelledby="audience-title"><SectionHeading eyebrow={audience.eyebrow} title="이런 분과 함께합니다." description="완벽하게 준비된 사람보다, 아이디어는 있지만 혼자 시작하기 막막했던 분을 위한 과정입니다." id="audience-title" /><div className={styles.audienceGrid}>{audience.items.map((item)=><article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>

      <section className={`${styles.enrollment} ${styles.container}`} aria-labelledby="enrollment-title"><div><p className={styles.eyebrow}>2기 클래스 안내</p><h2 id="enrollment-title">결정에 필요한 정보만<br />한곳에 모았습니다.</h2><p>바로 신청하지 않아도 괜찮습니다. 현재 실력과 만들고 싶은 홈페이지를 알려주시면 참여 가능 여부부터 안내합니다.</p></div><div className={styles.enrollmentCard}><span>{nextCohort.schedule}</span><strong>{fee.amount}</strong><small>4주 전체 · 장소·빔프로젝터·커피 포함</small><ul><li>주 1회 2시간 · 총 8시간</li><li>커피긱스 2층 8인룸</li><li>개인 노트북과 충전기 준비</li></ul><a href={recruitmentUrl}>당근에서 남은 자리 물어보기 <span>→</span></a></div></section>

      <section className={`${styles.section} ${styles.container}`} aria-labelledby="faq-title"><SectionHeading eyebrow="FAQ" title="신청 전에 확인하세요." id="faq-title"/><div className={styles.faqList}>{faq.items.slice(0,4).map((item)=><details key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className={`${styles.finalCta} ${styles.container}`} aria-labelledby="about-cta-title"><p className={styles.lightEyebrow}>START SMALL, FINISH LIVE</p><h2 id="about-cta-title">먼저 1일 체험으로<br />만드는 방식을 확인하세요.</h2><p>2시간 동안 한 페이지를 만들고 실제 주소로 공개하며 AutoSites의 작업 흐름을 직접 경험합니다.</p><div className={styles.ctaActions}><Link href="/experience">1일 체험 보기 <span>→</span></Link><a href={recruitmentUrl}>당근에서 문의하기</a></div></section>
    </main>
    <footer className={styles.footer}><div className={styles.container}><p><strong>AutoSites</strong><span>{footer.description}</span></p><nav aria-label="하단 메뉴"><Link href="/">제작 방법</Link><Link href="/course">4주 교육과정</Link><Link href="/resources">무료 자료</Link><Link href="/setup">준비 안내</Link></nav></div></footer>
  </div>;
}

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{title}</h2></div>{description && <p>{description}</p>}</div>;
}
