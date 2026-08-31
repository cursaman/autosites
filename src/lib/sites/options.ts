export const homepageTypes = [
  { value: "corporate", title: "기업·회사형", description: "회사 소개, 서비스, 신뢰도와 상담 문의 중심" },
  { value: "service", title: "서비스형", description: "전문 서비스의 장점과 신청 전환 중심" },
  { value: "store", title: "매장·지역형", description: "매장 정보, 위치, 전화와 방문 예약 중심" },
  { value: "portfolio", title: "포트폴리오형", description: "작업물과 실적을 시각적으로 소개" },
] as const;

export const websiteGoals = [
  { value: "inquiry", label: "상담·문의 받기" },
  { value: "reservation", label: "예약·방문 유도" },
  { value: "branding", label: "브랜드·회사 소개" },
  { value: "sales", label: "상품·서비스 판매" },
] as const;

export type HomepageType = (typeof homepageTypes)[number]["value"];
export type WebsiteGoal = (typeof websiteGoals)[number]["value"];

export const isHomepageType = (value: string): value is HomepageType => homepageTypes.some((item) => item.value === value);
export const isWebsiteGoal = (value: string): value is WebsiteGoal => websiteGoals.some((item) => item.value === value);
