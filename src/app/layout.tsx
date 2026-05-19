import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Fraunces } from "next/font/google";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { zones } from "@/data/zones";
import { services } from "@/data/services";
import { JsonLd } from "@/components/seo/json-ld";
import { ReducedMotionProvider } from "@/components/motion/reduced-motion";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrollRestoration } from "@/components/motion/scroll-restoration";
import { BackToTop } from "@/components/public/back-to-top";
import type { RoofingContractor, WebSite, WithContext } from "schema-dts";
import "./globals.css";

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const twitterHandle = siteConfig.seo.twitterHandle
  ? `@${siteConfig.seo.twitterHandle.replace(/^@/, "")}`
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.baseline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legal.publisher }],
  creator: siteConfig.legal.publisher,
  publisher: siteConfig.legalName,
  category: "Services aux particuliers et professionnels",
  keywords: siteConfig.seo.globalKeywords.join(", "),
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
    url: canonicalUrl("/"),
    title: `${siteConfig.name} — ${siteConfig.baseline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.baseline}`,
    description: siteConfig.description,
    ...(twitterHandle ? { creator: twitterHandle, site: twitterHandle } : {}),
  },
  robots: {
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
  ...(siteConfig.seo.googleSiteVerification || siteConfig.seo.bingSiteVerification
    ? {
        verification: {
          ...(siteConfig.seo.googleSiteVerification
            ? { google: siteConfig.seo.googleSiteVerification }
            : {}),
          ...(siteConfig.seo.bingSiteVerification
            ? { other: { "msvalidate.01": siteConfig.seo.bingSiteVerification } }
            : {}),
        },
      }
    : {}),
  // Icons + manifest auto-générés par les conventions Next.js App Router :
  // - src/app/icon.svg + icon.tsx + apple-icon.tsx (favicons)
  // - src/app/manifest.ts (manifest PWA)
  // - src/app/opengraph-image.tsx + twitter-image.tsx (images partagées)
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#061a2e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const businessId = `${siteConfig.url}#business`;
const websiteId = `${siteConfig.url}#website`;

const localBusinessSchema: WithContext<RoofingContractor> = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": businessId,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  slogan: siteConfig.baseline,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  image: `${siteConfig.url}/opengraph-image`,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/icon.svg`,
    contentUrl: `${siteConfig.url}/icon.svg`,
  },
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Bank transfer, Credit card",
  foundingDate: String(siteConfig.legal.foundedYear),
  founder: { "@type": "Person", name: siteConfig.legal.publisher },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
    postalCode: siteConfig.contact.postalCode,
    addressLocality: siteConfig.contact.city,
    addressRegion: siteConfig.contact.region,
    addressCountry: siteConfig.contact.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.contact.geo.latitude,
    longitude: siteConfig.contact.geo.longitude,
  },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    geoRadius: String(siteConfig.contact.serviceRadiusKm * 1000),
  },
  areaServed: zones.map((z) => ({
    "@type": "City",
    name: z.name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: siteConfig.contact.region,
    },
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: Object.values(siteConfig.social).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations de nettoyage par drone",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        url: canonicalUrl(`/${s.slug}`),
        serviceType: s.group,
      },
      priceCurrency: "EUR",
    })),
  },
  knowsAbout: [
    "Démoussage de toiture par drone",
    "Traitement hydrofuge toiture",
    "Anti-mousse curatif et préventif",
    "Nettoyage de façade par drone",
    "Nettoyage bardage métallique",
    "Nettoyage bardage PVC",
    "Nettoyage panneaux photovoltaïques",
    "Inspection thermique drone",
    "Pulvérisation par drone DGAC",
  ],
};

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  inLanguage: siteConfig.locale,
  description: siteConfig.description,
  publisher: { "@id": businessId },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      className={`${fontBody.variable} ${fontDisplay.variable}`}
    >
      <body className="min-h-screen bg-(--color-paper) text-(--color-ocean-900) antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-(--color-ocean-900) focus:px-4 focus:py-2 focus:text-(--color-paper)"
        >
          Aller au contenu principal
        </a>
        <JsonLd schema={localBusinessSchema} />
        <JsonLd schema={websiteSchema} />
        <ReducedMotionProvider>
          <SmoothScroll />
          <Suspense fallback={null}>
            <ScrollRestoration />
          </Suspense>
          <ScrollProgress />
          {children}
          <BackToTop />
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
