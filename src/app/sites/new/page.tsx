import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";
import { isHomepageType, isWebsiteGoal } from "@/lib/sites/options";
import { BusinessForm } from "./business-form";

export default async function NewSitePage({ searchParams }: PageProps<"/sites/new">) {
  await requireUser();
  const query = await searchParams;
  const type = typeof query.type === "string" ? query.type : "";
  const goal = typeof query.goal === "string" ? query.goal : "";
  if (!isHomepageType(type) || !isWebsiteGoal(goal)) redirect("/sites/new/type");
  return (
    <main className="form-page">
      <header className="form-header">
        <div><p className="eyebrow">BUSINESS INFORMATION</p><h1>사업정보 입력</h1><p>입력한 정보는 홈페이지 기획과 콘텐츠 생성의 기준이 됩니다.</p></div>
        <Link href="/dashboard">나가기</Link>
      </header>
      <BusinessForm homepageType={type} websiteGoal={goal} />
    </main>
  );
}
