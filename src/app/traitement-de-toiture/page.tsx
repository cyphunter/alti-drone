import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/data/services";
import { ServiceTemplate } from "@/components/public/service-template";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { StickyMobileCTA } from "@/components/public/sticky-mobile-cta";

const SLUG = "traitement-de-toiture";
const service = getServiceBySlug(SLUG);

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${SLUG}`,
  imageUrl: service.heroImage,
});

type PageProps = { searchParams: Promise<{ img?: string }> };

export default async function Page({ searchParams }: PageProps) {
  const { img } = await searchParams;
  return (
    <>
      <Header />
      <ServiceTemplate slug={SLUG} heroImageOverride={img} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
