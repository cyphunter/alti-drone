import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { galerie } from "@/data/galerie";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { StickyMobileCTA } from "@/components/public/sticky-mobile-cta";
import { SectionHeading } from "@/components/public/section-heading";
import { CtaBandeau } from "@/components/public/cta-bandeau";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type { BreadcrumbList, ImageGallery, WithContext } from "schema-dts";

export const metadata: Metadata = buildMetadata({
  title: "Galerie chantiers — Nettoyage par drone à Pornic",
  description:
    "Découvrez en images les chantiers réalisés par Alti' Drone & Services : démoussage toiture, traitement, nettoyage façades et panneaux solaires dans le Pays de Retz.",
  path: "/galeriedrone",
  imageUrl: galerie[0].src,
});

export default function GaleriePage() {
  const breadcrumb: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Galerie", item: canonicalUrl("/galeriedrone") },
    ],
  };

  const gallerySchema: WithContext<ImageGallery> = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galerie chantiers Alti' Drone & Services",
    url: canonicalUrl("/galeriedrone"),
    image: galerie.map((g) => ({
      "@type": "ImageObject",
      contentUrl: g.src,
      description: g.alt,
      name: g.caption ?? g.alt,
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={gallerySchema} />
      <Header />
      <main id="main-content">
        <section className="hero-gradient">
          <div className="container-soft py-16 text-center lg:py-20">
            <ScrollReveal>
              <p className="eyebrow mx-auto justify-center">Galerie</p>
              <h1 className="fluid-h1 mt-5 text-ocean-900">
                Nos chantiers <span className="italic-display text-accent-700">en images</span>.
              </h1>
              <p className="fluid-lead mx-auto mt-6 max-w-2xl text-slate-500">
                Un aperçu de nos interventions récentes dans le Pays de Retz et la
                Loire-Atlantique : toitures, façades, bardages, panneaux solaires.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-paper py-16 lg:py-24">
          <div className="container-soft">
            <StaggerReveal className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
              {galerie.map((g) => (
                <StaggerItem
                  key={g.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-ocean-900/5"
                >
                  {g.service ? (
                    <Link
                      href={`/${g.service}`}
                      className="block h-full w-full"
                      aria-label={`${g.caption ?? g.alt} — voir la prestation`}
                    >
                      <SmartImage
                        src={g.src}
                        alt={g.alt}
                        width={g.width}
                        height={g.height}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <SmartImage
                      src={g.src}
                      alt={g.alt}
                      width={g.width}
                      height={g.height}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {g.caption ? (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-900/85 to-transparent p-4 text-xs text-paper">
                      {g.caption}
                    </span>
                  ) : null}
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-bone py-16 lg:py-20">
          <div className="container-soft">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Le projet suivant ?"
                title="Et si c'était votre chantier en haut de cette galerie ?"
                intro="Devis gratuit et inspection drone offerte. Réponse sous 48 h ouvrées."
                align="center"
                className="mx-auto"
              />
            </ScrollReveal>
          </div>
        </section>

        <CtaBandeau />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
