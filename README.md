# PROJECT_NAME

Site Next.js 16 + Cloudflare Workers + D1 — boilerplate agence Kevin.

> Référence agence : voir `../CLAUDE.md` et `../CONVENTIONS.md` à la racine de `freelance/`.

## Démarrage rapide

```bash
# 1. Cloner le template (depuis freelance/)
cp -r _template/ <nom-projet>
cd <nom-projet>

# 2. Personnaliser (3 fichiers minimum)
#    - wrangler.jsonc : remplacer PROJECT_NAME, PROJECT_SITE_ID, database_id partagé, R2 bucket
#    - src/lib/db/site-id.ts : remplacer PROJECT_SITE_ID par l'ID unique du projet
#    - src/lib/site-config.ts : contenu client (nom, contact, mentions légales, …)

# 3. Créer les ressources Cloudflare propres au projet
wrangler r2 bucket create <nom-projet>-media
wrangler kv namespace create <nom-projet>-kv
# → reporter l'id KV dans wrangler.jsonc

# (D1 partagée : déjà créée pour l'agence, on réutilise database_id="freelance-shared")

# 4. Installer
npm install

# 5. Init DB locale
npm run db:generate
npm run db:migrate:local
npm run db:seed:local

# 6. Dev
npm run dev          # localhost:3000
npm run preview      # build OpenNext + preview Workers local

# 7. Secrets prod (une fois)
wrangler secret put BETTER_AUTH_SECRET   # 32+ chars random
wrangler secret put RESEND_API_KEY

# 8. Deploy
npm run db:migrate:remote
npm run deploy
```

## Stack

- **Next.js 16** App Router + React 19 + TypeScript strict
- **Cloudflare Workers** via `@opennextjs/cloudflare`
- **D1 mutualisée** (`freelance-shared`) avec tables préfixées par `SITE_ID`
- **R2** pour médias (1 bucket par projet)
- **KV** pour cache court
- **Drizzle ORM** + Drizzle Kit
- **Better-Auth** + `better-auth-cloudflare`
- **Tailwind v4** (CSS-first via `@theme`)
- **Resend** + React Email
- **Zod** validation, **sanitize-html** content

## Scripts

| Script | Effet |
|---|---|
| `npm run dev` | Serveur dev Next.js (localhost:3000) |
| `npm run build` | Build OpenNext (production Workers) |
| `npm run preview` | Build + preview Workers local |
| `npm run deploy` | Build + deploy Workers prod |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Vitest |
| `npm run db:generate` | Génère SQL depuis schema.ts |
| `npm run db:migrate:local` | Applique migrations en local |
| `npm run db:migrate:remote` | Applique migrations en prod |
| `npm run db:seed:local` | Seed data dev |
| `npm run db:studio` | Drizzle Studio (UI DB) |

## Structure

```
src/
├── app/                  # routes App Router
│   ├── (public)/
│   ├── admin/
│   ├── api/
│   │   ├── auth/[...all]/route.ts    # Better-Auth catch-all
│   │   └── webhooks/resend/route.ts
│   ├── health/route.ts               # health check
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── mentions-legales/page.tsx
│   ├── confidentialite/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/               # design system
│   ├── public/           # header, footer, …
│   ├── motion/           # wrappers animations
│   └── seo/              # JsonLd
├── lib/
│   ├── site-config.ts    # source unique contenu client
│   ├── db/
│   │   ├── site-id.ts    # SITE_ID constant + tbl() helper
│   │   ├── schema.ts     # tables D1 préfixées
│   │   └── index.ts      # getDb() factory
│   ├── auth/             # Better-Auth config
│   ├── schemas/          # Zod
│   ├── seo.ts            # buildMetadata()
│   ├── storage.ts        # R2 helpers
│   ├── image-loader.ts   # custom next/image loader
│   ├── sanitize.ts
│   └── utils.ts          # cn()
├── emails/               # React Email templates
└── middleware.ts         # auth /admin + legacy redirects
```

## Checklist avant livraison

Voir [`PRELAUNCH.md`](./PRELAUNCH.md) — toutes les cases doivent être cochées.

## Documentation client

Voir [`LIVRAISON.md`](./LIVRAISON.md) — remis au client au moment de la mise en ligne.
