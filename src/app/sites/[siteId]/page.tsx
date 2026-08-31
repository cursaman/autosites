import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";

export default async function SitePage({ params }: PageProps<"/sites/[siteId]">) {
  const { siteId } = await params;
  const { supabase } = await requireUser();
  const { data: site } = await supabase
    .from("sites")
    .select("id, name, status, created_at, updated_at")
    .eq("id", siteId)
    .maybeSingle();

  // 존재하지 않거나 소유자가 아니면 동일하게 404로 처리해 정보 노출을 막는다.
  if (!site) notFound();

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SITE WORKSPACE</p>
          <h1>{site.name}</h1>
        </div>
        <Link className="secondary-button" href="/sites">목록으로</Link>
      </header>
      <section className="dashboard-card">
        <h2>접근 권한 확인 완료</h2>
        <p>이 화면의 데이터는 로그인한 소유자에게만 조회됩니다.</p>
        <p>현재 상태: {site.status}</p>
      </section>
    </main>
  );
}
