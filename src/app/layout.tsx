import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteTitle = "AutoSites | 말로 요청하는 홈페이지 제작·배포";
const siteDescription = "Codex와 채팅으로 홈페이지를 수정하고 자동 검사한 뒤 GitHub와 Vercel 운영 주소까지 배포하는 작업 방식을 소개합니다.";

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
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AutoSites Codex 홈페이지 자동 배포 흐름" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/og.png", alt: "AutoSites Codex 홈페이지 자동 배포 흐름" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f1e9" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
