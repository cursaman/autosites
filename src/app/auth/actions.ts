"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; success?: string };

function readCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !email.includes("@")) return { error: "올바른 이메일 주소를 입력해 주세요." } as const;
  if (password.length < 8) return { error: "비밀번호는 8자 이상이어야 합니다." } as const;
  return { email, password } as const;
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL?.trim() || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
}

export async function signUp(_state: AuthState, formData: FormData): Promise<AuthState> {
  const credentials = readCredentials(formData);
  if ("error" in credentials) return { error: credentials.error };
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({ email: credentials.email, password: credentials.password, options: { emailRedirectTo: `${getAppUrl()}/auth/confirm` } });
    if (error) return { error: error.message };
    return { success: "확인 메일을 보냈습니다. 메일의 링크를 눌러 가입을 완료해 주세요." };
  } catch {
    return { error: "이메일 인증 설정이 완료되지 않았습니다." };
  }
}

export async function signIn(_state: AuthState, formData: FormData): Promise<AuthState> {
  const credentials = readCredentials(formData);
  if ("error" in credentials) return { error: credentials.error };
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) return { error: "이메일 또는 비밀번호를 확인해 주세요." };
  } catch {
    return { error: "이메일 인증 설정이 완료되지 않았습니다." };
  }
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
