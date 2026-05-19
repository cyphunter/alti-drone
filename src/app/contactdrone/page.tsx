import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, canonicalUrl } from "@/lib/site-config";
import { zones } from "@/data/zones";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { ContactForm } from "@/components/public/contact-form";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type { BreadcrumbList, ContactPage, WithContext } from "schema-dts";

export const metadata: Metadata = buildMetadata({
  title: "Contact & devis gratuit — Alti' Drone & Services",
  description:
    "Demande de devis pour nettoyage toiture, façade ou panneaux solaires par drone à Pornic et Pays de Retz. Réponse sous 48 h ouvrées.",
  path: "/contactdrone",
});

export default function ContactPage() {
  const breadcrumb: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonicalUrl("/contactdrone") },
    ],
  };

  const contactPage: WithContext<ContactPage> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Alti' Drone & Services",
    url: canonicalUrl("/contactdrone"),
    mainEntity: { "@id": `${siteConfig.url}#business` },
  };

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={contactPage} />
      <Header />
      <main id="main-content">
        <section className="hero-gradient">
          <div className="container-soft py-16 text-center lg:py-20">
            <ScrollReveal>
              <p className="eyebrow mx-auto justify-center">Contact & devis</p>
              <h1 className="fluid-h1 mt-5 text-ocean-900">
                Discutons de votre <span className="italic-display text-accent-700">projet</span>.
              </h1>
              <p className="fluid-lead mx-auto mt-6 max-w-2xl text-slate-500">
                Décrivez votre besoin via le formulaire — inspection par drone offerte,
                devis personnalisé sous 48 h ouvrées.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-paper py-16 lg:py-24">
          <div className="container-soft grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Coordonnées */}
            <ScrollReveal className="lg:col-span-5">
              <div className="rounded-2xl bg-ocean-900 p-8 text-paper ring-1 ring-ocean-900/10 lg:p-10">
                <h2 className="font-display text-2xl">Une équipe joignable.</h2>
                <p className="mt-3 text-sm text-sky-100/80">
                  Pour les demandes urgentes ou un échange direct, le téléphone reste le
                  plus rapide. Sinon, le formulaire ci-contre nous parvient instantanément.
                </p>

                <ul className="mt-8 space-y-5 text-sm">
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                      <Phone size={16} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-100/60">
                        Téléphone
                      </p>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="mt-0.5 inline-block text-base font-medium text-paper hover:text-accent-300"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                      <Mail size={16} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-100/60">Email</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="mt-0.5 inline-block break-all text-base font-medium text-paper hover:text-accent-300"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                      <MapPin size={16} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-100/60">
                        Adresse
                      </p>
                      <p className="mt-0.5 text-base text-paper">
                        {siteConfig.contact.address}
                        <br />
                        {siteConfig.contact.postalCode} {siteConfig.contact.city}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                      <Clock size={16} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-100/60">
                        Horaires
                      </p>
                      <p className="mt-0.5 text-base text-paper">
                        {siteConfig.contact.openingHoursLabel}
                      </p>
                    </div>
                  </li>

                  {siteConfig.social.instagram ? (
                    <li className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
                        <Instagram size={16} aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-sky-100/60">
                          Instagram
                        </p>
                        <a
                          href={siteConfig.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-block text-base font-medium text-paper hover:text-accent-300"
                        >
                          @alti_drone_services_44
                        </a>
                      </div>
                    </li>
                  ) : null}
                </ul>

                <div className="mt-8 border-t border-paper/15 pt-6">
                  <p className="text-xs uppercase tracking-wider text-accent-400">
                    Secteur d'intervention
                  </p>
                  <p className="mt-2 text-sm text-sky-100/80">
                    Loire-Atlantique (44) — cœur Pays de Retz : Pornic, La Plaine-sur-Mer,
                    Préfailles, La Bernerie-en-Retz, Saint-Brévin-les-Pins, Saint-Michel-Chef-Chef,
                    et au-delà sur demande (Saint-Nazaire, Pornichet, La Baule, Guérande, Nantes-sud…).
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Formulaire */}
            <ScrollReveal delay={0.05} className="lg:col-span-7">
              <div className="rounded-2xl bg-ivory p-8 shadow-soft ring-1 ring-ocean-900/10 lg:p-10">
                <h2 className="font-display text-2xl text-ocean-900">
                  Demandez votre devis gratuit
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  Tous les champs marqués <span className="text-error">*</span> sont
                  obligatoires. Vos données sont uniquement utilisées pour vous répondre.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Zones d'intervention */}
        <section className="bg-bone py-16 lg:py-20">
          <div className="container-soft">
            <ScrollReveal>
              <p className="eyebrow">Emplacement</p>
              <h2 className="fluid-h3 mt-3 text-ocean-900">
                Communes desservies en Loire-Atlantique
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ocean-900 sm:grid-cols-3 lg:grid-cols-4">
                {zones.map((z) => (
                  <li key={z.name} className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        z.isCore ? "bg-accent-500" : "bg-slate-300"
                      }`}
                      aria-hidden
                    />
                    <span className={z.isCore ? "font-medium" : ""}>{z.name}</span>
                    <span className="text-xs text-slate-300">({z.postalCode})</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
