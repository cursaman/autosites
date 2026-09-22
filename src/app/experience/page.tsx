import type { Metadata } from "next";
import Link from "next/link";
import { recruitmentUrl, siteContent } from "@/content/site-content";
import styles from "./experience.module.css";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "하루 2시간 AI 홈페이지 체험",
  description: "코딩 경험 없이 AI와 함께 소개 홈페이지 또는 지브리풍 사진 변환 앨범을 만들고 실제 인터넷 주소로 공개하는 2시간 체험입니다.",
  alternates: { canonical: "/experience" },
  openGraph: { type: "article", locale: "ko_KR", url: "/experience", title: "하루 2시간 AI 홈페이지·앨범 체험 | AutoSites", description: "홈페이지 제작 또는 AI 사진 변환 앨범을 선택해 실제 주소까지 완성하는 2시간 체험", images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites 하루 2시간 AI 홈페이지와 사진 앨범 체험" }] },
  twitter: { card: "summary_large_image", title: "하루 2시간 AI 홈페이지 체험 | AutoSites", description: "코딩을 몰라도 2시간 뒤 내 홈페이지 주소를 가져가는 초보자 체험", images: ["/og.png"] },
};

export default function ExperiencePage() {
  const experience = siteContent.experience;
  return <div className={styles.page}>
    <a className={styles.skipLink} href="#experience-main">본문으로 바로가기</a>
    <SiteHeader />
    <main id="experience-main" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="experience-title"><div><p className={styles.eyebrow}>{experience.eyebrow}</p><h1 id="experience-title">{experience.title}</h1><p>{experience.description}</p><div className={styles.actions}><a href={recruitmentUrl}>체험 일정 물어보기 <span>→</span></a><a href="#schedule">진행표 먼저 보기 ↓</a></div><small>{experience.note}</small></div><aside><span>오늘의 목표</span><strong>2시간 뒤,<br />내 홈페이지<br />주소 완성</strong><p>선행 지식 필요 없음<br />개인 노트북만 준비</p></aside></section>
      <section className={`${styles.section} ${styles.container}`} aria-labelledby="audience-title"><div className={styles.heading}><p className={styles.eyebrow}>WHO IT IS FOR</p><h2 id="audience-title">이런 분께 맞습니다.</h2></div><ul className={styles.audience}>{experience.audience.map((item)=><li key={item}>✓ {item}</li>)}</ul></section>
      <section id="result" className={styles.result} aria-labelledby="result-title"><div className={styles.container}><div className={styles.heading}><p className={styles.lightEyebrow}>TAKE IT HOME</p><h2 id="result-title">수업이 끝나면<br />세 가지가 남습니다.</h2></div><ol>{experience.outcomes.map((item,index)=><li key={item}><span>0{index+1}</span><strong>{item}</strong></li>)}</ol></div></section>
      <section id="schedule" className={`${styles.section} ${styles.container}`} aria-labelledby="schedule-title"><div className={styles.heading}><p className={styles.eyebrow}>120-MINUTE PLAN</p><h2 id="schedule-title">하루 2시간 체험 진행표</h2><p>설명을 길게 듣기보다 각 단계에서 바로 화면을 만들고 확인합니다.</p></div><ol className={styles.schedule}>{experience.schedule.map((item,index)=><li key={item.time}><span>{String(index+1).padStart(2,"0")}</span><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol></section>
      <section id="album" className={styles.album} aria-labelledby="album-title"><div className={styles.container}><div className={styles.albumIntro}><div><p className={styles.lightEyebrow}>{experience.albumWorkshop.eyebrow}</p><h2 id="album-title">{experience.albumWorkshop.title}</h2></div><div><p>{experience.albumWorkshop.description}</p><ul>{experience.albumWorkshop.outcomes.map((item)=><li key={item}>✓ {item}</li>)}</ul></div></div><ol className={styles.albumSchedule}>{experience.albumWorkshop.schedule.map((item,index)=><li key={item.time}><span>{String(index+1).padStart(2,"0")}</span><time>{item.time}</time><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol><aside className={styles.safety}><strong>사진 준비 전 꼭 확인하세요.</strong><p>{experience.albumWorkshop.safety}</p></aside></div></section>
      <section id="prompts" className={`${styles.prompts} ${styles.container}`} aria-labelledby="prompts-title"><div className={styles.promptHeading}><p className={styles.eyebrow}>{experience.promptGuide.eyebrow}</p><h2 id="prompts-title">{experience.promptGuide.title}</h2><p>{experience.promptGuide.description}</p></div><ol>{experience.promptGuide.items.map((item)=><li key={item.step}><header><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.purpose}</p></div></header><pre><code>{item.prompt}</code></pre></li>)}</ol></section>
      <section id="codex-prompts" className={`${styles.prompts} ${styles.codexPrompts} ${styles.container}`} aria-labelledby="codex-prompts-title"><div className={styles.promptHeading}><p className={styles.eyebrow}>{experience.codexPromptGuide.eyebrow}</p><h2 id="codex-prompts-title">{experience.codexPromptGuide.title}</h2><p>{experience.codexPromptGuide.description}</p></div><ol>{experience.codexPromptGuide.items.map((item)=><li key={item.step}><header><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.purpose}</p></div></header><pre><code>{item.prompt}</code></pre></li>)}</ol><aside className={styles.codexNote}><strong>GitHub에 올리기 전 안전 확인</strong><p>{experience.codexPromptGuide.note}</p></aside></section>
      <section id="preparation" className={`${styles.preparation} ${styles.container}`} aria-labelledby="preparation-title"><div><p className={styles.eyebrow}>BEFORE CLASS</p><h2 id="preparation-title">이것만 준비하세요.</h2><p>프로그램 연결이 걱정된다면 별도 준비 안내를 먼저 확인할 수 있습니다.</p><Link href="/setup">작업환경 준비 안내 보기 →</Link></div><ul>{experience.preparation.map((item)=><li key={item}>✓ {item}</li>)}</ul></section>
      <section className={`${styles.nextStep} ${styles.container}`} aria-labelledby="next-step-title"><p className={styles.lightEyebrow}>TRY BEFORE 4 WEEKS</p><h2 id="next-step-title">먼저 2시간 경험하고,<br />더 만들고 싶을 때 4주로 이어가세요.</h2><p>체험에서는 한 페이지를 실제 주소로 공개합니다. 4주 과정에서는 내 주제로 기획하고, 수정·배포를 반복하며 혼자 운영하는 흐름까지 완성합니다.</p><div><a href={recruitmentUrl}>당근에서 체험 일정 물어보기 <span>→</span></a><Link href="/course#course-comparison">하루 체험과 4주 과정 비교하기</Link></div></section>
    </main>
    <footer className={styles.footer}><div className={styles.container}><strong>AutoSites Experience</strong><nav aria-label="하단 메뉴"><Link href="/">메인</Link><Link href="/course">4주 교육과정</Link><Link href="/resources">무료 자료</Link></nav></div></footer>
  </div>;
}
