import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { ArrowRight, Check, ChevronRight, Sparkles } from "lucide-react";
import type { Service } from "@/data/services";
import { getServiceBySlug, certificationsBlock } from "@/data/services";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/public/section-heading";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { ServiceCard } from "@/components/public/service-card";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { faq as faqGeneral } from "@/data/faq";
import { zones } from "@/data/zones";
import type {
  Service as SchemaService,
  FAQPage,
  BreadcrumbList,
  WithContext,
} from "schema-dts";

type ServiceTemplateProps = {
  slug: string;
};

export function ServiceTemplate({ slug }: ServiceTemplateProps) {
  const service = getServiceBySlug(slug);
  const Icon = service.icon;
  const CertIcon = certificationsBlock.icon;
  const url = canonicalUrl(`/${service.slug}`);
  const related = service.relatedSlugs
    .map((s) => {
      try {
        return getServiceBySlug(s);
      } catch {
        return null;
      }
    })
    .filter((s): s is Service => s !== null);

  const allFaq = [...service.faq, ...faqGeneral.slice(0, 4)];

  // JSON-LD : Service + FAQPage + BreadcrumbList
  const serviceSchema: WithContext<SchemaService> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.group,
    url,
    provider: { "@id": `${siteConfig.url}#business` },
    areaServed: zones.slice(0, 12).map((z) => ({ "@type": "City", name: z.name })),
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

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: canonicalUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

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
            <li>
              <Link href="/services" className="hover:text-accent-700">
                Services
              </Link>
            </li>
            <ChevronRight size={12} aria-hidden />
            <li className="text-ocean-900">{service.title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="hero-gradient">
          <div className="container-soft grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                <Icon size={14} aria-hidden /> {service.group}
              </p>
              <h1 className="fluid-h1 mt-5 text-ocean-900">{service.h1}</h1>
              <p className="fluid-lead mt-6 max-w-xl text-slate-500">{service.intro}</p>
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
              {service.duree ? (
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs text-slate-500 ring-1 ring-ocean-900/10">
                  <Sparkles size={12} aria-hidden className="text-accent-700" />
                  Durée typique : {service.duree}
                </p>
              ) : null}
            </div>
            {service.heroImage ? (
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl shadow-elevated ring-1 ring-ocean-900/10">
                  <SmartImage
                    src={service.heroImage}
                    alt={service.title}
                    width={960}
                    height={1200}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* Avantages */}
        <section className="bg-paper py-20 lg:py-28">
          <div className="container-soft grid gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Pourquoi par drone"
                title="Une intervention propre, rapide et sécurisée."
                intro="Le drone professionnel rend l'entretien des bâtiments plus simple, plus sûr et plus écologique — comparé à toutes les méthodes traditionnelles."
              />
            </ScrollReveal>
            <StaggerReveal className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
              {service.avantages.map((a) => (
                <StaggerItem key={a}>
                  <div className="flex h-full items-start gap-4 rounded-xl bg-ivory p-5 ring-1 ring-ocean-900/10">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                      <Check size={14} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-ocean-900">{a}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Méthode */}
        <section className="section-ocean grain relative py-20 lg:py-28">
          <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="container-soft relative">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Notre méthode"
                title="Le déroulé d'une intervention type."
                tone="light"
                intro="De la prise de contact à la remise du rapport client : un process simple, transparent et structuré."
                align="center"
                className="mx-auto"
              />
            </ScrollReveal>

            <ol className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {service.methode.map((step, i) => (
                <li
                  key={step.titre}
                  className="rounded-2xl bg-ocean-800/50 p-7 ring-1 ring-paper/10"
                >
                  <p className="font-display text-5xl text-accent-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl text-paper">{step.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sky-100/80">{step.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Supports */}
        {service.supports.length > 0 ? (
          <section className="bg-paper py-20 lg:py-28">
            <div className="container-soft grid gap-10 lg:grid-cols-12">
              <ScrollReveal className="lg:col-span-5">
                <SectionHeading
                  eyebrow="Supports traités"
                  title={`Compatibilité ${service.shortTitle.toLowerCase()}.`}
                  intro="Nous adaptons produit, pression et méthode au matériau pour un résultat optimal sans dégrader la surface."
                />
              </ScrollReveal>
              <ul className="grid gap-3 lg:col-span-7 sm:grid-cols-2">
                {service.supports.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 rounded-md bg-ivory px-4 py-3 ring-1 ring-ocean-900/5"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-hidden />
                    <span className="text-sm text-ocean-900">{s}</span>
                  </li>
                ))}
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
                      <CertIcon size={26} aria-hidden />
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
                title={`On répond aux questions sur ${service.shortTitle.toLowerCase()}.`}
                intro="Une question reste sans réponse ? Contactez-nous, on vous répond sous 48 h ouvrées."
              />
            </ScrollReveal>
            <div className="lg:col-span-7">
              <FaqAccordion entries={allFaq} />
            </div>
          </div>
        </section>

        {/* Related services */}
        {related.length > 0 ? (
          <section className="bg-bone py-20 lg:py-28">
            <div className="container-soft">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Aussi à découvrir"
                  title="D'autres prestations qui pourraient vous intéresser."
                  align="center"
                  className="mx-auto"
                />
              </ScrollReveal>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.slice(0, 3).map((r) => (
                  <ServiceCard key={r.slug} service={r} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* CTA final */}
        <section className="section-ocean py-20 lg:py-24">
          <div className="container-soft flex flex-col items-center gap-6 text-center">
            <SectionHeading
              eyebrow="Devis gratuit"
              title={`Besoin d'un devis pour ${service.shortTitle.toLowerCase()} ?`}
              tone="light"
              align="center"
              intro={`Devis gratuit et personnalisé en 48 h ouvrées. Intervention dans tout le ${siteConfig.contact.primaryServiceArea} et au-delà sur demande.`}
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
