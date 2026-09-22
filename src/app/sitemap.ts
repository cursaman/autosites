import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    { url: siteUrl.toString(), changeFrequency: "weekly", priority: 1 },
    { url: new URL("/about", siteUrl).toString(), changeFrequency: "monthly", priority: 0.9 },
    { url: new URL("/course", siteUrl).toString(), changeFrequency: "weekly", priority: 0.9 },
    { url: new URL("/experience", siteUrl).toString(), changeFrequency: "weekly", priority: 0.85 },
    { url: new URL("/resources", siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 },
    { url: new URL("/setup", siteUrl).toString(), changeFrequency: "monthly", priority: 0.7 },
    { url: new URL("/ai-guide", siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 },
    { url: new URL("/education/join.html", siteUrl).toString(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
