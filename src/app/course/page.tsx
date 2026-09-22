import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { courseContent, siteContent } from "@/content/site-content";
import { getCourseProgress } from "@/lib/course-progress";
import vibeCodingImage from "../../../image/vibe.webp";
import autoSitesLogo from "../../../public/images/brand/autosites-auto-logo-v2.png";
import styles from "./course.module.css";
import actionStyles from "./recruitment.module.css";
import visualStyles from "./visual.module.css";
import detailStyles from "./curriculum-detail.module.css";
import infoStyles from "./information-detail.module.css";
import recordStyles from "./records.module.css";
import completionStyles from "./completion.module.css";
import promiseStyles from "./promise.module.css";
import guideStyles from "./action-guide.module.css";
import instructorStyles from "./instructor.module.css";
import workshopStyles from "./api-workshop.module.css";
import CourseSelector from "../course-selector";

export const metadata: Metadata = {
  title: "초보자를 위한 Codex 홈페이지 제작 4주 과정",
  description: "부산에서 진행하는 Codex 홈페이지 제작·GitHub 저장·Vercel 배포 4주 실습 과정",
  alternates: { canonical: "/course" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/course",
    title: "초보자를 위한 Codex 홈페이지 제작 4주 과정",
    description: "부산에서 4주 동안 내 홈페이지를 만들고 GitHub와 Vercel로 실제 URL까지 배포합니다.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites 4주 실전 홈페이지 제작 과정" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "초보자를 위한 Codex 홈페이지 제작 4주 과정",
    description: "내 홈페이지 제작부터 실제 URL 배포까지 함께하는 부산 4주 실습 과정",
    images: ["/og.png"],
  },
};

