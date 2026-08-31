import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

function getMetadataBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredUrl) {
    try {
      return new URL(configuredUrl);
    } catch {
      // Fall through to the deployment URL when configuration is malformed.
    }
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  return new URL(vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: { default: "AutoSites", template: "%s | AutoSites" },
  description: "사업정보 입력부터 홈페이지 생성과 배포까지 자동화하는 홈페이지 SaaS",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f3ee" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
