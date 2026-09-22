import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import autoSitesLogo from "../../../public/images/brand/autosites-auto-logo-v2.png";
import styles from "./setup-page.module.css";
import CourseSelector from "../course-selector";

export const metadata: Metadata = {
  title: "작업환경 준비 안내",
  description: "Codex, Git, GitHub, Vercel을 연결하고 필요할 때 Supabase를 추가하는 초보자용 안내입니다.",
  alternates: { canonical: "/setup" },
  openGraph: {
    type: "article",
    locale: "ko_KR",
    url: "/setup",
    title: "Codex 홈페이지 작업환경 준비 안내",
    description: "Codex, Git, GitHub, Vercel을 처음 연결하는 순서를 단계별로 확인하세요.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites 작업환경 준비 안내" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex 홈페이지 작업환경 준비 안내",
    description: "Codex부터 Vercel 배포까지 초보자도 따라 할 수 있는 단계별 준비 안내",
    images: ["/og.png"],
  },
};

export default function SetupPage() {
  const { setup, comparison } = siteContent;

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#setup-content">본문으로 바로가기</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="AutoSites 홈으로 이동">
          <Image src={autoSitesLogo} alt="" width={40} height={40} priority />
          AutoSites
        </Link>
        <CourseSelector items={siteContent.navigation} />
        <Link className={styles.headerAction} href="/course">4주 클래스</Link>
      </header>

      <main id="setup-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="setup-title">
          <p className={styles.eyebrow}>{setup.eyebrow}</p>
          <h1 id="setup-title">{setup.title}</h1>
          <p>{setup.description}</p>
          <div className={styles.legend}><span>{setup.requiredLabel}</span><span>{setup.optionalLabel}</span></div>
        </section>

        <section id="roles" className={styles.roles} aria-labelledby="roles-title">
          <div className={styles.rolesIntro}>
            <div><p className={styles.eyebrow}>TOOLS &amp; ROLES</p><h2 id="roles-title">{setup.rolesTitle}</h2></div>
            <p>{setup.rolesDescription}</p>
          </div>
          <ol className={styles.flow} aria-label="홈페이지 수정과 배포 흐름">
            {setup.flow.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <div className={styles.roleGrid}>
            {setup.roles.map((item, index) => (
              <article key={item.name}>
                <div><span>0{index + 1}</span><small>{item.status}</small></div>
                <h3>{item.name}</h3><strong>{item.role}</strong><p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.modeGuide} aria-labelledby="mode-guide-title">
          <div className={styles.modeIntro}><div><p className={styles.eyebrow}>{setup.modeGuide.eyebrow}</p><h2 id="mode-guide-title">{setup.modeGuide.title}</h2></div><p>{setup.modeGuide.description}</p></div>
          <div className={styles.modeGrid}>{setup.modeGuide.items.map((item, index) => <article key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><strong>{item.role}</strong><p>{item.useFor}</p><blockquote>“{item.example}”</blockquote></article>)}</div>
          <div className={styles.appFlow}><h3>데스크톱 앱에서는 이렇게 진행하세요.</h3><ol>{setup.modeGuide.appSteps.map((step) => <li key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></li>)}</ol></div>
          <aside className={styles.modeRule}><strong>{setup.modeGuide.rule}</strong><div>{setup.modeGuide.actions.map((action) => <a key={action.href} href={action.href} target="_blank" rel="noreferrer">{action.label} ↗</a>)}</div></aside>
        </section>

        <section className={styles.comparison} aria-labelledby="comparison-title">
          <div><p className={styles.eyebrow}>{comparison.eyebrow}</p><h2 id="comparison-title">{comparison.title}</h2></div>
          <article><span>{comparison.before.label}</span><h3>{comparison.before.flow}</h3><p>{comparison.before.description}</p></article>
          <article className={styles.after}><span>{comparison.after.label}</span><h3>{comparison.after.flow}</h3><p>{comparison.after.description}</p></article>
        </section>

        <section id="steps" className={styles.steps} aria-labelledby="steps-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>STEP BY STEP</p><h2 id="steps-title">위에서부터 하나씩 준비하세요.</h2><p>모든 것을 한 번에 외울 필요는 없습니다. 계정과 연결 상태를 확인하며 순서대로 진행하면 됩니다.</p></div>
          <aside className={styles.browserRule}><div><strong>{setup.browserRule.title}</strong><p>{setup.browserRule.description}</p></div><ul>{setup.browserRule.checks.map((item) => <li key={item}>✓ {item}</li>)}</ul></aside>
          <div className={styles.stepGrid}>
            {setup.steps.map((step) => (
              <article className={styles.stepCard} key={step.number}>
                <div className={styles.stepHeader}><span>{step.number}</span><small>{setup.requiredLabel}</small></div>
                <h3>{step.title}</h3><p>{step.description}</p>
                <ul>{step.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
                {"commands" in step ? <pre><code>{step.commands.join("\n")}</code></pre> : null}
                <a href={step.action.href} target="_blank" rel="noreferrer">{step.action.label} ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="supabase" className={styles.optional} aria-labelledby="supabase-title">
          <div>
            <div className={styles.stepHeader}><span>{setup.optional.number}</span><small>{setup.optionalLabel}</small></div>
            <h2 id="supabase-title">{setup.optional.title}</h2><p>{setup.optional.description}</p>
            <p className={styles.warning}>⚠ {setup.optional.warning}</p>
            <div className={styles.optionalActions}><a href={setup.optional.action.href} target="_blank" rel="noreferrer">{setup.optional.action.label} ↗</a></div>
          </div>
          <div><ul>{setup.optional.checklist.map((item) => <li key={item}>{item}</li>)}</ul><pre><code>{setup.optional.env.join("\n")}</code></pre></div>
        </section>

        <section className={styles.finalCta} aria-labelledby="setup-cta-title">
          <p className={styles.eyebrow}>READY TO BUILD</p><h2 id="setup-cta-title">준비가 끝나면, 내 주제로 직접 만들어보세요.</h2>
          <div><Link href="/">메인으로 돌아가기</Link><Link className={styles.primaryAction} href="/course">4주 과정 살펴보기 <span>→</span></Link></div>
        </section>
      </main>
      <footer className={styles.footer}><strong>AutoSites</strong><span>Codex 채팅 기반 홈페이지 제작·수정·배포 워크플로</span></footer>
    </div>
  );
}
