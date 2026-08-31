import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>다시 이어서<br />만들어볼까요?</h1>
        <p>로그인하면 작성 중인 홈페이지와 최근 배포 상태를 확인할 수 있습니다.</p>
      </section>
      <section className="auth-panel" aria-label="로그인 양식">
        <SignIn />
      </section>
    </main>
  );
}
