import { apiError, readJsonObject, textField } from "@/lib/api/request";
import { getApiUser } from "@/lib/auth/api-user";
import { isHomepageType, isWebsiteGoal } from "@/lib/sites/options";

const statuses = new Set(["draft", "preview", "published", "archived"]);

export async function GET(_request: Request, { params }: RouteContext<"/api/sites/[siteId]">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const { siteId } = await params;
  const { data, error } = await auth.supabase.from("sites").select("id, name, status, homepage_type, website_goal, created_at, updated_at").eq("id", siteId).maybeSingle();
  if (error) return apiError("사이트를 불러오지 못했습니다.", 500);
  if (!data) return apiError("사이트를 찾을 수 없습니다.", 404);
  return Response.json({ site: data });
}

export async function PATCH(request: Request, { params }: RouteContext<"/api/sites/[siteId]">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const body = await readJsonObject(request);
  if (!body) return apiError("올바른 JSON 요청이 필요합니다.");
  const updates: Record<string, string> = { updated_at: new Date().toISOString() };
  if (body.name !== undefined) {
    const name = textField(body, "name", 100);
    if (name.length < 2) return apiError("사이트명은 2자 이상이어야 합니다.");
    updates.name = name;
  }
  if (body.homepageType !== undefined) {
    const value = textField(body, "homepageType", 30);
    if (!isHomepageType(value)) return apiError("지원하지 않는 홈페이지 유형입니다.");
    updates.homepage_type = value;
  }
  if (body.websiteGoal !== undefined) {
    const value = textField(body, "websiteGoal", 30);
    if (!isWebsiteGoal(value)) return apiError("지원하지 않는 홈페이지 목적입니다.");
    updates.website_goal = value;
  }
  if (body.status !== undefined) {
    const status = textField(body, "status", 20);
    if (!statuses.has(status)) return apiError("지원하지 않는 사이트 상태입니다.");
    updates.status = status;
  }
  if (Object.keys(updates).length === 1) return apiError("변경할 항목이 없습니다.");
  const { siteId } = await params;
  const { data, error } = await auth.supabase.from("sites").update(updates).eq("id", siteId).select().maybeSingle();
  if (error) return apiError("사이트를 수정하지 못했습니다.", 500);
  if (!data) return apiError("사이트를 찾을 수 없습니다.", 404);
  return Response.json({ site: data });
}

export async function DELETE(_request: Request, { params }: RouteContext<"/api/sites/[siteId]">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const { siteId } = await params;
  const { data, error } = await auth.supabase.from("sites").delete().eq("id", siteId).select("id").maybeSingle();
  if (error) return apiError("사이트를 삭제하지 못했습니다.", 500);
  if (!data) return apiError("사이트를 찾을 수 없습니다.", 404);
  return new Response(null, { status: 204 });
}
