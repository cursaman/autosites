import { AuthForm } from "@/app/auth/auth-form";
export default function SignUpPage() {
  return <main className="auth-shell"><section className="auth-intro"><p className="eyebrow">START AUTOSITES</p><h1>메일 확인으로<br />안전하게 시작하세요.</h1><p>가입 후 받은 확인 메일의 링크를 누르면 홈페이지 제작을 시작할 수 있습니다.</p></section><section className="auth-panel" aria-label="회원가입 양식"><AuthForm mode="sign-up" /></section></main>;
}
