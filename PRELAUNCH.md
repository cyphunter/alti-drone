# Checklist pré-livraison — PROJECT_NAME

À cocher **à 100 %** avant mise en ligne. Aucune exception.

## Qualité technique

- [ ] Lighthouse mobile ≥ 95 sur les 4 catégories (Perf, A11y, SEO, Best Practices) — joindre rapport
- [ ] LCP < 2.5s · INP < 200ms · CLS < 0.1 · FCP < 1.8s (mobile 4G simulé)
- [ ] `npm run typecheck` : 0 erreur
- [ ] `npm run lint` : 0 erreur
- [ ] `npm run test` : tous tests passent (si tests présents)
- [ ] Bundle JS initial < 170 KB gzip
- [ ] Console navigateur sur toutes les routes principales : 0 erreur / 0 warning bloquant

## Accessibilité

- [ ] Navigation clavier complète (Tab, Shift+Tab, Enter, Esc)
- [ ] Focus visible partout (`focus-visible`)
- [ ] Skip-to-content présent et fonctionnel
- [ ] Contraste 4.5:1 (texte normal), 3:1 (texte large) — vérifié axe DevTools
- [ ] Tous `alt` renseignés (vides si décoratif)
- [ ] Formulaires : `<label>` lié, messages erreur clairs en français
- [ ] `prefers-reduced-motion` respecté (Framer Motion + GSAP + Lenis)
- [ ] Test lecteur d'écran (NVDA ou VoiceOver) sur page d'accueil

## SEO

- [ ] 1 seul `<h1>` par page, hiérarchie h1-h6 logique
- [ ] `Metadata` Next.js sur toutes les pages (titre, description, canonical, OG)
- [ ] JSON-LD typé (Organization, LocalBusiness, Article, BreadcrumbList, FAQPage selon métier)
- [ ] OpenGraph image 1200×630 testée (Facebook Debugger + Twitter Card Validator)
- [ ] `sitemap.xml` généré et accessible (`/sitemap.xml`)
- [ ] `robots.txt` valide (`/robots.txt`)
- [ ] URLs slugs FR clairs, sans `.html`, sans query
- [ ] 301 redirects de l'ancien site (si refonte) — testés à `curl -I`
- [ ] Google Search Console : site ajouté + sitemap soumis
- [ ] Bing Webmaster Tools : ajouté

## Sécurité

- [ ] Headers présents (test [securityheaders.com](https://securityheaders.com) → **A+**)
  - [ ] CSP
  - [ ] HSTS
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Referrer-Policy
  - [ ] Permissions-Policy
- [ ] HTTPS partout, 0 mixed content
- [ ] Validation Zod sur toutes les Server Actions / API routes
- [ ] Sanitize-html sur tout contenu user-generated
- [ ] Rate limiting actif sur endpoints sensibles (login, contact)
- [ ] Secrets via `wrangler secret put`, 0 clé en clair dans le repo

## Légal RGPD France

- [ ] Page Mentions légales en ligne (raison sociale, SIRET, hébergeur)
- [ ] Page Politique de confidentialité en ligne
- [ ] Page CGU en ligne (CGV + droit rétractation 14j si e-commerce)
- [ ] Formulaires : case RGPD non pré-cochée + lien politique
- [ ] Pas de bandeau cookies requis (Cloudflare Web Analytics uniquement) OU bandeau présent si autre analytics

## Email (Resend)

- [ ] Domaine vérifié sur Resend (statut "verified")
- [ ] SPF + DKIM (3 CNAME) + DMARC + return-path présents en DNS Cloudflare
- [ ] Test envoi vers Gmail + Outlook + ProtonMail → reçus en inbox (pas spam)
- [ ] Webhook bounces/complaints configuré (`/api/webhooks/resend`)
- [ ] `from` = `<service>@<domaine>` (pas Gmail/OVH)

## DNS / Domaine

- [ ] OVH NS pointe vers Cloudflare (vérif `dig NS <domaine>`)
- [ ] A/CNAME @ et www → Workers (proxy ON 🟠)
- [ ] DNS Resend (SPF + DKIM + DMARC) propagés (vérif `dig TXT <domaine>`)
- [ ] SSL/TLS mode "Full (strict)" activé
- [ ] Cert SSL valide (vérif `curl -I https://<domaine>`)
- [ ] Email forwarding contact@<domaine> → Gmail Kevin (Cloudflare Email Routing)

## Données

- [ ] Migrations D1 appliquées prod (`npm run db:migrate:remote`)
- [ ] Tables préfixées par `SITE_ID` (pas de conflit avec autres projets sur `freelance-shared`)
- [ ] Backup D1 initial fait (`wrangler d1 export freelance-shared`)
- [ ] R2 bucket créé + CORS si servi cross-origin
- [ ] Données de test purgées (pas de "Lorem ipsum" en prod)

## Responsive & cross-browser

- [ ] Tests sur 5 breakpoints : 375 / 768 / 1024 / 1440 / 1920
- [ ] iOS Safari (Mac Simulator ou device réel)
- [ ] Android Chrome
- [ ] Pas de scrollbar horizontale à 320px de large
- [ ] Touch targets ≥ 44×44px

## Assets

- [ ] Images en WebP/AVIF (sauf SVG/PNG quand nécessaire)
- [ ] Hero LCP < 200 KB
- [ ] Favicon set complet :
  - [ ] `/favicon.ico`
  - [ ] `/icon-192.png`
  - [ ] `/icon-512.png`
  - [ ] `/apple-touch-icon.png` (180×180)
  - [ ] `/manifest.webmanifest`
- [ ] Polices via `next/font` (preload + display swap)

## Pages d'erreur

- [ ] `/not-found.tsx` personnalisée et testée
- [ ] `/error.tsx` personnalisée et testée

## Monitoring

- [ ] `observability.enabled = true` dans `wrangler.jsonc`
- [ ] Endpoint `/health` répond 200 (`curl https://<domaine>/health`)
- [ ] Cloudflare Web Analytics activé pour le domaine
- [ ] Uptime monitoring externe (BetterStack / UptimeRobot) configuré check 5 min
- [ ] Alertes uptime → email + (Slack si applicable)

## Repo & CI/CD

- [ ] README à jour
- [ ] Branches protégées (main protégée, PR review requise)
- [ ] Secrets GitHub Actions configurés (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
- [ ] CI verte sur dernier commit
- [ ] Deploy auto sur push `main` vérifié

## Livraison client

- [ ] `LIVRAISON.md` rempli (accès, comment éditer, procédures)
- [ ] Tableau d'accès remis (Cloudflare, Resend, GitHub, OVH, GSC, monitoring)
- [ ] Identifiants initiaux back-office transmis (si applicable) + procédure changement mot de passe
- [ ] Démo client : tour du site, du back-office, comment publier/éditer
- [ ] Contrat de maintenance signé (si applicable)
