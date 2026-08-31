import Link from "next/link";

const milestones = ["사업정보 입력", "홈페이지 자동 생성", "Preview 확인", "클릭 한 번으로 공개"];

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">HOMEPAGE AUTOMATION</p>
        <h1 id="hero-title">사업정보만 입력하면,<br />홈페이지가 시작됩니다.</h1>
        <p className="hero-copy">AutoSites는 기획, 구성, 미리보기와 공개 과정을 하나의 흐름으로 연결하는 홈페이지 자동화 SaaS입니다.</p>
        <div className="actions" aria-label="주요 작업">
          <Link className="primary-action" href="/sites/new/type">무료로 시작하기</Link>
          <Link className="secondary-action" href="/sign-in">로그인</Link>
        </div>
      </section>
      <section className="process" id="mvp" aria-labelledby="mvp-title">
        <div><p className="eyebrow">FIRST MILESTONE</p><h2 id="mvp-title">첫 MVP의 네 단계</h2></div>
        <ol>{milestones.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </section>
    </main>
  );
}
