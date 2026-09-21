import Image from "next/image";
import Link from "next/link";
import { recruitmentUrl, siteContent } from "@/content/site-content";
import autoSitesLogo from "../../public/images/brand/autosites-auto-logo-v2.png";
import styles from "./home.module.css";
import CourseSelector from "./course-selector";

export default function HomePage() {
  const { workflow, technology, examples, deployment, footer } = siteContent;

  return <div id="top" className={styles.page}>
    <a className={styles.skipLink} href="#main-content">본문으로 바로가기</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="AutoSites 홈"><Image src={autoSitesLogo} alt="" width={40} height={40} priority /><span>AutoSites</span></a>
      <CourseSelector items={siteContent.navigation} />
      <a className={styles.headerCta} href={recruitmentUrl}>제작 방법 문의</a>
    </header>

    <main id="main-content" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>CODEX → GITHUB → VERCEL</p>
          <h1 id="hero-title">말로 요청하고,<br />검사한 뒤,<br /><em>사이트를 공개합니다.</em></h1>
          <p className={styles.lead}>AutoSites는 홈페이지 수정 요청을 실제 코드로 반영하고, 오류를 검사한 뒤 GitHub와 Vercel을 거쳐 운영 주소까지 확인하는 작업 방식입니다.</p>
          <div className={styles.actions}><a className={styles.primaryAction} href="#workflow">제작 흐름 보기 <span>↓</span></a><Link className={styles.secondaryAction} href="/setup">작업환경 준비하기</Link></div>
          <p className={styles.reassurance}>요청 내용 확인 · 기존 작업 보존 · 자동 검사 · 운영 배포 확인</p>
        </div>
        <aside className={styles.methodSummary} aria-label="AutoSites 제작 흐름">
          <span>ONE VERIFIED WORKFLOW</span>
          <ol>{workflow.steps.map((step)=><li key={step.number}><small>{step.number}</small><strong>{step.title}</strong></li>)}</ol>
        </aside>
      </section>

      <div className={`${styles.trustBar} ${styles.container}`} aria-label="AutoSites 핵심 도구"><strong>Codex 제작</strong><span>Git 변경 기록</span><span>GitHub 저장</span><span>Vercel 운영 배포</span></div>

      <section id="workflow" className={`${styles.section} ${styles.container}`} aria-labelledby="workflow-title">
        <SectionHeading eyebrow={workflow.eyebrow} title="요청 한 문장이 운영 사이트가 되는 순서" description="파일을 바로 바꾸는 데서 끝나지 않습니다. 작업 위치와 범위를 확인하고, 구현·검사·배포를 하나의 흐름으로 진행합니다." id="workflow-title" />
        <ol className={styles.methodGrid}>{workflow.steps.map((step)=><li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        <p className={styles.workflowResult}>{workflow.result}</p>
      </section>

      <section className={styles.toolSection} aria-labelledby="tools-title"><div className={styles.container}>
        <SectionHeading eyebrow={technology.eyebrow} title={technology.title} description="처음부터 모든 도구를 배울 필요는 없습니다. 각 도구가 어느 단계에서 쓰이는지만 알면 됩니다." id="tools-title" />
        <ol className={styles.toolGrid}>{technology.items.map((item,index)=><li key={item.name}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item.name}</h3><strong>{item.role}</strong><p>{item.description}</p></div></li>)}</ol>
      </div></section>

      <section className={`${styles.section} ${styles.container}`} aria-labelledby="prompts-title">
        <SectionHeading eyebrow={examples.eyebrow} title={examples.title} description="개발 용어 대신 원하는 결과를 구체적으로 말합니다. Codex는 프로젝트를 확인하고 필요한 파일을 수정합니다." id="prompts-title" />
        <ol className={styles.promptList}>{examples.items.map((item,index)=><li key={item}><span>요청 {String(index+1).padStart(2,"0")}</span><code>{item}</code></li>)}</ol>
        <div className={styles.sectionActions}><Link href="/experience#codex-prompts">Codex 질문 예시 전체 보기 →</Link><Link href="/resources">무료 실습 소스 보기 →</Link></div>
      </section>

      <section className={`${styles.deploymentSection} ${styles.container}`} aria-labelledby="deployment-title">
        <div><p className={styles.lightEyebrow}>{deployment.eyebrow}</p><h2 id="deployment-title">{deployment.title}</h2><p>수정 파일과 검사 결과, 커밋 번호, 운영 주소를 함께 확인해 변경 과정을 추적할 수 있습니다.</p></div>
        <ol>{deployment.points.map((point,index)=><li key={point.title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{point.title}</h3><p>{point.description}</p></div></li>)}</ol>
      </section>

      <section className={`${styles.finalCta} ${styles.container}`} aria-labelledby="cta-title"><p className={styles.lightEyebrow}>START WITH THE RIGHT PATH</p><h2 id="cta-title">먼저 환경을 준비하고,<br />첫 요청을 보내세요.</h2><p>직접 따라 해보고 싶다면 준비 안내와 1일 체험에서 실제 요청 문장을 확인할 수 있습니다.</p><div className={styles.ctaActions}><Link href="/setup">준비작업 시작하기 <span>→</span></Link><Link href="/about">AutoSites 소개 보기</Link></div></section>
    </main>

    <footer className={styles.footer}><div className={styles.container}><p><strong>AutoSites</strong><span>{footer.description}</span></p><nav aria-label="하단 메뉴"><Link href="/about">AutoSites 소개</Link><Link href="/course">4주 커리큘럼</Link><Link href="/resources">무료 자료</Link><Link href="/setup">준비 안내</Link></nav></div></footer>
  </div>;
}

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{title}</h2></div>{description && <p>{description}</p>}</div>;
}
