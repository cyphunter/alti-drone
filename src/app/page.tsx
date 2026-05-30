import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, PlayCircle } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { services, certificationsBlock } from "@/data/services";
import { faq } from "@/data/faq";
import { galerieFeatured, heroVideo } from "@/data/galerie";
import { temoignages } from "@/data/temoignages";
import { googleData } from "@/data/google-reviews";
import { getBilikReviews, bilikToTemoignage } from "@/lib/bilik-reviews";

import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { HeroHome } from "@/components/public/hero-home";
import { SectionHeading } from "@/components/public/section-heading";
import { ServiceCard } from "@/components/public/service-card";
import { StatsEditorial } from "@/components/public/stats-editorial";
import { ProcessSteps } from "@/components/public/process-steps";
import { BentoGallery } from "@/components/public/bento-gallery";
import { ZonesMarquee } from "@/components/public/zones-marquee";
import { AvisSection, type AvisSource } from "@/components/public/avis-section";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { YouTubeEmbed } from "@/components/public/youtube-embed";
import { CtaBandeau } from "@/components/public/cta-bandeau";
import { StickyMobileCTA } from "@/components/public/sticky-mobile-cta";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { FadeUp } from "@/components/motion/text-reveal";

import { JsonLd } from "@/components/seo/json-ld";
import type { FAQPage, HowTo, VideoObject, WithContext, RoofingContractor } from "schema-dts";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — Nettoyage toiture par drone à Pornic (44)`,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const bilik = await getBilikReviews();
  const bilikItems = bilik.reviews.map(bilikToTemoignage);
  const bilikDisplayItems = bilikItems.length > 0 ? bilikItems : temoignages;

  const avisSources: readonly [AvisSource, AvisSource] = [
    {
      key: "bilik",
      label: "Bilik",
      reviews: bilikDisplayItems,
      aggregateRating: bilik.aggregateRating,
      reviewCount: bilik.reviewCount,
      sourceUrl: bilik.sourceUrl,
      intro:
        bilik.reviews.length > 0
          ? "Avis vérifiés et collectés par Bilik, plateforme indépendante d'évaluation des artisans."
          : "Les premiers retours arrivent — n'hésitez pas à nous laisser un avis après votre prestation.",
    },
    {
      key: "google",
      label: "Google",
      reviews: googleData.reviews,
      aggregateRating: googleData.aggregateRating,
      reviewCount: googleData.reviewCount,
      sourceUrl: googleData.sourceUrl,
      intro:
        googleData.reviews.length > 0
          ? "Avis publiés directement par nos clients sur leur fiche Google."
          : "Retrouvez bientôt nos avis Google ici — vous pouvez nous laisser le vôtre depuis votre fiche Google.",
    },
  ];

  const reviewsSchema: WithContext<RoofingContractor> | null =
    bilik.reviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "RoofingContractor",
          "@id": `${siteConfig.url}#business`,
          name: siteConfig.legalName,
          url: siteConfig.url,
          ...(bilik.aggregateRating && bilik.reviewCount
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: String(bilik.aggregateRating),
                  reviewCount: bilik.reviewCount,
                  bestRating: 5,
                  worstRating: 1,
                },
              }
            : {}),
          review: bilik.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
            ...(r.about ? { about: { "@type": "Thing", name: r.about } } : {}),
            reviewBody: r.text,
          })),
        }
      : null;

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const howToSchema: WithContext<HowTo> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Méthode d'intervention Alti' Drone — nettoyage par drone",
    description:
      "4 étapes pour une intervention sécurisée, précise et documentée par drone professionnel.",
    totalTime: "PT8H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Inspection préalable",
        text: "Survol HD du bâtiment pour cartographier l'encrassement, identifier les éléments fragiles et préparer l'intervention.",
        url: `${siteConfig.url}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Pulvérisation contrôlée",
        text: "Application par drone d'un produit anti-mousse, détergent ou hydrofuge, dosé selon le support et l'encrassement.",
        url: `${siteConfig.url}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Protection longue durée (option)",
        text: "Application d'un hydrofuge filmogène ou pénétrant pour ralentir le retour des mousses et imperméabiliser le support.",
        url: `${siteConfig.url}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Rapport client HD",
        text: "Remise des photos et vidéos HD de l'inspection et conseils d'entretien pour pérenniser le résultat.",
        url: `${siteConfig.url}/#process`,
      },
    ],
  };

  const videoSchema: WithContext<VideoObject> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: heroVideo.title,
    description:
      "Démonstration d'une intervention de nettoyage par drone à Pornic — inspection, pulvérisation contrôlée, sans piétinement.",
    thumbnailUrl: `https://i.ytimg.com/vi/${heroVideo.youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${heroVideo.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${heroVideo.youtubeId}`,
    uploadDate: `${siteConfig.legal.foundedYear}-01-01`,
    publisher: { "@id": `${siteConfig.url}#business` },
  };

  const galeriePreview = galerieFeatured;

  return (
    <>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={howToSchema} />
      <JsonLd schema={videoSchema} />
      {reviewsSchema ? <JsonLd schema={reviewsSchema} /> : null}
      <Header />
      <main id="main-content">
        {/* ───────────────────────────── HERO CINEMATIC */}
        <HeroHome />

        {/* ───────────────────────────── MARQUEE ZONES */}
        <section className="border-y border-ocean-900/5 bg-paper">
          <ZonesMarquee />
        </section>

        {/* ───────────────────────────── STATS ÉDITORIAL (sur fond ocean) */}
        <section className="section-ocean grain relative overflow-hidden py-20 lg:py-24">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgb(244 180 0 / 0.10), transparent 60%)",
            }}
          />
          <div className="container-soft relative">
            <ScrollReveal className="mb-12 max-w-2xl">
              <p className="eyebrow eyebrow--light">Chiffres clés</p>
              <h2 className="fluid-h2 mt-4 text-paper">
                Une intervention <span className="italic-display text-accent-400">précise</span>,
                <br />
                sans compromis.
              </h2>
            </ScrollReveal>
            <StatsEditorial tone="dark" />
          </div>
        </section>

        {/* ───────────────────────────── PITCH "NOTRE APPROCHE" */}
        <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
          <div className="aurora" aria-hidden />
          <div className="container-soft relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-5">
              <p className="eyebrow">Notre approche</p>
              <h2 className="fluid-h2 mt-4 text-ocean-900">
                Une méthode{" "}
                <span className="italic-display gradient-text-ocean">moderne</span>
                <br />
                pour entretenir vos bâtiments.
              </h2>
              <div
                aria-hidden
                className="hairline mt-8 max-w-[10rem]"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="lg:col-span-7">
              <p className="fluid-lead text-slate-700">
                Entre air marin, humidité persistante et vents atlantiques, les toitures
                du Pays de Retz subissent des agressions climatiques permanentes. Notre
                approche par drone professionnel permet d'intervenir précisément, sans
                échafaudage et sans monter sur la couverture — vos matériaux et votre
                budget sont préservés.
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-500">
                Nous accompagnons particuliers, syndics, collectivités et professionnels
                pour le nettoyage, le traitement et l'inspection de leur habitat. Chaque
                intervention est précédée d'une analyse drone et suivie d'un rapport
                photo HD remis au client.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-ocean-900 px-5 py-3 text-sm font-medium text-paper transition hover:bg-accent-500 hover:text-ocean-900"
                >
                  Découvrir nos prestations
                  <ArrowRight
                    size={14}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/galeriedrone"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:text-ocean-900"
                >
                  Voir nos chantiers récents
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────────────────── PROCESS STEPS */}
        <section className="relative overflow-hidden bg-bone py-24 lg:py-32">
          <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="container-soft relative">
            <ScrollReveal className="mb-16 max-w-3xl">
              <p className="eyebrow">Notre process</p>
              <h2 className="fluid-h2 mt-4 text-ocean-900">
                4 étapes pour un résultat{" "}
                <span className="italic-display text-accent-700">impeccable</span>.
              </h2>
              <p className="fluid-lead mt-5 text-slate-500">
                Chaque chantier suit la même rigueur : analyse, intervention, protection
                et reporting. Vous savez à tout moment où nous en sommes.
              </p>
            </ScrollReveal>
            <ProcessSteps tone="light" />
          </div>
        </section>

        {/* ───────────────────────────── SERVICES GRID PREMIUM */}
        <section className="relative bg-paper py-24 lg:py-32">
          <div className="container-soft">
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <ScrollReveal className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Prestations"
                  title="9 prestations dédiées, une seule équipe."
                  intro="Toiture, façade, panneaux solaires : nous adaptons produit, drone et méthode à votre besoin. Survol et devis gratuits, en 48 h ouvrées."
                />
              </ScrollReveal>
              <ScrollReveal delay={0.05} className="lg:col-span-5 lg:text-right">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:text-ocean-900"
                >
                  Vue d'ensemble des services
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </ScrollReveal>
            </div>
            <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <StaggerItem key={s.slug} className="h-full">
                  <ServiceCard service={s} index={i} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* ───────────────────────────── ABOUT — Allan (ocean dark) */}
        <section className="section-ocean grain relative overflow-hidden py-24 lg:py-32">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />

          <div className="container-soft relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
            <ScrollReveal className="lg:col-span-5">
              <div className="frame-premium relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  src="/images/hero/accueil.avif"
                  alt="Allan Bouguendoura, fondateur d'Alti' Drone & Services et pilote de drone certifié, devant son véhicule d'intervention"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-[30%_50%]"
                />
                {/* Badge flottant : signature */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-paper/90 px-4 py-1.5 text-xs font-medium text-ocean-900 ring-1 ring-paper/40 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
                  {siteConfig.legal.publisher} · Fondateur
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="lg:col-span-7">
              <p className="eyebrow eyebrow--light">À propos</p>
              <h2 className="fluid-h2 mt-4 text-paper">
                Allan Bouguendoura,
                <br />
                <span className="italic-display text-accent-400">
                  pilote certifié
                </span>{" "}
                au service de vos extérieurs.
              </h2>
              <p className="fluid-lead mt-6 text-sky-100/85">
                Passionné par les technologies aériennes et l'entretien des bâtiments,
                j'ai fondé Alti' Drone & Services pour proposer une approche moderne,
                sécurisée et précise — en supprimant les contraintes des échafaudages et
                des travaux en hauteur.
              </p>
              <p className="mt-5 leading-relaxed text-sky-100/75">
                Implanté à La Plaine-sur-Mer, j'interviens dans tout le Pays de Retz et
                bien au-delà, auprès des particuliers, professionnels, syndics et
                collectivités. Mon engagement : des prestations fiables, soignées, et la
                pleine satisfaction du client à chaque intervention.
              </p>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {certificationsBlock.items.map((it) => (
                  <FadeUp key={it}>
                    <li className="group flex items-start gap-3 rounded-xl bg-ocean-800/50 p-4 text-sm leading-relaxed text-paper/90 ring-1 ring-paper/10 transition hover:bg-ocean-700/70 hover:ring-accent-400/40">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-300 ring-1 ring-accent-500/30">
                        <ShieldCheck size={14} aria-hidden />
                      </span>
                      <span>{it}</span>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────────────────── VIDEO EN ACTION */}
        <section className="relative bg-paper py-24 lg:py-32">
          <div className="container-soft">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
              <ScrollReveal className="lg:col-span-5">
                <p className="eyebrow">
                  <Sparkles size={14} aria-hidden /> En action
                </p>
                <h2 className="fluid-h2 mt-4 text-ocean-900">
                  Le drone professionnel,
                  <br />
                  <span className="italic-display gradient-text-ocean">
                    en condition réelle
                  </span>
                  .
                </h2>
                <p className="fluid-lead mt-6 text-slate-500">
                  Quelques secondes pour découvrir comment se déroule une intervention :
                  inspection préalable, pulvérisation contrôlée, rendu sans piétiner la
                  couverture.
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-accent-700">
                  <PlayCircle size={18} aria-hidden />
                  <span>Vidéo HD · 1 min</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className="lg:col-span-7">
                <div className="frame-premium relative overflow-hidden ring-1 ring-ocean-900/15">
                  <YouTubeEmbed
                    id={heroVideo.youtubeId}
                    title={heroVideo.title}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── GALERIE BENTO */}
        <section className="relative bg-bone py-24 lg:py-32">
          <div className="container-soft">
            <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
              <ScrollReveal className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Galerie"
                  title="Quelques-uns de nos chantiers récents."
                  intro="Toitures, façades, panneaux : un aperçu de nos interventions dans le Pays de Retz."
                />
              </ScrollReveal>
              <ScrollReveal delay={0.05} className="lg:col-span-5 lg:text-right">
                <Link
                  href="/galeriedrone"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:text-ocean-900"
                >
                  Voir toute la galerie
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </ScrollReveal>
            </div>
            <BentoGallery items={galeriePreview} />
          </div>
        </section>

        {/* ───────────────────────────── AVIS CLIENTS (Bilik / Google) */}
        <section className="relative bg-paper py-24 lg:py-32">
          <ScrollReveal>
            <AvisSection sources={avisSources} defaultKey="bilik" />
          </ScrollReveal>
        </section>

        {/* ───────────────────────────── FAQ */}
        <section className="relative overflow-hidden bg-bone py-24 lg:py-32">
          <div className="container-soft grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Questions fréquentes"
                title="On répond aux questions que vous nous posez le plus."
                intro="Une autre question ? Contactez-nous, nous vous répondons sous 48 h ouvrées."
              />
              <div className="mt-10 hidden lg:block">
                <Link
                  href="/contactdrone"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:text-ocean-900"
                >
                  Poser une question
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </ScrollReveal>
            <div className="lg:col-span-7">
              <FaqAccordion entries={faq} />
            </div>
          </div>
        </section>

        {/* ───────────────────────────── CTA FINAL */}
        <CtaBandeau />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
