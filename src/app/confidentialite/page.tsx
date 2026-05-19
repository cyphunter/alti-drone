import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: "Traitement des données personnelles sur le site Alti' Drone & Services — conformité RGPD.",
  path: "/confidentialite",
  noindex: true,
});

export default function Confidentialite() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-paper py-16 lg:py-20">
        <article className="container-soft mx-auto max-w-3xl space-y-10 text-ocean-900">
          <header>
            <p className="eyebrow">Protection des données</p>
            <h1 className="fluid-h2 mt-3">Politique de confidentialité</h1>
            <p className="mt-4 text-slate-500">
              {siteConfig.legalName} est attaché à la protection de vos données. Voici, en
              clair, ce que nous collectons et pourquoi.
            </p>
          </header>

          <section>
            <h2 className="font-display text-2xl">1. Données collectées</h2>
            <ul className="mt-4 space-y-3 leading-relaxed">
              <li>
                <strong>Formulaire de contact :</strong> nom, email, téléphone, adresse du
                bâtiment, type de prestation, type de bâtiment, surface estimée (facultatif),
                message libre.
              </li>
              <li>
                <strong>Vérification anti-spam :</strong> jeton Cloudflare Turnstile (anonyme).
              </li>
              <li>
                <strong>Statistiques :</strong> Cloudflare Web Analytics — métriques agrégées
                anonymes (pages vues, performances). Aucun cookie tiers, aucune donnée
                personnelle.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">2. Finalités</h2>
            <ul className="mt-4 space-y-3 leading-relaxed">
              <li>Répondre à votre demande de devis ou d'information.</li>
              <li>Vous recontacter par téléphone ou email avec votre accord.</li>
              <li>Établir un devis personnalisé et planifier une intervention.</li>
              <li>Mesurer la performance technique du site (anonymement).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">3. Base légale</h2>
            <p className="mt-4 leading-relaxed">
              Le traitement repose sur votre consentement (case à cocher du formulaire) et,
              le cas échéant, sur l'intérêt légitime pour le suivi commercial et la
              mesure d'audience anonyme.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">4. Durée de conservation</h2>
            <ul className="mt-4 space-y-3 leading-relaxed">
              <li>Demandes de contact : 3 ans après le dernier échange.</li>
              <li>Devis envoyés : 5 ans (obligations comptables).</li>
              <li>Statistiques : agrégées, pas de stockage individuel.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">5. Vos droits</h2>
            <p className="mt-4 leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
              d'effacement, de limitation, de portabilité et d'opposition concernant vos
              données. Pour exercer ces droits :{" "}
              <a
                href={`mailto:${siteConfig.legal.dpoEmail}`}
                className="text-accent-700 underline-offset-2 hover:underline"
              >
                {siteConfig.legal.dpoEmail}
              </a>
              . Vous pouvez également déposer une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-700 underline-offset-2 hover:underline"
              >
                CNIL
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">6. Cookies et traceurs</h2>
            <p className="mt-4 leading-relaxed">
              Ce site n'utilise pas de cookie publicitaire ni de traceur tiers. Le widget
              anti-spam Cloudflare Turnstile peut déposer un cookie temporaire strictement
              nécessaire à la vérification anti-bot, sans collecte de données personnelles.
              Cloudflare Web Analytics fonctionne sans cookie.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">7. Hébergement</h2>
            <p className="mt-4 leading-relaxed">
              Le site est hébergé par {siteConfig.legal.host.name} ({siteConfig.legal.host.address}).
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
