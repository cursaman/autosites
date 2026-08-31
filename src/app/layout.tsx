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
  description: "Codex와 채팅으로 홈페이지를 수정하고 GitHub와 Vercel에 자동 배포하는 작업 방식을 소개합니다.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4f1e9" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
