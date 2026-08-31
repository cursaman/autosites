import Image from "next/image";
import { siteContent } from "@/content/site-content";
import showcaseImage from "../../public/images/autosites-showcase.png";
import styles from "./home.module.css";

export default function HomePage() {
  const { hero, workflow, showcase, examples, deployment, faq, finalCta, footer } = siteContent;
  return (
    <div id="top" className={styles.page}>
      <a className={styles.skipLink} href="#main-content">본문으로 바로가기</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="AutoSites 홈"><span className={styles.brandMark} aria-hidden="true">A</span>{siteContent.brand}</a>
        <nav className={styles.navigation} aria-label="주요 메뉴">{siteContent.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
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
        <section id="workflow" className={`${styles.section} ${styles.container}`} aria-labelledby="workflow-title">
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>{workflow.eyebrow}</p><h2 id="workflow-title">{workflow.title}</h2><p>{workflow.description}</p></div>
          <ol className={styles.steps}>{workflow.steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
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
