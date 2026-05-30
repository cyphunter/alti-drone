import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { services } from "@/data/services";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { StickyMobileCTA } from "@/components/public/sticky-mobile-cta";
import { SectionHeading } from "@/components/public/section-heading";
import { ServiceCard } from "@/components/public/service-card";
import { ServiceCarousel } from "@/components/public/service-carousel";
import { CtaBandeau } from "@/components/public/cta-bandeau";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Nos services drone — Toiture, façade, panneaux solaires",
  description:
    "Découvrez les 9 prestations d'Alti' Drone & Services à Pornic et Pays de Retz : démoussage, hydrofuge, nettoyage façades et bardages, panneaux solaires, gouttières. Devis gratuit.",
  path: "/services",
});

const GROUPS: { title: string; group: "Toiture" | "Façade" | "Solaire" }[] = [
  { title: "Toitures — démoussage & traitement", group: "Toiture" },
  { title: "Façades & bardages", group: "Façade" },
  { title: "Panneaux solaires", group: "Solaire" },
];

export default function ServicesPage() {
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: canonicalUrl("/services") },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <Header />
      <main id="main-content">
        {/* Hero hub */}
        <section className="hero-gradient">
          <div className="container-soft py-16 text-center lg:py-24">
            <ScrollReveal>
              <p className="eyebrow mx-auto justify-center">Prestations</p>
              <h1 className="fluid-h1 mt-5 text-ocean-900">
                Toiture, façade, panneaux : <br className="hidden md:block" />
                <span className="italic-display text-accent-700">tout par drone</span>.
              </h1>
              <p className="fluid-lead mx-auto mt-6 max-w-2xl text-slate-500">
                Une approche moderne et sécurisée pour chaque support : pulvérisation
                contrôlée, inspection HD, rapport client. Sans échafaudage, sans
                contraintes lourdes.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" variant="primary">
                  <Link href="/contactdrone">
                    Demander un devis gratuit
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm font-medium text-ocean-900 hover:text-accent-700"
                >
                  ou {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services par groupe */}
        {GROUPS.map((g) => {
          const groupServices = services.filter((s) => s.group === g.group);
          if (groupServices.length === 0) return null;
          return (
            <section
              key={g.group}
              className={
                g.group === "Façade" ? "bg-bone py-20 lg:py-28" : "bg-paper py-20 lg:py-28"
              }
            >
              <div className="container-soft">
                <ScrollReveal>
                  <SectionHeading
                    eyebrow={g.group}
                    title={g.title}
                    intro={groupIntro(g.group)}
                  />
                </ScrollReveal>
                {groupServices.length > 3 ? (
                  <ScrollReveal className="mt-12">
                    <ServiceCarousel>
                      {groupServices.map((s) => (
                        <li
                          key={s.slug}
                          className="shrink-0 basis-[85%] snap-start sm:basis-[47%] lg:basis-[32%]"
                        >
                          <ServiceCard service={s} />
                        </li>
                      ))}
                    </ServiceCarousel>
                  </ScrollReveal>
                ) : (
                  <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupServices.map((s) => (
                      <StaggerItem key={s.slug}>
                        <ServiceCard service={s} />
                      </StaggerItem>
                    ))}
                  </StaggerReveal>
                )}
              </div>
            </section>
          );
        })}

        {/* Avantages globaux */}
        <section className="section-ocean grain relative py-20 lg:py-28">
          <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="container-soft relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Pourquoi nous"
                title="Le drone fait toute la différence."
                tone="light"
                intro="Comparé aux méthodes classiques (échafaudage, nacelle, alpinistes), le drone professionnel offre un meilleur rapport qualité/prix/sécurité."
              />
            </ScrollReveal>
            <ul className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
              {[
                "Pas d'échafaudage à monter",
                "Aucun risque de chute, aucun piétinement",
                "Accès facile aux zones difficiles",
                "Intervention rapide même sur grande surface",
                "Inspection HD remise en photos/vidéos",
                "Tarif souvent plus compétitif",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl bg-ocean-800/50 p-5 ring-1 ring-paper/10"
                >
                  <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
                  <span className="text-sm leading-relaxed text-paper">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBandeau
          title="Pas sûr de la prestation qu'il vous faut ?"
          description="Décrivez-nous votre besoin : on vous propose l'intervention la plus adaptée."
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

function groupIntro(group: "Toiture" | "Façade" | "Solaire"): string {
  switch (group) {
    case "Toiture":
      return "Démoussage curatif et préventif, traitement hydrofuge, nettoyage adapté à chaque matériau de couverture.";
    case "Façade":
      return "Décrassage et désinfection de façades enduit, bardages métalliques, PVC ou composites — accès facilité par drone.";
    case "Solaire":
      return "Détergent dédié, anti-redéposition, restitution mesurable du rendement de votre installation photovoltaïque.";
  }
}
