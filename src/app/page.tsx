import Image from "next/image";
import Link from "next/link";
import { courseContent, siteContent } from "@/content/site-content";
import { getCourseProgress } from "@/lib/course-progress";
import showcaseImage from "../../public/images/autosites-showcase.png";
import styles from "./home.module.css";
import setupStyles from "./setup.module.css";
import CourseSelector from "./course-selector";
import promotionStyles from "./course-promotion.module.css";

export default function HomePage() {
  const { hero, workflow, setup, showcase, examples, deployment, faq, finalCta, footer } = siteContent;
  const courseProgress = getCourseProgress(courseContent.progress.sessions);
  return (
    <div id="top" className={styles.page}>
      <a className={styles.skipLink} href="#main-content">본문으로 바로가기</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="AutoSites 홈"><span className={styles.brandMark} aria-hidden="true">A</span>{siteContent.brand}</a>
        <CourseSelector items={siteContent.navigation} />
        <a className={styles.githubLink} href={footer.repository} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={`${styles.hero} ${styles.container}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}><p className={styles.eyebrow}>{hero.eyebrow}</p><h1 id="hero-title">{hero.title}</h1><p className={styles.lead}>{hero.description}</p><div className={styles.actions}><a className={styles.primaryAction} href={hero.primaryAction.href}>{hero.primaryAction.label}</a><a className={styles.secondaryAction} href={hero.secondaryAction.href}>{hero.secondaryAction.label}</a></div></div>
          <div className={styles.terminal} aria-label="Codex 자동 배포 과정 예시">
            <div className={styles.terminalBar}><span /><span /><span /><p>autosites / main</p></div>
            <div className={styles.terminalBody}><p><span>$</span> codex</p><p className={styles.request}>“메인 문구와 디자인을 바꿔줘.”</p><ol><li><span>01</span> 코드 수정 <b>완료</b></li><li><span>02</span> 품질 검사 <b>통과</b></li><li><span>03</span> GitHub Push <b>완료</b></li><li><span>04</span> Vercel Deploy <b>READY</b></li></ol></div>
          </div>
        </section>
        <section className={`${promotionStyles.promotion} ${styles.container}`} aria-labelledby="course-promotion-title"><div className={promotionStyles.copy}><p>NOW RECRUITING · BUSAN</p><h2 id="course-promotion-title">초보자를 위한<br />4주 홈페이지 제작 과정</h2><span>Codex로 만들고 GitHub에 저장한 뒤 Vercel로 직접 배포합니다.</span><div className={promotionStyles.actions}><Link href="/course">교육과정 전체 보기 <span aria-hidden="true">→</span></Link><a href={courseContent.recruitment.action.href} target="_blank" rel="noreferrer">당근에서 문의하기 <span aria-hidden="true">↗</span></a></div></div><div className={promotionStyles.summary}><div><small>교육비</small><strong>{courseContent.fee.amount}</strong></div><ul>{courseContent.hero.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><div className={promotionStyles.progress}><span><b />1기 진행률 {courseProgress.percentageLabel}</span><p>{courseProgress.summary}</p></div></div></section>
        <section id="workflow" className={`${styles.section} ${styles.container}`} aria-labelledby="workflow-title">
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>{workflow.eyebrow}</p><h2 id="workflow-title">{workflow.title}</h2><p>{workflow.description}</p></div>
          <ol className={styles.steps}>{workflow.steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </section>
        <section id="setup" className={`${styles.section} ${styles.container}`} aria-labelledby="setup-title">
          <div className={setupStyles.setupIntro}><div className={styles.sectionIntro}><p className={styles.eyebrow}>{setup.eyebrow}</p><h2 id="setup-title">{setup.title}</h2><p>{setup.description}</p></div><div className={setupStyles.setupLegend} aria-label="준비 항목 구분"><span>{setup.requiredLabel}</span><span>{setup.optionalLabel}</span></div></div>
          <div className={setupStyles.roles} aria-labelledby="roles-title"><div className={setupStyles.rolesHeading}><h3 id="roles-title">{setup.rolesTitle}</h3><p>{setup.rolesDescription}</p></div><ol className={setupStyles.roleFlow} aria-label="홈페이지 작업 환경 연결 순서">{setup.flow.map((item) => <li key={item}>{item}</li>)}</ol><div className={setupStyles.roleGrid}>{setup.roles.map((item) => <article key={item.name}><div><strong>{item.name}</strong><small>{item.status}</small></div><h4>{item.role}</h4><p>{item.description}</p></article>)}</div></div>
          <div className={setupStyles.setupGrid}>
            {setup.steps.map((step) => <article className={setupStyles.setupCard} key={step.number}><div className={setupStyles.setupCardHeader}><span>{step.number}</span><small>{setup.requiredLabel}</small></div><h3>{step.title}</h3><p>{step.description}</p><ul>{step.checklist.map((item) => <li key={item}>{item}</li>)}</ul>{"commands" in step && step.commands ? <pre><code>{step.commands.join("\n")}</code></pre> : null}<a href={step.action.href} target="_blank" rel="noreferrer">{step.action.label} <span aria-hidden="true">↗</span></a></article>)}
            <article className={`${setupStyles.setupCard} ${setupStyles.optionalCard}`}><div><div className={setupStyles.setupCardHeader}><span>{setup.optional.number}</span><small>{setup.optionalLabel}</small></div><h3>{setup.optional.title}</h3><p>{setup.optional.description}</p><ul>{setup.optional.checklist.map((item) => <li key={item}>{item}</li>)}</ul></div><div><pre><code>{setup.optional.env.join("\n")}</code></pre><p className={setupStyles.setupWarning}>{setup.optional.warning}</p><a href={setup.optional.action.href} target="_blank" rel="noreferrer">{setup.optional.action.label} <span aria-hidden="true">↗</span></a></div></article>
          </div>
        </section>
        <section id="showcase" className={`${styles.section} ${styles.showcase}`} aria-labelledby="showcase-title">
          <div className={styles.container}>
            <div className={styles.showcaseIntro}><div className={styles.sectionIntro}><p className={styles.eyebrow}>{showcase.eyebrow}</p><h2 id="showcase-title">{showcase.title}</h2></div><p>{showcase.description}</p></div>
            <figure className={styles.showcaseVisual}><Image src={showcaseImage} alt={showcase.imageAlt} sizes="(max-width: 900px) 100vw, 1180px" placeholder="blur" /><figcaption>하나의 작업 흐름으로 제작한 서로 다른 홈페이지 방향 예시</figcaption></figure>
            <div className={styles.caseGrid}>{showcase.cases.map((item, index) => <article key={item.type}><div><span>0{index + 1}</span><small>{item.type}</small></div><h3>{item.title}</h3><blockquote>“{item.request}”</blockquote><p>{item.result}</p></article>)}</div>
          </div>
        </section>
        <section id="examples" className={styles.examples} aria-labelledby="examples-title"><div className={`${styles.container} ${styles.examplesGrid}`}><div className={styles.sectionIntro}><p className={styles.eyebrow}>{examples.eyebrow}</p><h2 id="examples-title">{examples.title}</h2></div><div className={styles.prompts}>{examples.items.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}</div></div></section>
        <section id="deployment" className={`${styles.section} ${styles.container}`} aria-labelledby="deployment-title">
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>{deployment.eyebrow}</p><h2 id="deployment-title">{deployment.title}</h2></div>
          <div className={styles.deployGrid}><div className={styles.deployStatus}><span className={styles.liveDot} aria-hidden="true" /><p>Production deployment</p><strong>READY</strong><small>main · autosites-jd3d.vercel.app</small></div><ul className={styles.safetyList}>{deployment.points.map((point, index) => <li key={point.title}><span>0{index + 1}</span><div><h3>{point.title}</h3><p>{point.description}</p></div></li>)}</ul></div>
        </section>
        <section id="faq" className={`${styles.section} ${styles.container}`} aria-labelledby="faq-title"><div className={styles.sectionIntro}><p className={styles.eyebrow}>{faq.eyebrow}</p><h2 id="faq-title">{faq.title}</h2></div><div className={styles.faqList}>{faq.items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>
        <section className={styles.finalCta} aria-labelledby="cta-title"><div className={styles.container}><p className={styles.eyebrow}>{finalCta.eyebrow}</p><h2 id="cta-title">{finalCta.title}</h2><p>{finalCta.description}</p><a href={finalCta.action.href}>{finalCta.action.label} <span aria-hidden="true">→</span></a></div></section>
      </main>
      <footer className={styles.footer}><div className={styles.container}><p><strong>{siteContent.brand}</strong><span>{footer.description}</span></p><a href={footer.repository} target="_blank" rel="noreferrer">GitHub 저장소 ↗</a></div></footer>
    </div>
  );
}
