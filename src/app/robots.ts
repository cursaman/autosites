import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/dashboard", "/sign-in", "/sign-up", "/sites/"],
    },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
