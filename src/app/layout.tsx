import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "AutoSites", template: "%s | AutoSites" },
  description: "사업정보 입력부터 홈페이지 생성과 배포까지 자동화하는 홈페이지 SaaS",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f3ee" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
