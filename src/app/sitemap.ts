import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    { url: siteUrl.toString(), changeFrequency: "weekly", priority: 1 },
    { url: new URL("/course", siteUrl).toString(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
