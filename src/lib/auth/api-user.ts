import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getApiUser() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { response: Response.json({ error: "인증이 필요합니다." }, { status: 401 }) } as const;
    return { supabase, user } as const;
  } catch {
    return { response: Response.json({ error: "인증 서비스가 설정되지 않았습니다." }, { status: 503 }) } as const;
  }
}
