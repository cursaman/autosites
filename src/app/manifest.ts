import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AutoSites | AI로 만드는 실제 홈페이지",
    short_name: "AutoSites",
    description: "코딩을 몰라도 AI와 함께 홈페이지를 만들고 실제 인터넷에 배포하는 실전 안내",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#176447",
    lang: "ko-KR",
    icons: [{ src: "/images/brand/autosites-auto-logo-v2.png", sizes: "any", type: "image/png", purpose: "maskable" }],
  };
}
