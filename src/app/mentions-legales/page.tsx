import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales d'Alti' Drone & Services — identité éditeur et hébergeur du site.",
  path: "/mentions-legales",
  noindex: true,
});

export default function MentionsLegales() {
  const { legalName, legal, contact, url } = siteConfig;

  return (
    <>
      <Header />
      <main id="main-content" className="bg-paper py-16 lg:py-20">
        <article className="container-soft mx-auto max-w-3xl space-y-10 text-ocean-900">
          <header>
            <p className="eyebrow">Informations légales</p>
            <h1 className="fluid-h2 mt-3">Mentions légales</h1>
            <p className="mt-4 text-slate-500">
              En vigueur au {new Date().toLocaleDateString("fr-FR")}.
            </p>
          </header>

          <section>
            <h2 className="font-display text-2xl">Éditeur du site</h2>
            <p className="mt-4 leading-relaxed">
              <strong>{legalName}</strong>
              <br />
              {legal.structure}
              <br />
              Siège social : {contact.address}, {contact.postalCode} {contact.city}, {contact.countryName}
              <br />
              SIRET : {legal.siret}
              <br />
              Téléphone : <a href={`tel:${contact.phone}`} className="text-accent-700 underline-offset-2 hover:underline">{contact.phoneDisplay}</a>
              <br />
              Email :{" "}
              <a href={`mailto:${contact.email}`} className="text-accent-700 underline-offset-2 hover:underline">
                {contact.email}
              </a>
              <br />
              Directeur de la publication : {legal.publisher}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Hébergement</h2>
            <p className="mt-4 leading-relaxed">
              Le site est hébergé par <strong>{legal.host.name}</strong>,{" "}
              {legal.host.address}.
              <br />
              <a
                href={legal.host.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-700 underline-offset-2 hover:underline"
              >
                {legal.host.url}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Propriété intellectuelle</h2>
            <p className="mt-4 leading-relaxed">
              L'ensemble du contenu présent sur ce site ({url}) — textes, images, logos,
              vidéos, éléments graphiques et structure — est la propriété exclusive de{" "}
              {legalName}, sauf mention contraire. Toute reproduction, distribution,
              modification ou utilisation, même partielle, est interdite sans autorisation
              écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Responsabilité</h2>
            <p className="mt-4 leading-relaxed">
              Les informations diffusées sur ce site sont fournies à titre indicatif et
              peuvent être modifiées à tout moment. {legalName} ne saurait être tenu
              responsable des dommages directs ou indirects résultant de l'utilisation du
              site, d'une indisponibilité temporaire, ou d'une erreur ponctuelle dans les
              contenus.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Données personnelles</h2>
            <p className="mt-4 leading-relaxed">
              Les informations recueillies via le formulaire de contact sont destinées
              uniquement à {legalName} pour répondre aux demandes des utilisateurs.
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et
              de suppression. Détail dans notre{" "}
              <a
                href="/confidentialite"
                className="text-accent-700 underline-offset-2 hover:underline"
              >
                politique de confidentialité
              </a>
              . Pour exercer vos droits :{" "}
              <a
                href={`mailto:${legal.dpoEmail}`}
                className="text-accent-700 underline-offset-2 hover:underline"
              >
                {legal.dpoEmail}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Cookies</h2>
            <p className="mt-4 leading-relaxed">
              Ce site utilise uniquement des cookies strictement nécessaires à son
              fonctionnement (préférences d'affichage, anti-spam Cloudflare Turnstile).
              Les statistiques de visite sont opérées par Cloudflare Web Analytics, qui
              fonctionne sans cookie tiers et sans collecte de données personnelles.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
