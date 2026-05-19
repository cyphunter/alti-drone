"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: readonly NavChild[] };

function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.href === pathname) return true;
  if (item.children) {
    return item.children.some((c) => c.href === pathname);
  }
  return false;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  // Effet d'ombre / blur quand l'utilisateur scrolle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquer le scroll body + gérer focus quand le drawer s'ouvre / se ferme
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Focus sur le bouton fermer du drawer pour l'accessibilité
      drawerCloseRef.current?.focus();
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [open]);

  // Fermer avec Escape + restaurer focus sur le burger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Fermer le menu quand on change de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Expose la hauteur exacte du header (+ bandeau promo) en CSS var
  // pour que le hero plein-écran puisse calculer 100svh - var(--header-h).
  useEffect(() => {
    const root = document.documentElement;
    const banner = document.querySelector<HTMLElement>("[data-promo-banner]");
    const headerEl = document.querySelector<HTMLElement>("[data-site-header]");

    const measure = () => {
      const h = (banner?.offsetHeight ?? 0) + (headerEl?.offsetHeight ?? 0);
      root.style.setProperty("--header-h", `${h}px`);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (banner) ro.observe(banner);
    if (headerEl) ro.observe(headerEl);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Retour de focus au burger après fermeture pour l'a11y
    requestAnimationFrame(() => burgerRef.current?.focus());
  };

  return (
    <>
      {siteConfig.promoBanner.enabled ? (
        <div data-promo-banner className="bg-ocean-900 text-paper">
          <div className="container-soft flex h-9 items-center justify-between gap-3 text-xs sm:h-10 sm:text-sm">
            {/* Texte court mobile, texte complet desktop */}
            <p className="min-w-0 flex-1 truncate">
              <span className="font-medium text-accent-400 sm:hidden">
                Offre de lancement — tarif préférentiel
              </span>
              <span className="hidden font-medium text-accent-400 sm:inline">
                {siteConfig.promoBanner.text}
              </span>
            </p>
            <Link
              href={siteConfig.promoBanner.ctaHref}
              className="shrink-0 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-medium text-ocean-900 transition hover:bg-accent-400 sm:text-xs"
            >
              {siteConfig.promoBanner.ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}

      <header
        data-site-header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled ? "bg-paper/90 shadow-soft backdrop-blur-md" : "bg-paper",
        )}
      >
        <div className="container-soft flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
            aria-label={`Accueil ${siteConfig.name}`}
          >
            <DroneSignet />
            <span className="truncate font-display text-base font-medium tracking-tight text-ocean-900 transition-colors duration-300 group-hover:text-accent-700 sm:text-lg">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Nav desktop */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Navigation principale"
          >
            {(siteConfig.navigation as readonly NavItem[]).map((item) => {
              const active = isNavActive(pathname, item);
              return item.children ? (
                <ServicesDropdown
                  key={item.href}
                  item={item as NavItem & { children: readonly NavChild[] }}
                  active={active}
                  pathname={pathname}
                />
              ) : (
                <NavLink key={item.href} href={item.href} active={active}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden h-11 items-center gap-2 px-2 text-sm font-medium text-ocean-900 hover:text-accent-700 md:inline-flex"
            >
              <Phone size={16} aria-hidden />
              <span className="hidden lg:inline">{siteConfig.contact.phoneDisplay}</span>
            </a>
            <Button
              asChild
              size="sm"
              variant="primary"
              className="hidden md:inline-flex"
            >
              <Link href="/contactdrone">Devis gratuit</Link>
            </Button>
            <button
              ref={burgerRef}
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ocean-900 transition hover:bg-ocean-900/5 lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={handleOpen}
            >
              <Menu size={22} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/*
        Drawer mobile — RENDU EN DEHORS DU HEADER.
        Critique : le header peut avoir `backdrop-filter` (au scroll) qui créerait
        un containing block bloquant `position: fixed` des descendants — donc le
        drawer doit être un frère du header, pas un enfant.
      */}
      <div
        id="mobile-drawer"
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Fermer le menu"
          tabIndex={open ? 0 : -1}
          onClick={handleClose}
          className={cn(
            "absolute inset-0 cursor-default bg-ocean-900/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Panneau drawer */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper shadow-cinema transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Header interne du drawer */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ocean-900/10 px-5">
            <Link
              href="/"
              onClick={handleClose}
              className="group flex items-center gap-3"
              aria-label={`Accueil ${siteConfig.name}`}
            >
              <DroneSignet />
              <span className="font-display text-lg font-medium tracking-tight text-ocean-900">
                {siteConfig.shortName}
              </span>
            </Link>
            <button
              ref={drawerCloseRef}
              type="button"
              onClick={handleClose}
              tabIndex={open ? 0 : -1}
              aria-label="Fermer le menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ocean-900 transition hover:bg-ocean-900/5"
            >
              <X size={22} aria-hidden />
            </button>
          </div>

          {/* Nav scrollable */}
          <nav
            aria-label="Navigation mobile"
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-5"
          >
            <ul className="flex flex-col gap-1">
              {(siteConfig.navigation as readonly NavItem[]).map((item) => {
                const active = isNavActive(pathname, item);
                return item.children ? (
                  <li key={item.href}>
                    <details className="group rounded-lg" open={active}>
                      <summary
                        className={cn(
                          "flex min-h-[48px] cursor-pointer items-center justify-between rounded-lg px-3 font-display text-lg transition",
                          active
                            ? "bg-accent-500/10 text-accent-700"
                            : "text-ocean-900 hover:bg-ocean-900/5",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {active ? (
                            <span
                              aria-hidden
                              className="h-1.5 w-1.5 rounded-full bg-accent-500"
                            />
                          ) : null}
                          {item.label}
                        </span>
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className="transition-transform duration-300 group-open:rotate-180"
                        />
                      </summary>
                      <ul className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-ocean-900/10 pl-3">
                        <li>
                          <Link
                            href={item.href}
                            onClick={handleClose}
                            tabIndex={open ? 0 : -1}
                            className={cn(
                              "flex min-h-[44px] items-center rounded-md px-3 text-sm transition",
                              pathname === item.href
                                ? "bg-accent-500/10 text-accent-700"
                                : "text-slate-500 hover:bg-ocean-900/5",
                            )}
                          >
                            Vue d&apos;ensemble
                          </Link>
                        </li>
                        {item.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={handleClose}
                                tabIndex={open ? 0 : -1}
                                className={cn(
                                  "flex min-h-[44px] items-center rounded-md px-3 text-sm transition",
                                  childActive
                                    ? "bg-accent-500/10 text-accent-700"
                                    : "text-ocean-900 hover:bg-ocean-900/5",
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      tabIndex={open ? 0 : -1}
                      className={cn(
                        "flex min-h-[48px] items-center gap-2 rounded-lg px-3 font-display text-lg transition",
                        active
                          ? "bg-accent-500/10 text-accent-700"
                          : "text-ocean-900 hover:bg-ocean-900/5",
                      )}
                    >
                      {active ? (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-accent-500"
                        />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer du drawer : actions */}
          <div className="shrink-0 border-t border-ocean-900/10 px-5 py-4">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              tabIndex={open ? 0 : -1}
              className="flex min-h-[44px] items-center gap-2 px-1 text-sm font-medium text-ocean-900"
            >
              <Phone size={16} aria-hidden className="text-accent-700" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <Button asChild className="mt-3 w-full" variant="primary">
              <Link
                href="/contactdrone"
                onClick={handleClose}
                tabIndex={open ? 0 : -1}
              >
                Devis gratuit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Lien de navigation desktop avec indicateur d'état actif premium :
 * un fin underline gradient doré qui apparaît sous l'item actif et
 * s'étire au hover sur tous les autres.
 */
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center text-sm font-medium transition-colors",
        active ? "text-accent-700" : "text-ocean-900 hover:text-accent-700",
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-1 left-0 right-0 h-px origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-transparent transition-transform duration-500 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

function ServicesDropdown({
  item,
  active,
  pathname,
}: {
  item: { label: string; href: string; children: readonly NavChild[] };
  active: boolean;
  pathname: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative inline-flex items-center gap-1 text-sm font-medium transition-colors",
          active ? "text-accent-700" : "text-ocean-900 hover:text-accent-700",
        )}
      >
        {item.label}
        <ChevronDown size={14} aria-hidden />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-1 left-0 right-0 h-px origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-transparent transition-transform duration-500 ease-out",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </Link>
      {hovered ? (
        <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2">
          <div
            className="rounded-xl bg-paper p-2 shadow-elevated ring-1 ring-ocean-900/10"
            role="menu"
          >
            <Link
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? "bg-accent-500/10 text-accent-700"
                  : "text-ocean-900 hover:bg-ocean-900/5",
              )}
            >
              Vue d&apos;ensemble
            </Link>
            <div className="my-1 h-px bg-ocean-900/10" />
            {item.children.map((c) => {
              const childActive = pathname === c.href;
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition",
                    childActive
                      ? "bg-accent-500/10 text-accent-700 font-medium"
                      : "text-ocean-900 hover:bg-ocean-900/5",
                  )}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DroneSignet() {
  return (
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-900 text-accent-500 transition-all duration-500 ease-out group-hover:rotate-[18deg] group-hover:bg-ocean-800 group-hover:shadow-accent-glow">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="transition-transform duration-700 group-hover:rotate-[-18deg]"
      >
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="18" cy="6" r="2.4" />
        <circle cx="6" cy="18" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M8 8l8 8M16 8l-8 8" />
        <rect x="10" y="10" width="4" height="4" rx="0.5" />
      </svg>
    </span>
  );
}
