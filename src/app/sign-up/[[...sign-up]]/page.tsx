import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <p className="eyebrow">START AUTOSITES</p>
        <h1>첫 홈페이지를<br />시작하세요.</h1>
        <p>계정을 만든 뒤 사업정보를 입력하면 홈페이지 초안을 자동으로 생성합니다.</p>
      </section>
      <section className="auth-panel" aria-label="회원가입 양식">
        <SignUp />
      </section>
    </main>
  );
}
