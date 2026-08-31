import Link from "next/link";
import { homepageTypes, websiteGoals } from "@/lib/sites/options";

export default function SiteTypePage() {
  return (
    <main className="form-page type-page">
      <header className="form-header">
        <div><p className="eyebrow">SITE TYPE</p><h1>어떤 홈페이지를 만들까요?</h1><p>가장 가까운 유형과 핵심 목적을 선택하면 이후 구성과 문구 생성에 반영됩니다.</p></div>
        <Link href="/">홈으로</Link>
      </header>
      <form className="type-form" action="/sites/new" method="get">
        <fieldset>
          <legend>홈페이지 유형</legend>
          <div className="choice-grid">
            {homepageTypes.map((type) => (
              <label className="choice-card" key={type.value}>
                <input type="radio" name="type" value={type.value} required />
                <span><strong>{type.title}</strong><small>{type.description}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>가장 중요한 목적</legend>
          <div className="goal-grid">
            {websiteGoals.map((goal) => <label className="goal-choice" key={goal.value}><input type="radio" name="goal" value={goal.value} required /><span>{goal.label}</span></label>)}
          </div>
        </fieldset>
        <button className="primary-action type-submit" type="submit">사업정보 입력하기</button>
        <p className="guest-note">회원가입 없이 시작할 수 있습니다. 입력 내용은 현재 브라우저의 익명 계정에 안전하게 저장됩니다.</p>
      </form>
    </main>
  );
}
