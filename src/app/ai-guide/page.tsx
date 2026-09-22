import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import autoSitesLogo from "../../../public/images/brand/autosites-auto-logo-v2.png";
import CourseSelector from "../course-selector";
import styles from "./ai-guide.module.css";

export const metadata: Metadata = {
  title: "ChatGPT·Claude·Gemini 비교 | AutoSites",
  description: "ChatGPT, Claude, Gemini의 역할과 초보자에게 맞는 사용 상황, AutoSites 홈페이지 제작 흐름을 비교합니다.",
  alternates: { canonical: "/ai-guide" },
  openGraph: { type: "website", locale: "ko_KR", url: "/ai-guide", title: "ChatGPT·Claude·Gemini 역할 비교", description: "AI를 순위가 아니라 작업 역할로 비교하고 내 상황에 맞는 도구를 고르세요.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites AI 도구 비교 안내" }] },
};

export default function AiGuidePage() {
  const guide = siteContent.aiGuide;
  return <div className={styles.page}>
    <a className={styles.skipLink} href="#ai-guide-main">본문으로 바로가기</a>
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="AutoSites 홈으로 이동"><Image src={autoSitesLogo} alt="" width={40} height={40} priority />AutoSites</Link>
      <CourseSelector items={siteContent.navigation} />
      <Link className={styles.headerAction} href="/setup">준비작업</Link>
    </header>
    <main id="ai-guide-main" tabIndex={-1}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="guide-title">
        <p className={styles.eyebrow}>AI TOOL GUIDE</p><h1 id="guide-title">어떤 AI를<br /><em>어디에 써야 할까요?</em></h1>
        <p className={styles.heroCopy}>ChatGPT, Claude, Gemini는 겹치는 기능이 많습니다. 초보자는 하나를 승자로 고르기보다 <strong>지금 할 작업의 역할</strong>에 맞춰 고르면 쉽습니다.</p>
        <div className={styles.heroActions}><a href="#comparison">작업별 비교 보기</a><a href="#workflow">홈페이지 제작 순서 보기</a></div>
        <p className={styles.notice}>기능과 제공 범위는 요금제·계정·지역·관리자 설정에 따라 달라질 수 있습니다. 중요한 결과는 원문과 출처를 다시 확인하세요.</p>
      </section>
      <section className={`${styles.section} ${styles.container}`} id="quick-guide" aria-labelledby="quick-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>QUICK GUIDE</p><h2 id="quick-title">이름보다 역할부터<br />고르세요.</h2></div><p>세 도구 모두 질문과 글쓰기를 할 수 있지만, 연결된 환경과 최종 작업 방식에서 차이가 납니다.</p></div>
        <div className={styles.toolGrid}>{guide.tools.map((tool, index) => <article key={tool.name} className={styles.toolCard}><span>0{index + 1}</span><h3>{tool.name}</h3><strong>{tool.label}</strong><p>{tool.role}</p><ul>{tool.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>
      <section className={styles.comparison} id="comparison" aria-labelledby="comparison-title"><div className={styles.container}>
        <div className={styles.darkHeading}><div><p>ROLE COMPARISON</p><h2 id="comparison-title">같은 질문이 아니라,<br />같은 작업으로 비교했습니다.</h2></div><span>모바일에서는 표를 좌우로 밀어 확인하세요.</span></div>
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="ChatGPT Claude Gemini 작업별 비교표"><table><thead><tr><th>하려는 작업</th><th>ChatGPT</th><th>Claude</th><th>Gemini</th></tr></thead><tbody>{guide.comparisons.map((row) => <tr key={row.task}><th>{row.task}</th><td>{row.chatgpt}</td><td>{row.claude}</td><td>{row.gemini}</td></tr>)}</tbody></table></div>
      </div></section>
      <section className={`${styles.section} ${styles.container}`} id="gpt-roles" aria-labelledby="gpt-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>INSIDE CHATGPT</p><h2 id="gpt-title">GPT 안에서도<br />역할이 다릅니다.</h2></div><p>Chat, ChatGPT Work, Codex처럼 질문하는 화면과 결과물을 만드는 공간, 프로젝트 파일을 수정하는 개발 도구를 구분하면 덜 혼란스럽습니다.</p></div>
        <div className={styles.roleGrid}>{guide.gptRoles.map((item, index) => <article key={item.name}><span>STEP 0{index + 1}</span><h3>{item.name}</h3><strong>{item.question}</strong><p>{item.role}</p></article>)}</div>
      </section>
      <section className={`${styles.workflow} ${styles.container}`} id="workflow" aria-labelledby="workflow-title">
        <div><p className={styles.lightEyebrow}>AUTOSITES WORKFLOW</p><h2 id="workflow-title">도구가 달라도<br />홈페이지는 이 순서로<br />세상에 나옵니다.</h2><p>Claude나 Gemini에서 만든 기획을 복사해 Codex에 전달해도 됩니다. 중요한 것은 각 단계의 결과를 확인하고 다음 역할로 넘기는 것입니다.</p></div>
        <ol>{guide.workflow.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
      </section>
      <section className={`${styles.section} ${styles.container}`} aria-labelledby="choice-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>CHOOSE BY SITUATION</p><h2 id="choice-title">내 상황이 이렇다면<br />이렇게 시작하세요.</h2></div></div>
        <div className={styles.choiceGrid}><article><span>Google 중심</span><h3>Gmail·Drive·Docs를 자주 쓴다면</h3><p><strong>Gemini</strong>로 Google 자료를 찾고 정리하는 흐름부터 시작하세요.</p></article><article><span>문서 중심</span><h3>긴 글을 읽고 다듬는 일이 많다면</h3><p><strong>Claude 또는 Work</strong>에서 문서의 구조와 표현을 먼저 정리하세요.</p></article><article><span>제작 중심</span><h3>실제 홈페이지 파일을 바꿔야 한다면</h3><p><strong>Codex</strong>에 작업공간을 확인시키고 수정·검사·배포를 맡기세요.</p></article></div>
      </section>
      <section className={`${styles.sources} ${styles.container}`} aria-labelledby="sources-title"><div><p className={styles.eyebrow}>OFFICIAL SOURCES</p><h2 id="sources-title">기능 설명은 공식 안내를<br />기준으로 확인했습니다.</h2></div><nav aria-label="AI 도구 공식 안내"><a href="https://learn.chatgpt.com/docs/use-chatgpt" target="_blank" rel="noreferrer">OpenAI · Use ChatGPT ↗</a><a href="https://docs.anthropic.com/en/docs/welcome" target="_blank" rel="noreferrer">Anthropic · Claude 소개 ↗</a><a href="https://support.google.com/gemini/answer/15229592" target="_blank" rel="noreferrer">Google · Workspace 연결 ↗</a></nav></section>
    </main>
    <footer className={styles.footer}><div className={styles.container}><p><strong>AutoSites</strong><span>아이디어를 나누면, 홈페이지가 세상에 나옵니다.</span></p><nav aria-label="하단 메뉴"><Link href="/">제작 방법</Link><Link href="/setup">준비작업</Link><Link href="/course">4주 교육과정</Link></nav></div></footer>
  </div>;
}
