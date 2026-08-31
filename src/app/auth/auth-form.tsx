"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signIn, signUp, type AuthState } from "./actions";

const initialState: AuthState = {};

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [state, formAction, pending] = useActionState(mode === "sign-in" ? signIn : signUp, initialState);
  const isSignIn = mode === "sign-in";
  return (
    <form className="email-auth-form" action={formAction}>
      <div><label htmlFor="email">이메일</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div><label htmlFor="password">비밀번호</label><input id="password" name="password" type="password" minLength={8} autoComplete={isSignIn ? "current-password" : "new-password"} required />{!isSignIn && <small>8자 이상 입력해 주세요.</small>}</div>
      {state.error && <p className="form-message error-message" role="alert">{state.error}</p>}
      {state.success && <p className="form-message success-message" role="status">{state.success}</p>}
      <button className="primary-action auth-submit" type="submit" disabled={pending}>{pending ? "처리 중..." : isSignIn ? "로그인" : "확인 메일 받기"}</button>
      <p className="auth-switch">{isSignIn ? "계정이 없나요?" : "이미 계정이 있나요?"} <Link href={isSignIn ? "/sign-up" : "/sign-in"}>{isSignIn ? "회원가입" : "로그인"}</Link></p>
    </form>
  );
}
