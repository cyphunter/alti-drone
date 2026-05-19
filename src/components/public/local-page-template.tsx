import Link from "next/link";
import { ArrowRight, Check, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/public/section-heading";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { ServiceCard } from "@/components/public/service-card";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { services, certificationsBlock } from "@/data/services";
import { faq as faqGeneral } from "@/data/faq";
import { localPages, type LocalPage } from "@/data/local-pages";
import type {
  Place,
  BreadcrumbList,
  FAQPage,
  Service as SchemaService,
  WithContext,
} from "schema-dts";

type Props = {
  data: LocalPage;
};

export function LocalPageTemplate({ data }: Props) {
  const url = canonicalUrl(`/${data.slug}`);
  const allFaq = [...data.faq, ...faqGeneral.slice(0, 3)];

  const knownLocalSlugs = new Set(localPages.map((lp) => lp.slug));
  const slugifyCity = (name: string) =>
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const placeSchema: WithContext<Place> = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${url}#place`,
    name: data.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.city,
      postalCode: data.postalCode,
      addressRegion: siteConfig.contact.region,
      addressCountry: siteConfig.contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: siteConfig.contact.department,
    },
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: data.city, item: url },
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const servicesSchema: WithContext<SchemaService>[] = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.title} à ${data.city}`,
    description: s.description,
    serviceType: s.group,
    url: canonicalUrl(`/${s.slug}`),
    provider: { "@id": `${siteConfig.url}#business` },
    areaServed: {
      "@type": "Place",
      name: data.city,
    },
  }));

  return (
    <>
      <JsonLd schema={placeSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      {servicesSchema.map((s, i) => (
        <JsonLd key={i} schema={s} />
      ))}

      <main id="main-content">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="border-b border-ocean-900/5 bg-paper/60"
        >
          <ol className="container-soft flex items-center gap-2 py-4 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-accent-700">
                Accueil
              </Link>
            </li>
            <ChevronRight size={12} aria-hidden />
            <li className="text-ocean-900">{data.city}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="hero-gradient">
          <div className="container-soft grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                <MapPin size={14} aria-hidden /> {data.eyebrow}
              </p>
              <h1 className="fluid-h1 mt-5 text-ocean-900">{data.h1}</h1>
              <p className="fluid-lead mt-6 max-w-xl text-slate-500">{data.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" variant="primary">
                  <Link href="/contactdrone">
                    Devis gratuit
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm font-medium text-ocean-900 hover:text-accent-700"
                >
                  ou appeler {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs text-slate-500 ring-1 ring-ocean-900/10">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
                {data.distanceKm === 0
                  ? "Siège local — sans frais de déplacement"
                  : `À ${data.distanceKm} km de notre siège (La Plaine-sur-Mer)`}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-paper p-7 shadow-soft ring-1 ring-ocean-900/10">
                <h2 className="font-display text-xl text-ocean-900">
                  Pourquoi le drone à {data.city} ?
                </h2>
                <ul className="mt-5 space-y-3">
                  {data.particularites.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-ocean-900">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                        <Check size={12} aria-hidden />
                      </span>
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contexte local */}
        <section className="bg-paper py-20 lg:py-24">
          <div className="container-soft grid gap-10 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-5">
              <SectionHeading
                eyebrow={`Bâti & climat ${data.city}`}
                title={`Comprendre ${data.city} avant d'intervenir.`}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-slate-700">
                {data.contextLocal}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Services grid */}
        <section className="bg-bone py-20 lg:py-28">
          <div className="container-soft">
            <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
              <ScrollReveal className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Nos prestations"
                  title={`Tout par drone à ${data.city}.`}
                  intro="Toiture, façade, bardage, panneaux solaires : 9 prestations dédiées, une seule équipe."
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

        {/* Communes voisines */}
        {data.nearbyZones.length > 0 ? (
          <section className="bg-paper py-16 lg:py-20">
            <div className="container-soft">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Aussi disponible"
                  title={`Communes voisines desservies depuis ${data.city}.`}
                />
              </ScrollReveal>
              <ul className="mt-10 flex flex-wrap gap-3">
                {data.nearbyZones.map((zone) => {
                  const zoneSlug = slugifyCity(zone);
                  const hasPage = knownLocalSlugs.has(zoneSlug);
                  const chip = (
                    <span
                      className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-sm text-ocean-900 ring-1 ring-ocean-900/10 transition hover:bg-accent-500/10 hover:ring-accent-500/40"
                    >
                      <MapPin size={12} aria-hidden className="text-accent-700" />
                      {zone}
                    </span>
                  );
                  return (
                    <li key={zone}>
                      {hasPage ? (
                        <Link href={`/${zoneSlug}`} aria-label={`Voir notre intervention à ${zone}`}>
                          {chip}
                        </Link>
                      ) : (
                        chip
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Certifications */}
        <section className="bg-bone py-20 lg:py-24">
          <div className="container-soft">
            <ScrollReveal>
              <div className="rounded-3xl bg-paper p-8 shadow-soft ring-1 ring-ocean-900/10 lg:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                      <ShieldCheck size={26} aria-hidden />
                    </span>
                    <h2 className="font-display text-2xl text-ocean-900 lg:text-3xl">
                      Pilote certifié, intervention assurée.
                    </h2>
                  </div>
                  <ul className="grid flex-1 gap-3 sm:grid-cols-2">
                    {certificationsBlock.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-ocean-900">
                        <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-accent-700" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="container-soft grid gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Questions fréquentes"
                title={`Vos questions sur le nettoyage drone à ${data.city}.`}
                intro="Une question reste sans réponse ? Contactez-nous, on vous répond sous 48 h ouvrées."
              />
            </ScrollReveal>
            <div className="lg:col-span-7">
              <FaqAccordion entries={allFaq} />
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="section-ocean py-20 lg:py-24">
          <div className="container-soft flex flex-col items-center gap-6 text-center">
            <SectionHeading
              eyebrow="Devis gratuit"
              title={`Un projet à ${data.city} ? Parlons-en.`}
              tone="light"
              align="center"
              intro="Devis gratuit et personnalisé en 48 h ouvrées. Inspection drone offerte."
            />
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="accent">
                <Link href="/contactdrone">
                  Demander mon devis
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-paper hover:text-accent-300"
              >
                ou {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
