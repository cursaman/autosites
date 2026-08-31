"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isHomepageType, isWebsiteGoal } from "@/lib/sites/options";

export type BusinessFormState = {
  error?: string;
  success?: string;
  siteId?: string;
  fieldErrors?: Record<string, string>;
};

const value = (formData: FormData, key: string, max = 500) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

export async function saveBusinessDraft(
  _state: BusinessFormState,
  formData: FormData,
): Promise<BusinessFormState> {
  const fields = {
    businessName: value(formData, "businessName", 100),
    industry: value(formData, "industry", 80),
    purpose: value(formData, "purpose"),
    targetCustomer: value(formData, "targetCustomer"),
    coreService: value(formData, "coreService", 1000),
    desiredAction: value(formData, "desiredAction"),
    contactEmail: value(formData, "contactEmail", 254).toLowerCase(),
    phone: value(formData, "phone", 30),
    address: value(formData, "address", 300),
    referenceSites: value(formData, "referenceSites", 1000),
    homepageType: value(formData, "homepageType", 30),
    websiteGoal: value(formData, "websiteGoal", 30),
  };
  const fieldErrors: Record<string, string> = {};
  if (fields.businessName.length < 2) fieldErrors.businessName = "사업명을 2자 이상 입력해 주세요.";
  if (!fields.industry) fieldErrors.industry = "업종을 선택해 주세요.";
  if (fields.purpose.length < 10) fieldErrors.purpose = "홈페이지 목적을 10자 이상 입력해 주세요.";
  if (fields.targetCustomer.length < 5) fieldErrors.targetCustomer = "주요 고객을 5자 이상 입력해 주세요.";
  if (fields.coreService.length < 5) fieldErrors.coreService = "핵심 서비스를 5자 이상 입력해 주세요.";
  if (fields.contactEmail && !/^\S+@\S+\.\S+$/.test(fields.contactEmail)) fieldErrors.contactEmail = "올바른 이메일을 입력해 주세요.";
  if (!isHomepageType(fields.homepageType)) fieldErrors.homepageType = "홈페이지 유형을 다시 선택해 주세요.";
  if (!isWebsiteGoal(fields.websiteGoal)) fieldErrors.websiteGoal = "홈페이지 목적을 다시 선택해 주세요.";
  if (Object.keys(fieldErrors).length) return { error: "필수 입력값을 확인해 주세요.", fieldErrors };

  try {
    const supabase = await createClient();
    const { data: currentUser } = await supabase.auth.getUser();
    let user = currentUser.user;
    if (!user) {
      const { data, error } = await supabase.auth.signInAnonymously({ options: { data: { source: "free-start" } } });
      if (error || !data.user) return { error: "무료 시작 설정이 완료되지 않았습니다. Supabase에서 익명 로그인을 활성화해 주세요." };
      user = data.user;
    }
    const existingSiteId = value(formData, "siteId", 36);
    let siteId = existingSiteId;

    if (siteId) {
      const { data, error } = await supabase.from("sites").update({ name: fields.businessName, homepage_type: fields.homepageType, website_goal: fields.websiteGoal, updated_at: new Date().toISOString() }).eq("id", siteId).select("id").maybeSingle();
      if (error || !data) return { error: "사이트 초안을 수정할 권한이 없거나 저장에 실패했습니다." };
    } else {
      const { data, error } = await supabase.from("sites").insert({ owner_id: user.id, name: fields.businessName, homepage_type: fields.homepageType, website_goal: fields.websiteGoal }).select("id").single();
      if (error || !data) return { error: "사이트 초안을 만들지 못했습니다. 데이터베이스 설정을 확인해 주세요." };
      siteId = data.id;
    }

    const { error } = await supabase.from("business_profiles").upsert({
      site_id: siteId,
      owner_id: user.id,
      business_name: fields.businessName,
      industry: fields.industry,
      purpose: fields.purpose,
      target_customer: fields.targetCustomer,
      core_service: fields.coreService,
      desired_action: fields.desiredAction || null,
      contact_email: fields.contactEmail || null,
      phone: fields.phone || null,
      address: fields.address || null,
      reference_sites: fields.referenceSites || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "site_id" });
    if (error) return { error: "사업정보 임시저장에 실패했습니다.", siteId };

    revalidatePath("/sites");
    revalidatePath(`/sites/${siteId}`);
    return { success: "사업정보를 임시저장했습니다.", siteId };
  } catch {
    return { error: "Supabase 연결 설정을 확인해 주세요." };
  }
}
