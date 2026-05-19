import type { Metadata } from "next";
import { canonicalUrl, siteConfig } from "./site-config";

type PageMetadataInput = {
  /** Titre court — sera concaténé avec le template du layout. */
  title?: string | null;
  description?: string | null;
  /** Chemin canonique sans le domaine, ex: "/services". */
  path: string;
  /**
   * URL absolue ou chemin relatif d'une image OG (1200×630 recommandé).
   * Si omis, Next.js utilise automatiquement l'`opengraph-image.tsx` collocalisé
   * avec la route (convention App Router) — c'est l'approche recommandée.
   */
  imageUrl?: string | null;
  /** Désindexer la page (mentions légales, brouillons, etc.). */
  noindex?: boolean;
  /** Mots-clés ciblés sur la page (en plus des keywords globaux du layout). */
  keywords?: readonly string[];
  /** Type Open Graph — défaut "website". */
  type?: "website" | "article" | "profile";
};

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
  noindex,
  keywords,
  type = "website",
}: PageMetadataInput): Metadata {
  const finalTitle = title ?? siteConfig.name;
  const finalDesc = description ?? siteConfig.description;
  const url = canonicalUrl(path);

  const ogImage = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
    : null;

  const twitterHandle = siteConfig.seo.twitterHandle
    ? `@${siteConfig.seo.twitterHandle.replace(/^@/, "")}`
    : undefined;

  return {
    title: finalTitle,
    description: finalDesc,
    ...(keywords && keywords.length > 0
      ? { keywords: [...keywords, ...siteConfig.seo.globalKeywords].join(", ") }
      : {}),
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url,
      type,
      locale: "fr_FR",
      siteName: siteConfig.name,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      ...(twitterHandle ? { creator: twitterHandle, site: twitterHandle } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}
