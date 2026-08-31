import { apiError, readJsonObject, textField } from "@/lib/api/request";
import { getApiUser } from "@/lib/auth/api-user";

const pageTypes = new Set(["home", "about", "service", "contact", "custom"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(_request: Request, { params }: RouteContext<"/api/sites/[siteId]/pages">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const { siteId } = await params;
  const { data, error } = await auth.supabase.from("pages").select("id, title, slug, page_type, sort_order, is_visible, created_at, updated_at").eq("site_id", siteId).order("sort_order");
  if (error) return apiError("페이지 목록을 불러오지 못했습니다.", 500);
  return Response.json({ pages: data });
}

export async function POST(request: Request, { params }: RouteContext<"/api/sites/[siteId]/pages">) {
  const auth = await getApiUser();
  if ("response" in auth) return auth.response;
  const body = await readJsonObject(request);
  if (!body) return apiError("올바른 JSON 요청이 필요합니다.");
  const title = textField(body, "title", 100);
  const slug = textField(body, "slug", 80).toLowerCase();
  const pageType = textField(body, "pageType", 30);
  const sortOrder = Number.isInteger(body.sortOrder) ? Number(body.sortOrder) : 0;
  if (title.length < 1 || !slugPattern.test(slug) || !pageTypes.has(pageType) || sortOrder < 0) return apiError("페이지 제목, 주소, 유형, 순서를 확인해 주세요.");
  const { siteId } = await params;
  const { data, error } = await auth.supabase.from("pages").insert({ site_id: siteId, owner_id: auth.user.id, title, slug, page_type: pageType, sort_order: sortOrder }).select().single();
  if (error?.code === "23505") return apiError("같은 주소의 페이지가 이미 있습니다.", 409);
  if (error) return apiError("페이지를 생성하지 못했습니다.", 500);
  return Response.json({ page: data }, { status: 201 });
}
