import { apiError, readJsonObject, textField } from "@/lib/api/request";
import { getApiUser } from "@/lib/auth/api-user";

const pageTypes = new Set(["home", "about", "service", "contact", "custom"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(_request: Request, { params }: RouteContext<"/api/sites/[siteId]/pages/[pageId]">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const { siteId, pageId } = await params;
  const { data, error } = await auth.supabase.from("pages").select("*").eq("site_id", siteId).eq("id", pageId).maybeSingle();
  if (error) return apiError("페이지를 불러오지 못했습니다.", 500);
  if (!data) return apiError("페이지를 찾을 수 없습니다.", 404);
  return Response.json({ page: data });
}

export async function PATCH(request: Request, { params }: RouteContext<"/api/sites/[siteId]/pages/[pageId]">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const body = await readJsonObject(request);
  if (!body) return apiError("올바른 JSON 요청이 필요합니다.");
  const updates: Record<string, string | number | boolean | Record<string, unknown>> = { updated_at: new Date().toISOString() };
  if (body.title !== undefined) { const value = textField(body, "title", 100); if (!value) return apiError("페이지 제목이 필요합니다."); updates.title = value; }
  if (body.slug !== undefined) { const value = textField(body, "slug", 80).toLowerCase(); if (!slugPattern.test(value)) return apiError("페이지 주소 형식이 올바르지 않습니다."); updates.slug = value; }
  if (body.pageType !== undefined) { const value = textField(body, "pageType", 30); if (!pageTypes.has(value)) return apiError("지원하지 않는 페이지 유형입니다."); updates.page_type = value; }
  if (body.sortOrder !== undefined) { const value = Number(body.sortOrder); if (!Number.isInteger(value) || value < 0) return apiError("페이지 순서는 0 이상의 정수여야 합니다."); updates.sort_order = value; }
  if (body.isVisible !== undefined) { if (typeof body.isVisible !== "boolean") return apiError("공개 여부는 boolean 값이어야 합니다."); updates.is_visible = body.isVisible; }
  if (body.content !== undefined) { if (!body.content || typeof body.content !== "object" || Array.isArray(body.content)) return apiError("페이지 콘텐츠는 JSON 객체여야 합니다."); updates.content = body.content as Record<string, unknown>; }
  if (Object.keys(updates).length === 1) return apiError("변경할 항목이 없습니다.");
  const { siteId, pageId } = await params;
  const { data, error } = await auth.supabase.from("pages").update(updates).eq("site_id", siteId).eq("id", pageId).select().maybeSingle();
  if (error?.code === "23505") return apiError("같은 주소의 페이지가 이미 있습니다.", 409);
  if (error) return apiError("페이지를 수정하지 못했습니다.", 500);
  if (!data) return apiError("페이지를 찾을 수 없습니다.", 404);
  return Response.json({ page: data });
}

export async function DELETE(_request: Request, { params }: RouteContext<"/api/sites/[siteId]/pages/[pageId]">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const { siteId, pageId } = await params;
  const { data, error } = await auth.supabase.from("pages").delete().eq("site_id", siteId).eq("id", pageId).select("id").maybeSingle();
  if (error) return apiError("페이지를 삭제하지 못했습니다.", 500);
  if (!data) return apiError("페이지를 찾을 수 없습니다.", 404);
  return new Response(null, { status: 204 });
}
