import { AuthForm } from "@/app/auth/auth-form";
export default function SignInPage() {
  return <main className="auth-shell"><section className="auth-intro"><p className="eyebrow">WELCOME BACK</p><h1>다시 이어서<br />만들어볼까요?</h1><p>이메일과 비밀번호로 로그인해 작성 중인 홈페이지를 확인하세요.</p></section><section className="auth-panel" aria-label="로그인 양식"><AuthForm mode="sign-in" /></section></main>;
}
