import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { localPages } from "@/data/local-pages";

type NavChild = { label: string; href: string };

export function Footer() {
  const year = new Date().getFullYear();
  const servicesItem = siteConfig.navigation.find(
    (n): n is typeof n & { children: readonly NavChild[] } => "children" in n,
  );

  return (
    <footer className="relative bg-ocean-900 text-sky-100">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-soft relative grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
        {/* Marque */}
        <div className="lg:col-span-4">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Accueil">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-paper p-1 transition-transform duration-500 ease-out group-hover:rotate-12">
              <Image
                src="/images/logo/logo-alti-droe-removebg-preview.png"
                alt=""
                width={112}
                height={112}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-display text-2xl text-paper transition-colors duration-300 group-hover:text-accent-300">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sky-100/80">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {siteConfig.social.instagram ? (
              <SocialLink
                href={siteConfig.social.instagram}
                label="Instagram"
                icon={<Instagram size={18} aria-hidden />}
              />
            ) : null}
            {siteConfig.social.facebook ? (
              <SocialLink
                href={siteConfig.social.facebook}
                label="Facebook"
                icon={<Facebook size={18} aria-hidden />}
              />
            ) : null}
            {siteConfig.social.linkedin ? (
              <SocialLink
                href={siteConfig.social.linkedin}
                label="LinkedIn"
                icon={<Linkedin size={18} aria-hidden />}
              />
            ) : null}
          </div>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-lg text-paper">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-sky-100/85">
            <li className="flex items-start gap-3">
              <Phone size={16} aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
              <FooterLink href={`tel:${siteConfig.contact.phone}`}>
                {siteConfig.contact.phoneDisplay}
              </FooterLink>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
              <FooterLink href={`mailto:${siteConfig.contact.email}`} className="break-all">
                {siteConfig.contact.email}
              </FooterLink>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
              <span>
                {siteConfig.contact.address}
                <br />
                {siteConfig.contact.postalCode} {siteConfig.contact.city}
                <br />
                <span className="text-sky-100/60">
                  Secteur : {siteConfig.contact.primaryServiceArea}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
              <span>{siteConfig.contact.openingHoursLabel}</span>
            </li>
          </ul>
        </div>

        {/* Services */}
        {servicesItem ? (
          <div className="lg:col-span-3">
            <h2 className="font-display text-lg text-paper">Prestations</h2>
            <ul className="mt-4 space-y-2 text-sm text-sky-100/85">
              {servicesItem.children.map((c) => (
                <li key={c.href}>
                  <FooterLink href={c.href}>{c.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Liens */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg text-paper">Liens utiles</h2>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/85">
            <li>
              <FooterLink href="/">Accueil</FooterLink>
            </li>
            <li>
              <FooterLink href="/services">Services</FooterLink>
            </li>
            <li>
              <FooterLink href="/galeriedrone">Galerie</FooterLink>
            </li>
            <li>
              <FooterLink href="/contactdrone">Contact</FooterLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Villes desservies (maillage interne SEO local) */}
      <div className="relative border-t border-paper/10">
        <div className="container-soft py-8">
          <p className="text-xs uppercase tracking-widest text-accent-400">
            Villes desservies
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sky-100/85">
            {localPages.map((lp) => (
              <li key={lp.slug}>
                <FooterLink href={`/${lp.slug}`}>
                  Nettoyage drone à {lp.city}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-soft flex flex-col gap-3 py-6 text-xs text-sky-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName} — SIRET {siteConfig.legal.siret} — Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {siteConfig.footerNavigation.map((n) => (
              <li key={n.href}>
                <FooterLink href={n.href}>{n.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/**
 * Lien footer avec underline gradient doré — identique au pattern NavLink
 * du header pour cohérence visuelle.
 */
function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const inner = (
    <span
      className={
        "group relative inline-flex max-w-full items-baseline text-inherit transition-colors duration-300 hover:text-accent-300 " +
        (className ?? "")
      }
    >
      <span className="truncate">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-400 via-accent-500 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </span>
  );
  if (isExternal) {
    return <a href={href}>{inner}</a>;
  }
  return <Link href={href}>{inner}</Link>;
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition hover:scale-105 hover:bg-accent-500 hover:text-ocean-900"
    >
      {icon}
    </a>
  );
}
