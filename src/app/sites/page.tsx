import Link from "next/link";
import { requireUser } from "@/lib/auth/require-user";

type SiteSummary = {
  id: string;
  name: string;
  status: string;
  updated_at: string;
};

export default async function SitesPage() {
  const { supabase } = await requireUser();
  const { data, error } = await supabase
    .from("sites")
    .select("id, name, status, updated_at")
    .order("updated_at", { ascending: false });
  const sites = (data ?? []) as SiteSummary[];

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">MY SITES</p>
          <h1>내 홈페이지</h1>
        </div>
        <Link className="secondary-button" href="/dashboard">대시보드</Link>
      </header>
      {error ? (
        <section className="dashboard-card">
          <h2>사이트 저장소 설정이 필요합니다.</h2>
          <p>Supabase에 7일차 마이그레이션을 적용하면 사용자별 사이트가 표시됩니다.</p>
        </section>
      ) : sites.length === 0 ? (
        <section className="dashboard-card">
          <h2>아직 생성한 사이트가 없습니다.</h2>
          <p>다음 단계에서 사업정보 입력과 사이트 생성을 연결합니다.</p>
        </section>
      ) : (
        <section className="dashboard-grid" aria-label="내 홈페이지 목록">
          {sites.map((site) => (
            <article className="dashboard-card" key={site.id}>
              <p className="eyebrow">{site.status.toUpperCase()}</p>
              <h2>{site.name}</h2>
              <Link href={`/sites/${site.id}`}>관리하기</Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
