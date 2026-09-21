import Image from "next/image";
import Link from "next/link";
import { courseContent, recruitmentUrl, siteContent } from "@/content/site-content";
import autoSitesLogo from "../../public/images/brand/autosites-auto-logo-v2.png";
import styles from "./home.module.css";
import CourseSelector from "./course-selector";

export default function HomePage() {
  const { beginnerStory, cohortProof, classPreview, faq, finalCta, footer } = siteContent;
  const { fee, nextCohort } = courseContent;

  return <div id="top" className={styles.page}>
    <a className={styles.skipLink} href="#main-content">본문으로 바로가기</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="AutoSites 홈"><Image src={autoSitesLogo} alt="" width={40} height={40} priority /><span>AutoSites</span></a>
      <CourseSelector items={siteContent.navigation} />
      <a className={styles.headerCta} href={recruitmentUrl}>자리 문의</a>
    </header>

    <main id="main-content" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>부산 · 초보자 4주 실습</p>
          <h1 id="hero-title">코딩을 몰라도,<br />4주 뒤에는<br /><em>내 홈페이지</em>가 있습니다.</h1>
          <p className={styles.lead}>혼자 검색하다 멈췄다면 잘 오셨습니다. 최대 8명이 같은 화면을 보며 만들고, 마지막에는 실제 인터넷 주소로 공개합니다.</p>
          <div className={styles.actions}><a className={styles.primaryAction} href={recruitmentUrl}>내가 따라갈 수 있는지 물어보기 <span>→</span></a><Link className={styles.secondaryAction} href="/course#curriculum">4주 과정 확인</Link></div>
          <p className={styles.reassurance}>선행 지식 필요 없음 · 개인 노트북만 준비</p>
        </div>
        <aside className={styles.heroSummary} aria-label="2기 클래스 핵심 정보">
          <span>2기 모집 중</span><strong>10.10</strong><small>2026년 토요일 시작</small>
          <dl><div><dt>일정</dt><dd>매주 토요일 18:00–20:00</dd></div><div><dt>기간</dt><dd>4주 · 총 8시간</dd></div><div><dt>장소</dt><dd>부산 · 최대 8명</dd></div><div><dt>교육비</dt><dd>{fee.amount}</dd></div></dl>
        </aside>
      </section>

      <div className={`${styles.trustBar} ${styles.container}`} aria-label="클래스 검증 정보"><strong>1기 수료 완료</strong><span>진행률 100%</span><span>실제 운영 작품 공개</span><span>초보자 중심 소규모 실습</span></div>

      <section id="about" className={`${styles.section} ${styles.container}`} aria-labelledby="story-title">
        <SectionHeading eyebrow="처음이어도 괜찮습니다" title="막히는 지점이 정해져 있기에, 함께 넘을 수 있습니다." description={beginnerStory.description} id="story-title" />
        <ol className={styles.storyGrid}>{beginnerStory.chapters.map((chapter)=><li key={chapter.number}><span>{chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></li>)}</ol>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title"><div className={`${styles.container} ${styles.proofGrid}`}>
        <div><p className={styles.lightEyebrow}>{cohortProof.eyebrow}</p><h2 id="proof-title">설명보다<br />완성된 결과를<br />먼저 보세요.</h2><p>{cohortProof.description}</p></div>
        <article><span>{cohortProof.project.label}</span><h3>{cohortProof.project.title}</h3><p>{cohortProof.project.description}</p><ul>{cohortProof.facts.map((fact)=><li key={fact}>✓ {fact}</li>)}</ul><a href={cohortProof.project.href} target="_blank" rel="noreferrer">실제 작품 열어보기 <span aria-hidden="true">↗</span></a></article>
      </div></section>

      <section className={`${styles.section} ${styles.container}`} aria-labelledby="weeks-title">
        <SectionHeading eyebrow="4주 완성 과정" title="매주 하나씩, 필요한 것만 배웁니다." description="긴 이론보다 내 홈페이지를 만드는 순서에 집중합니다. 설치부터 배포와 다시 수정하는 방법까지 한 흐름으로 끝냅니다." id="weeks-title" />
        <ol className={styles.weeks}>{classPreview.weeks.map((item)=><li key={item.week}><span>{item.week}</span><strong>{item.title}</strong></li>)}</ol>
        <div className={styles.sectionActions}><Link href="/course#curriculum">상세 커리큘럼 보기 →</Link><Link href="/resources">무료 API 실습자료 보기 →</Link></div>
      </section>

      <section className={`${styles.enrollment} ${styles.container}`} aria-labelledby="enrollment-title">
        <div><p className={styles.eyebrow}>2기 클래스 안내</p><h2 id="enrollment-title">결정에 필요한 정보만<br />한곳에 모았습니다.</h2><p>바로 신청하지 않아도 괜찮습니다. 현재 실력과 만들고 싶은 홈페이지를 알려주시면 참여 가능 여부부터 안내합니다.</p></div>
        <div className={styles.enrollmentCard}><span>{nextCohort.schedule}</span><strong>{fee.amount}</strong><small>4주 전체 · 장소·빔프로젝터·커피 포함</small><ul><li>주 1회 2시간 · 총 8시간</li><li>커피긱스 2층 8인룸</li><li>개인 노트북과 충전기 준비</li></ul><a href={recruitmentUrl}>당근에서 남은 자리 물어보기 <span>→</span></a></div>
      </section>

      <section id="faq" className={`${styles.section} ${styles.container}`} aria-labelledby="faq-title"><SectionHeading eyebrow="자주 묻는 질문" title="신청 전에 확인하세요." id="faq-title"/><div className={styles.faqList}>{faq.items.slice(0,4).map((item)=><details key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className={`${styles.finalCta} ${styles.container}`} aria-labelledby="cta-title"><p className={styles.lightEyebrow}>{finalCta.eyebrow}</p><h2 id="cta-title">{finalCta.title}</h2><p>{finalCta.description}</p><a href={finalCta.action.href}>{finalCta.action.label} <span>→</span></a></section>
    </main>

    <footer className={styles.footer}><div className={styles.container}><p><strong>AutoSites</strong><span>{footer.description}</span></p><nav aria-label="하단 메뉴"><Link href="/course">4주 커리큘럼</Link><Link href="/resources">무료 자료</Link><Link href="/setup">준비 안내</Link></nav></div></footer>
  </div>;
}

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{title}</h2></div>{description && <p>{description}</p>}</div>;
}
