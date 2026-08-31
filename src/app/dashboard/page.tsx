import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");
  const name = user.email ?? "고객";

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">DASHBOARD</p>
          <h1>{name}님, 반갑습니다.</h1>
        </div>
        <form action={signOut}><button className="secondary-button" type="submit">로그아웃</button></form>
      </header>
      <section className="dashboard-grid" aria-label="홈페이지 관리">
        <article className="dashboard-card">
          <p className="eyebrow">NEW SITE</p>
          <h2>새 홈페이지 만들기</h2>
          <p>업종과 사업정보를 입력하고 첫 번째 홈페이지 생성을 시작합니다.</p>
          <Link href="/sites/new/type">만들기 시작</Link>
        </article>
        <article className="dashboard-card">
          <p className="eyebrow">MY SITES</p>
          <h2>아직 생성한 사이트가 없습니다.</h2>
          <p>사이트를 만들면 Preview와 배포 상태가 이곳에 표시됩니다.</p>
        </article>
      </section>
    </main>
  );
}
