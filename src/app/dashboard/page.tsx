import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  const name = user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? "고객";

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">DASHBOARD</p>
          <h1>{name}님, 반갑습니다.</h1>
        </div>
        <UserButton />
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
