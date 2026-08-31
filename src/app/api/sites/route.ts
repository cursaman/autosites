import { apiError, readJsonObject, textField } from "@/lib/api/request";
import { getApiUser } from "@/lib/auth/api-user";
import { isHomepageType, isWebsiteGoal } from "@/lib/sites/options";

export async function GET() {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const { data, error } = await auth.supabase.from("sites").select("id, name, status, homepage_type, website_goal, created_at, updated_at").order("updated_at", { ascending: false });
  if (error) return apiError("사이트 목록을 불러오지 못했습니다.", 500);
  return Response.json({ sites: data });
}

export async function POST(request: Request) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const body = await readJsonObject(request);
  if (!body) return apiError("올바른 JSON 요청이 필요합니다.");
  const name = textField(body, "name", 100);
  const homepageType = textField(body, "homepageType", 30);
  const websiteGoal = textField(body, "websiteGoal", 30);
  if (name.length < 2 || !isHomepageType(homepageType) || !isWebsiteGoal(websiteGoal)) return apiError("사이트명, 유형, 목적을 확인해 주세요.");
  const { data, error } = await auth.supabase.from("sites").insert({ owner_id: auth.user.id, name, homepage_type: homepageType, website_goal: websiteGoal }).select().single();
  if (error) return apiError("사이트를 생성하지 못했습니다.", 500);
  return Response.json({ site: data }, { status: 201 });
}
