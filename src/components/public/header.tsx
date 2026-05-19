"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Expose la hauteur exacte du header (+ banneau promo) en CSS var
  // pour que le hero plein-écran puisse calculer 100svh - var(--header-h).
  useEffect(() => {
    const root = document.documentElement;
    const banner = document.querySelector<HTMLElement>("[data-promo-banner]");
    const headerEl = document.querySelector<HTMLElement>("[data-site-header]");

    const measure = () => {
      const h =
        (banner?.offsetHeight ?? 0) + (headerEl?.offsetHeight ?? 0);
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

  return (
    <>
      {siteConfig.promoBanner.enabled ? (
        <div data-promo-banner className="bg-ocean-900 text-paper">
          <div className="container-soft flex items-center justify-between gap-3 py-2 text-xs sm:text-sm">
            <p className="truncate">
              <span className="font-medium text-accent-400">
                {siteConfig.promoBanner.text}
              </span>
            </p>
            <Link
              href={siteConfig.promoBanner.ctaHref}
              className="shrink-0 rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-ocean-900 transition hover:bg-accent-400"
            >
              {siteConfig.promoBanner.ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}

      <header
        data-site-header
        className={cn(
          "sticky top-0 z-40 transition-all",
          scrolled ? "bg-paper/90 shadow-soft backdrop-blur-md" : "bg-paper",
        )}
      >
        <div className="container-soft flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`Accueil ${siteConfig.name}`}
          >
            <DroneSignet />
            <span className="hidden font-display text-lg font-medium tracking-tight text-ocean-900 transition-colors duration-300 group-hover:text-accent-700 sm:inline">
              {siteConfig.shortName}
            </span>
          </Link>

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
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={active}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden items-center gap-2 text-sm font-medium text-ocean-900 hover:text-accent-700 md:inline-flex"
            >
              <Phone size={16} aria-hidden />
              {siteConfig.contact.phoneDisplay}
            </a>
            <Button asChild size="sm" variant="primary" className="hidden md:inline-flex">
              <Link href="/contactdrone">Devis gratuit</Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ocean-900 hover:bg-ocean-900/5 lg:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="lg:hidden">
            <div className="fixed inset-x-0 top-20 bottom-0 z-50 overflow-y-auto bg-paper">
              <nav
                className="container-soft flex flex-col gap-1 py-6"
                aria-label="Navigation mobile"
              >
                {(siteConfig.navigation as readonly NavItem[]).map((item) => {
                  const active = isNavActive(pathname, item);
                  return item.children ? (
                    <details key={item.href} className="group rounded-md" open={active}>
                      <summary
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-md px-4 py-3 font-display text-lg transition",
                          active
                            ? "bg-accent-500/10 text-accent-700 ring-1 ring-accent-500/20"
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
                          className="transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <div className="ml-4 flex flex-col gap-1 border-l border-ocean-900/10 pl-4">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "rounded-md px-4 py-2 text-sm transition",
                            pathname === item.href
                              ? "bg-accent-500/10 text-accent-700"
                              : "text-slate-500 hover:bg-ocean-900/5",
                          )}
                        >
                          Vue d'ensemble
                        </Link>
                        {item.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "rounded-md px-4 py-2 text-sm transition",
                                childActive
                                  ? "bg-accent-500/10 text-accent-700"
                                  : "text-ocean-900 hover:bg-ocean-900/5",
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </details>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-3 font-display text-lg transition",
                        active
                          ? "bg-accent-500/10 text-accent-700 ring-1 ring-accent-500/20"
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
                  );
                })}
                <div className="mt-4 flex flex-col gap-3 border-t border-ocean-900/10 pt-6">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-900"
                  >
                    <Phone size={16} aria-hidden />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <Button asChild className="w-full" variant="primary">
                    <Link href="/contactdrone" onClick={() => setOpen(false)}>
                      Devis gratuit
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        ) : null}
      </header>
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
              Vue d'ensemble
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
    <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-ocean-900 text-accent-500 transition-all duration-500 ease-out group-hover:rotate-[18deg] group-hover:bg-ocean-800 group-hover:shadow-accent-glow">
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
