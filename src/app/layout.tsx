import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { zones } from "@/data/zones";
import { JsonLd } from "@/components/seo/json-ld";
import { ReducedMotionProvider } from "@/components/motion/reduced-motion";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { BackToTop } from "@/components/public/back-to-top";
import type { LocalBusiness, WithContext } from "schema-dts";
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
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
    url: canonicalUrl("/"),
    title: `${siteConfig.name} — ${siteConfig.baseline}`,
    description: siteConfig.description,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.baseline}`,
    description: siteConfig.description,
    images: ["/og-default.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#061a2e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const localBusinessSchema: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}#business`,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  image: `${siteConfig.url}/og-default.jpg`,
  logo: `${siteConfig.url}/icon-512.png`,
  priceRange: "€€",
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
        <ReducedMotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          {children}
          <BackToTop />
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
