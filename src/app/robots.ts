import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/+$/, "");
  const isPreviewHost = !base.includes("altidroneservices.fr");

  // Sur preview/staging Workers (.workers.dev) → désindexer tout
  if (isPreviewHost) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/health"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
