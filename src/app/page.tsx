import Image from "next/image";
import Link from "next/link";
import { courseContent, recruitmentUrl, siteContent } from "@/content/site-content";
import showcaseImage from "../../public/images/autosites-showcase.webp";
import autoSitesLogo from "../../public/images/brand/autosites-auto-logo-v2.png";
import styles from "./home.module.css";
import CourseSelector from "./course-selector";
import HeroSlider from "./hero-slider";

const journeyIcons = ["💬", "✨", "🧩", "🚀"];
const audienceIcons = ["💡", "🛠️", "🌱", "🤖", "💼", "🧩"];
const workflowIcons = ["✍️", "🤖", "🎨", "🌐"];
const projectIcons = ["🏪", "☕", "🎨", "👥", "📅", "🤖"];
const classIcons = ["🧭", "🎨", "⚙️", "🚀"];
const reasonIcons = ["⏱️", "🤝", "🌐", "📈"];

export default function HomePage() {
  const { hero, journey, audience, workflow, projects, classPreview, whyNow, pricing, showcase, faq, finalCta, footer } = siteContent;
  return <div id="top" className={styles.page}>
    <a className={styles.skipLink} href="#main-content">본문으로 바로가기</a>
    <header className={styles.header}><a className={styles.brand} href="#top" aria-label="AutoSites 홈"><Image src={autoSitesLogo} alt="" width={40} height={40} priority />AutoSites</a><CourseSelector items={siteContent.navigation} /><a className={styles.headerCta} href={recruitmentUrl}>당근에서 자리 문의</a></header>
    <main id="main-content" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="hero-title">
        <HeroSlider className={styles.heroBackdrop} />
        <div className={styles.heroOrbits} aria-hidden="true"><span>✦ AI</span><span>⌁ CODE</span><span>↗ LIVE</span></div>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>{hero.eyebrow}</p><h1 id="hero-title">{hero.title}</h1><p className={styles.lead}>{hero.description}</p><div className={styles.actions}><Link className={styles.primaryAction} href={hero.primaryAction.href}>{hero.primaryAction.label}<span>→</span></Link><a className={styles.secondaryAction} href={hero.secondaryAction.href}>{hero.secondaryAction.label}</a></div><small className={styles.heroNote}>✓ {hero.note}</small></div>
      </section>
      <section className={styles.journey} aria-label="아이디어에서 실제 URL까지"><div className={styles.container}>{journey.map((item,index)=><div key={item}><b className={styles.iconBubble} aria-hidden="true">{journeyIcons[index]}</b><span>0{index+1}</span><strong>{item}</strong></div>)}<p>아이디어에서 실제 URL까지</p></div></section>
      <section className={`${styles.section} ${styles.container}`} aria-labelledby="audience-title"><Heading eyebrow={audience.eyebrow} title={audience.title} id="audience-title"/><div className={styles.audienceGrid}>{audience.items.map((item,index)=><article key={item.title}><b className={styles.iconBubble} aria-hidden="true">{audienceIcons[index]}</b><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><a className={styles.inlineCta} href={recruitmentUrl}>당근에서 남은 자리 문의하기 <span>→</span></a></section>
      <section id="process" className={styles.process} aria-labelledby="process-title"><div className={styles.container}><Heading eyebrow={workflow.eyebrow} title={workflow.title} description={workflow.description} id="process-title"/><ol className={styles.processSteps}>{workflow.steps.map((step,index)=><li key={step.number}><b className={styles.processIcon} aria-hidden="true">{workflowIcons[index]}</b><span>STEP {step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol><p className={styles.resultCallout}>🚀 {workflow.result}</p></div></section>
      <section id="projects" className={`${styles.section} ${styles.container}`} aria-labelledby="projects-title"><Heading eyebrow={projects.eyebrow} title={projects.title} description={projects.description} id="projects-title"/><div className={styles.projectGrid}>{projects.items.map((item,index)=><article key={item.title}><div className={styles.miniBrowser}><div><i/><i/><i/></div><b className={styles.projectIcon} aria-hidden="true">{projectIcons[index]}</b><span>{item.type}</span><strong>{item.title}</strong><small>{item.accent} →</small></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><a className={styles.inlineCta} href="#showcase">프로젝트 살펴보기 <span>↓</span></a></section>
      <section id="showcase" className={styles.showcase} aria-labelledby="showcase-title"><div className={styles.container}><Heading eyebrow={showcase.eyebrow} title={showcase.title} description={showcase.description} id="showcase-title"/><figure><Image src={showcaseImage} alt={showcase.imageAlt} sizes="(max-width: 900px) 100vw, 1180px" placeholder="blur"/></figure></div></section>
      <section id="class" className={styles.classSection} aria-labelledby="class-title"><div className={`${styles.container} ${styles.classGrid}`}><div><Heading eyebrow={classPreview.eyebrow} title={classPreview.title} id="class-title"/><p className={styles.classPromise}>{classPreview.promise}</p><Link className={styles.lightCta} href={classPreview.action.href}>{classPreview.action.label} <span>→</span></Link></div><ol>{classPreview.weeks.map((item,index)=><li key={item.week}><b aria-hidden="true">{classIcons[index]}</b><span>{item.week}</span><strong>{item.title}</strong></li>)}</ol></div></section>
      <section className={`${styles.section} ${styles.container} ${styles.whyNow}`} aria-labelledby="why-now-title"><Heading eyebrow={whyNow.eyebrow} title={whyNow.title} description={whyNow.description} id="why-now-title"/><div className={styles.reasonGrid}>{whyNow.reasons.map((item,index)=><article key={item.number}><b className={styles.iconBubble} aria-hidden="true">{reasonIcons[index]}</b><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><div className={styles.whyResult}><div><strong>{whyNow.result}</strong><small>{whyNow.note}</small></div><Link className={styles.primaryAction} href={whyNow.action.href}>{whyNow.action.label} <span>→</span></Link></div></section>
      <section id="pricing" className={`${styles.section} ${styles.container}`} aria-labelledby="pricing-title"><div className={styles.pricingCard}><div><p className={styles.eyebrow}>{pricing.eyebrow}</p><h2 id="pricing-title">{pricing.title}</h2><p>{courseContent.fee.description}</p></div><div className={styles.price}><small>{courseContent.fee.label}</small><strong>{courseContent.fee.amount}</strong><span>장소 · 빔프로젝터 · 커피 제공</span></div><ul>{pricing.included.map(item=><li key={item}>✓ {item}</li>)}</ul><Link className={styles.primaryAction} href={pricing.action.href}>{pricing.action.label} <span>→</span></Link></div></section>
      <section className={`${styles.setupTeaser} ${styles.container}`} aria-labelledby="setup-teaser-title"><div><p className={styles.eyebrow}>SETUP GUIDE</p><h2 id="setup-teaser-title">처음 설정은 별도 안내에서 천천히.</h2><p>Codex·Git·GitHub·Vercel 연결 방법과 Supabase가 필요한 시점을 초보자 순서로 정리했습니다.</p></div><Link className={styles.primaryAction} href="/setup">작업환경 준비 안내 보기 <span>→</span></Link></section>
      <section id="faq" className={`${styles.section} ${styles.container}`} aria-labelledby="faq-title"><Heading eyebrow={faq.eyebrow} title={faq.title} id="faq-title"/><div className={styles.faqList}>{faq.items.map(item=><details key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>
      <section className={styles.finalCta} aria-labelledby="cta-title"><div className={styles.container}><p className={styles.eyebrow}>{finalCta.eyebrow}</p><h2 id="cta-title">{finalCta.title}</h2><p>{finalCta.description}</p><Link href={finalCta.action.href}>{finalCta.action.label} <span>→</span></Link></div></section>
    </main>
    <footer className={styles.footer}><div className={styles.container}><p><strong>AutoSites</strong><span>{footer.description}</span></p><div><Link href="/course">4주 클래스</Link><a href={footer.repository} target="_blank" rel="noreferrer">GitHub ↗</a></div></div></footer>
  </div>;
}

function Heading({eyebrow,title,description,id}:{eyebrow:string;title:string;description?:string;id:string}){return <div className={styles.sectionHeading}><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{title}</h2>{description?<p>{description}</p>:null}</div>}
