import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteTitle = "AutoSites | AI로 만드는 실제 홈페이지";
const siteDescription = "코딩을 몰라도 AI와 함께 홈페이지를 만들고 GitHub와 Vercel을 활용해 실제 인터넷에 배포해보세요.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: siteTitle, template: "%s | AutoSites" },
  description: siteDescription,
  alternates: { canonical: "/" },
  keywords: ["Codex 홈페이지", "홈페이지 제작", "홈페이지 자동 배포", "Vercel 배포", "GitHub 자동화"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "AutoSites",
    title: "코딩 없이 AI로 내 홈페이지 만들기",
    description: "아이디어 → AI 제작 → 수정 → 실제 URL 배포",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites Codex 홈페이지 자동 배포 흐름" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "코딩 없이 AI로 내 홈페이지 만들기",
    description: "아이디어 → AI 제작 → 수정 → 실제 URL 배포",
    images: [{ url: "/og.png", alt: "AutoSites Codex 홈페이지 자동 배포 흐름" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f1e9" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
