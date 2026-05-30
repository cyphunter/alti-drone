import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { galerie, beforeAfterPairs, galerieVideo } from "@/data/galerie";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { StickyMobileCTA } from "@/components/public/sticky-mobile-cta";
import { SectionHeading } from "@/components/public/section-heading";
import { CtaBandeau } from "@/components/public/cta-bandeau";
import { GalleryExplorer } from "@/components/public/gallery-explorer";
import { BeforeAfterSlider } from "@/components/public/before-after-slider";
import { YouTubeEmbed } from "@/components/public/youtube-embed";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type {
  BreadcrumbList,
  ImageGallery,
  VideoObject,
  WithContext,
} from "schema-dts";

export const metadata: Metadata = buildMetadata({
  title: "Galerie chantiers — Nettoyage par drone à Pornic",
  description:
    "Découvrez en images les chantiers réalisés par Alti' Drone & Services : démoussage de toiture, traitement anti-mousse, nettoyage de façades, bardages et panneaux solaires dans le Pays de Retz. Comparatifs avant / après.",
  path: "/galeriedrone",
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
      contentUrl: `${siteConfig.url}${g.full}`,
      thumbnailUrl: `${siteConfig.url}${g.src}`,
      description: g.alt,
      name: g.caption,
      ...(g.location ? { contentLocation: g.location } : {}),
    })),
  };

  const videoSchema: WithContext<VideoObject> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: galerieVideo.title,
    description:
      "Démonstration d'une intervention de nettoyage par drone par Alti' Drone & Services dans le Pays de Retz — inspection, pulvérisation contrôlée, sans piétinement.",
    thumbnailUrl: `https://i.ytimg.com/vi/${galerieVideo.youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${galerieVideo.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${galerieVideo.youtubeId}`,
    uploadDate: `${siteConfig.legal.foundedYear}-01-01`,
    publisher: { "@id": `${siteConfig.url}#business` },
  };

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={gallerySchema} />
      <JsonLd schema={videoSchema} />
      <Header />
      <main id="main-content">
        <section className="hero-gradient">
          <div className="container-soft py-16 text-center lg:py-20">
            <ScrollReveal>
              <p className="eyebrow mx-auto justify-center">Galerie · {galerie.length} chantiers</p>
              <h1 className="fluid-h1 mt-5 text-ocean-900">
                Nos chantiers <span className="italic-display text-accent-700">en images</span>.
              </h1>
              <p className="fluid-lead mx-auto mt-6 max-w-2xl text-slate-500">
                Toitures, façades, bardages et panneaux solaires : un aperçu réel de nos
                interventions par drone dans le Pays de Retz et la Loire-Atlantique.
                Glissez sur les comparatifs pour mesurer le résultat avant / après.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Comparatifs avant / après interactifs ─── */}
        <section className="bg-bone py-16 lg:py-24">
          <div className="container-soft">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Avant / Après"
                title="Le résultat, glissière à l'appui."
                intro="Déplacez le curseur pour comparer l'état initial et le rendu après traitement, sur des chantiers réellement réalisés."
                align="center"
                className="mx-auto"
              />
            </ScrollReveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
              {beforeAfterPairs.map((p) => (
                <ScrollReveal key={p.id}>
                  <figure>
                    <BeforeAfterSlider
                      beforeSrc={p.beforeSrc}
                      afterSrc={p.afterSrc}
                      beforeAlt={p.beforeAlt}
                      afterAlt={p.afterAlt}
                      aspectRatio={p.aspectRatio}
                    />
                    <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                      <span className="font-display text-base text-ocean-900">{p.title}</span>
                      {p.location ? (
                        <span className="text-xs uppercase tracking-[0.14em] text-slate-400">
                          {p.location}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Galerie filtrable complète ─── */}
        <section className="bg-paper py-16 lg:py-24">
          <div className="container-soft">
            <ScrollReveal className="mb-12">
              <SectionHeading
                eyebrow="Toute la galerie"
                title="Chaque chantier, dans le détail."
                intro="Filtrez par type d'intervention, puis cliquez sur une photo pour l'agrandir."
                align="center"
                className="mx-auto"
              />
            </ScrollReveal>
            <GalleryExplorer items={galerie} />
          </div>
        </section>

        {/* ─── Vidéo en action ─── */}
        <section className="section-ocean grain relative overflow-hidden py-16 lg:py-24">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="container-soft relative">
            <ScrollReveal className="mb-12">
              <SectionHeading
                eyebrow="En vidéo"
                title="Une intervention, filmée du décollage au rinçage."
                intro="Quelques minutes pour voir le drone à l'œuvre sur un chantier réel : précision, sécurité et rendu sans piétiner la couverture."
                align="center"
                tone="light"
                className="mx-auto"
              />
            </ScrollReveal>
            <ScrollReveal className="mx-auto max-w-4xl">
              <div className="frame-premium relative overflow-hidden ring-1 ring-paper/15">
                <YouTubeEmbed
                  id={galerieVideo.youtubeId}
                  title={galerieVideo.title}
                />
              </div>
            </ScrollReveal>
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