export default function CoursePage() {
  const { hero, promise, instructor, progress, records, audience, apiWorkshop, curriculum, outcomes, completion, nextCohort, fee, venue, preparation, recruitment } = courseContent;
  const courseProgress = getCourseProgress(progress.sessions);

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#course-main">본문으로 바로가기</a>
      <header className={styles.header} data-site-header><Link className={styles.brand} href="/"><Image src={autoSitesLogo} alt="" width={40} height={40} priority />AutoSites</Link><CourseSelector items={siteContent.navigation} /><Link className={styles.homeLink} href="/">메인으로</Link></header>
      <main id="course-main" className={styles.main} tabIndex={-1}>
        <section className={`${styles.hero} ${styles.container}`} aria-labelledby="course-title"><div><p className={styles.eyebrow}>{hero.eyebrow}</p><h1 id="course-title">{hero.title}</h1><p className={styles.lead}>{hero.description}</p><div className={styles.actions}><a href={recruitment.action.href} target="_blank" rel="noreferrer">당근에서 남은 자리 문의하기 ↗</a><a href="#api-workshop">AI API 실습표 보기 ↓</a></div><div className={guideStyles.guide} aria-label="지금 신청하는 방법"><strong>지금 할 일</strong><ol><li><span>1</span>당근 모임 열기</li><li><span>2</span>“4주 과정 문의” 채팅 보내기</li><li><span>3</span>남은 자리 안내받기</li></ol><small>바로 신청하지 않아도 괜찮습니다. 실제 남은 자리와 궁금한 점부터 확인하세요.</small></div></div><aside className={styles.heroCard} aria-label="교육과정 핵심 정보"><p>최대 8명 · 부산 · 초보자 실습</p><strong>{fee.amount}</strong><span>{fee.label} · 장소·빔프로젝터·커피 포함</span><ul>{hero.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></aside></section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="promise-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{promise.eyebrow}</p><h2 id="promise-title">{promise.title}</h2></div><p>혼자 시작하면 설치와 배포에서 멈추기 쉽습니다. 수업에서는 원하는 내용을 말하고 결과를 확인해 실제 주소로 공개하는 전 과정을 함께 끝냅니다.</p></div><div className={promiseStyles.concerns}>{promise.concerns.map((item) => <article key={item.question}><h3>“{item.question}”</h3><p>{item.answer}</p></article>)}</div><div className={promiseStyles.deliverables}><div><span>TAKE IT HOME</span><h3>{promise.deliverablesTitle}</h3></div><ol>{promise.deliverables.map((item) => <li key={item.number}><span>{item.number}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></li>)}</ol></div><a className={promiseStyles.cta} href={recruitment.action.href} target="_blank" rel="noreferrer">당근에서 남은 자리 문의하기 <span aria-hidden="true">↗</span></a></section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="vibe-title"><div className={visualStyles.heading}><div><p className={styles.eyebrow}>VIBE CODING</p><h2 id="vibe-title">수업에서 배우는 제작 방식</h2></div><p>만들고 싶은 기능을 자연어로 설명하고, AI가 제안한 코드를 확인하며 수정과 배포까지 이어가는 과정을 한눈에 살펴보세요.</p></div><figure className={visualStyles.figure}><Image src={vibeCodingImage} alt="아이디어 구상, AI와 대화, 코드 적용, 수정과 개선, 완성과 배포로 이어지는 바이브코딩 흐름 안내" sizes="(max-width: 900px) calc(100vw - 40px), 1180px" placeholder="blur" /><figcaption>바이브코딩의 개념과 흐름, 실습에 활용하는 AI 도구 안내</figcaption></figure></section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="instructor-title"><div className={instructorStyles.intro}><div className={instructorStyles.identity}><Image src={autoSitesLogo} alt="" width={88} height={88} /><div><p className={styles.eyebrow}>{instructor.eyebrow}</p><strong>{instructor.name}</strong></div></div><div><h2 id="instructor-title">{instructor.title}</h2><p>{instructor.description}</p><small>{instructor.proof}</small></div></div><div className={instructorStyles.support}>{instructor.support.map((item) => <article key={item.title}><span aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>

        <section id="progress" className={styles.progressSection} aria-labelledby="progress-title"><div className={styles.container}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{progress.eyebrow}</p><h2 id="progress-title">{progress.title}</h2><small className={styles.updatedAt}>{progress.updatedAt}</small></div><p>{progress.description}</p></div><div className={styles.progressMeta}><strong>{courseProgress.percentageLabel}</strong><div aria-label={`교육 진행률 ${courseProgress.percentageLabel}`}><span style={{ width: courseProgress.percentageLabel }} /></div></div><ol className={styles.sessionList}>{progress.sessions.map((session) => <li key={session.week} className={session.status === "완료" ? styles.completed : undefined}><span>{session.week}</span><time>{session.date}</time><strong>{session.topic}</strong><small>{session.status}</small></li>)}</ol></div></section>

        <section id="records" className={`${styles.section} ${styles.container}`} aria-labelledby="records-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{records.eyebrow}</p><h2 id="records-title">{records.title}</h2></div><p>{records.description}</p></div><div className={recordStyles.list}>{records.items.map((record) => <article key={record.week}><header><div><span>{record.week}</span><time>{record.date}</time></div><strong>교육 완료</strong></header><h3>{record.title}</h3><p>{record.summary}</p><div className={recordStyles.completedItems}><h4>완료한 내용</h4><ul>{record.completed.map((item) => <li key={item}>{item}</li>)}</ul></div><p className={recordStyles.next}><small>다음 수업</small>{record.next}</p></article>)}</div></section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="audience-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>WHO IT IS FOR</p><h2 id="audience-title">이런 분에게 맞습니다.</h2></div><p>코드를 암기하기보다 만들고 싶은 내용을 설명하고, 결과를 확인하고, 직접 운영하는 방법을 배웁니다.</p></div><ul className={styles.audienceGrid}>{audience.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></section>

        <section id="api-workshop" className={`${styles.section} ${styles.container}`} aria-labelledby="api-workshop-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{apiWorkshop.eyebrow}</p><h2 id="api-workshop-title">{apiWorkshop.title}</h2></div><p>{apiWorkshop.description}</p></div><div className={workshopStyles.summary}><span>2시간 실습의 완성 목표</span><strong>{apiWorkshop.goal}</strong></div><div className={workshopStyles.downloads} aria-labelledby="api-downloads-title"><div><span>DOWNLOAD</span><h3 id="api-downloads-title">실습 자료를 먼저 준비하세요.</h3><p>실제 API 키는 포함되어 있지 않습니다. 압축을 푼 뒤 안내서 순서대로 자신의 키를 안전하게 설정하세요.</p><Link className={workshopStyles.resourceHub} href="/resources">대상·난이도별 무료 자료실 보기 →</Link></div><ul>{apiWorkshop.resources.map((resource) => <li key={resource.href}><span>{resource.type}</span><div><small>{resource.order} · {resource.difficulty}</small><strong>{resource.title}</strong><p>{resource.description}</p></div><a href={resource.href} download={resource.fileName}>다운로드 ↓</a></li>)}</ul></div><ol className={workshopStyles.schedule}>{apiWorkshop.schedule.map((item, index) => <li key={item.time}><span className={workshopStyles.number}>{String(index + 1).padStart(2, "0")}</span><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.result}</p></div></li>)}</ol><aside className={workshopStyles.principles} aria-label="초보자 실습 진행 원칙"><h3>처음이어도 끝까지 따라오는 진행 원칙</h3><ul>{apiWorkshop.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul></aside></section>

        <section id="curriculum" className={`${styles.section} ${styles.container}`} aria-labelledby="curriculum-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>CURRICULUM</p><h2 id="curriculum-title">매주 하나씩 완성합니다.</h2></div><p>설명만 듣는 수업이 아니라 자신의 노트북에서 직접 만들고 저장하고 배포합니다.</p></div><div className={styles.curriculumGrid}>{curriculum.map((week) => <article key={week.week}><div className={detailStyles.cardHeading}><div><span>WEEK {week.week}</span><h3>{week.title}</h3></div><small className={week.status === "완료" ? detailStyles.done : undefined}>{week.status}</small></div><p className={detailStyles.objective}>{week.objective}</p><ul>{week.items.map((item) => <li key={item}>{item}</li>)}</ul><div className={detailStyles.lessonPlan} aria-label={`${week.week}주차 2시간 수업표`}><strong>2시간 수업표</strong><ol>{week.schedule.map((item) => <li key={item.time}><time>{item.time}</time><span>{item.lesson}</span></li>)}</ol></div><p><small>이번 주 결과물</small>{week.result}</p></article>)}</div></section>

        <section className={styles.outcomeSection} aria-labelledby="outcomes-title"><div className={`${styles.container} ${styles.outcomeGrid}`}><div><p className={styles.eyebrow}>AFTER 4 WEEKS</p><h2 id="outcomes-title">수료 후 직접 할 수 있는 일</h2></div><ol>{outcomes.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div></section>

        <section id="next-cohort" className={`${styles.section} ${styles.container}`} aria-labelledby="completion-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{completion.eyebrow}</p><h2 id="completion-title">{completion.title}</h2></div><div className={completionStyles.intro}><strong>{completion.status} · {courseProgress.percentageLabel}</strong><p>{completion.description}</p></div></div><div className={completionStyles.slots}>{completion.resultSlots.map((slot) => <article key={slot.title}><span>{slot.timing}</span><h3>{slot.title}</h3><p>{slot.description}</p>{"href" in slot ? <a href={slot.href} target="_blank" rel="noreferrer">{slot.actionLabel} <span aria-hidden="true">↗</span></a> : <small>공개 자료 준비 중</small>}</article>)}</div><p className={completionStyles.privacy}>{completion.privacy}</p><aside className={completionStyles.next}><div><span>{nextCohort.label}</span><h3>{nextCohort.title}</h3><p>{nextCohort.description}</p></div><div><strong>{nextCohort.schedule}</strong><a href={recruitment.action.href} target="_blank" rel="noreferrer">{nextCohort.actionLabel} <span aria-hidden="true">↗</span></a></div></aside></section>

        <section id="information" className={`${styles.section} ${styles.container}`} aria-labelledby="information-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>COURSE INFORMATION</p><h2 id="information-title">교육비와 장소 안내</h2></div><p>추가 장소비 없이 노트북과 충전기만 준비하면 바로 실습에 참여할 수 있습니다.</p></div><div className={styles.informationGrid}><article className={styles.feeCard}><p>{fee.label}</p><strong>{fee.amount}</strong><p className={infoStyles.description}>{fee.description}</p><ul>{fee.included.map((item) => <li key={item}>{item}</li>)}</ul></article><article className={styles.venueCard}><p>교육 장소</p><h3>{venue.name}</h3><address>{venue.address}</address><span>{venue.description}</span><strong>{venue.time}</strong><ul className={infoStyles.venueDetails}>{venue.details.map((item) => <li key={item}>{item}</li>)}</ul><a className={infoStyles.mapAction} href={venue.mapUrl} target="_blank" rel="noreferrer">카카오맵에서 위치 보기 <span aria-hidden="true">↗</span></a></article><article className={styles.preparationCard}><p>개인 준비물</p><ul>{preparation.map((item) => <li key={item}>{item}</li>)}</ul><small>프로그램 설치 과정과 Wi-Fi 비밀번호는 수업 현장에서 안내합니다.</small></article></div></section>

        <section id="recruitment" className={styles.recruitment} aria-labelledby="recruitment-title"><div className={styles.container}><p className={styles.eyebrow}>{recruitment.status}</p><div className={actionStyles.heading}><div><h2 id="recruitment-title">{recruitment.title}</h2><p>{recruitment.description}</p></div><strong>{recruitment.capacity}</strong></div><ol className={actionStyles.steps}>{recruitment.steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol><div className={actionStyles.inquiry}><div><h3>채팅에 알려주면 좋은 내용</h3><ul>{recruitment.inquiryItems.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p>{recruitment.privacy}</p><a className={actionStyles.action} href={recruitment.action.href} target="_blank" rel="noreferrer">{recruitment.action.label} <span aria-hidden="true">↗</span></a></div></div></div></section>
      </main>
      <footer className={styles.footer}><div className={styles.container}><strong>AutoSites Course</strong><Link href="/">메인 홈페이지로 돌아가기 →</Link></div></footer>
    </div>
  );
}
