import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.seo.brandColors.paper,
    theme_color: siteConfig.seo.brandColors.primary,
    lang: siteConfig.language,
    categories: ["business", "services", "utilities"],
    icons: [
      {
        src: "/icon.jpg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
