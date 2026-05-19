import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { StickyMobileCTA } from "@/components/public/sticky-mobile-cta";
import { LocalPageTemplate } from "@/components/public/local-page-template";
import { getLocalPage } from "@/data/local-pages";

const SLUG = "la-bernerie-en-retz";
const data = getLocalPage(SLUG);

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: `/${SLUG}`,
  keywords: [data.primaryKeyword, `démoussage toiture ${data.city}`, `nettoyage façade ${data.city}`],
});

export default function Page() {
  return (
    <>
      <Header />
      <LocalPageTemplate data={data} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
