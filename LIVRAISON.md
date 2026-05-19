# Livraison — PROJECT_NAME

> Document remis au client le jour de la mise en ligne. À conserver précieusement.

## Informations générales

- **Site** : https://PROJECT.fr
- **Mis en ligne le** : `JJ/MM/AAAA`
- **Développeur** : Kevin — fostraceur999@gmail.com
- **Repo GitHub** : `<URL>`

## Comment modifier le contenu du site

### 1. Coordonnées, slogans, navigation

Tout le contenu textuel principal est dans **un seul fichier** : `src/lib/site-config.ts`.

Pour le modifier :

1. Aller sur GitHub → `src/lib/site-config.ts`
2. Cliquer sur l'icône crayon (Edit)
3. Modifier les valeurs entre guillemets (ex: `phone: "06 00 00 00 00"`)
4. Cliquer "Commit changes" en bas
5. **Le site se met à jour automatiquement** en 2–3 min

### 2. Ajouter / modifier une image

1. Préparer l'image :
   - **Format** : WebP ou AVIF (sinon JPG/PNG)
   - **Taille** : max 1920×1080 pour les images hero, 800×600 pour les vignettes
   - **Poids** : < 300 KB idéalement
2. Sur GitHub, aller dans `public/images/` → Add file → Upload files
3. Référencer l'image dans `site-config.ts` ou directement dans le composant
4. Toujours renseigner un texte `alt` descriptif (SEO + accessibilité)

### 3. Publier un article / un projet (si applicable)

`<à compléter selon le projet — back-office, CMS, ou édition fichier>`

### 4. Modifier les mentions légales

Fichier : `src/lib/site-config.ts` → bloc `legal: { ... }`.

## Accès importants

| Service | URL | Compte |
|---|---|---|
| **Cloudflare** | https://dash.cloudflare.com | `<email>` (2FA actif) |
| **Resend** (emails) | https://resend.com | `<email>` |
| **GitHub** (code) | `<URL repo>` | `<username>` |
| **OVH** (domaine) | https://www.ovh.com/manager | `<identifiant>` |
| **Google Search Console** | https://search.google.com/search-console | `<email>` |
| **BetterStack** (monitoring) | https://betterstack.com | `<email>` |
| **Back-office** (si applicable) | https://PROJECT.fr/admin/login | `<email admin>` / mot de passe à changer à la première connexion |

> Conserver ces accès en lieu sûr (gestionnaire de mots de passe type 1Password / Bitwarden).

## Email du site

- Adresse expéditrice transactionnel : `<service>@PROJECT.fr`
- Réception `contact@PROJECT.fr` → forwardée vers `<email client>` via Cloudflare Email Routing
- Délivrabilité monitorée via Resend dashboard

## Sauvegarde

- **Base de données** : sauvegarde manuelle possible à la demande, contacter Kevin
- **Médias R2** : redondés Cloudflare (durabilité 99.999999999%)
- **Code** : versionné sur GitHub

## Procédure d'urgence

### Site cassé / inaccessible

1. Vérifier le statut Cloudflare : https://www.cloudflarestatus.com/
2. Contacter Kevin : fostraceur999@gmail.com / `<téléphone si urgent>`
3. Rollback possible en 30s vers la version précédente (Kevin s'en charge)

### Compromission compte / faille suspectée

1. Changer immédiatement le mot de passe Cloudflare + activer 2FA si pas déjà fait
2. Contacter Kevin pour audit logs et rotation secrets

### Spam / abus formulaire de contact

1. Vérifier les logs Workers Cloudflare
2. Kevin peut activer rate limiting renforcé via WAF en 5 min

## Maintenance

- **Mises à jour techniques** (sécurité, dépendances) : `<incluses dans le forfait / à la demande / non incluses>`
- **Évolutions** (nouvelles fonctionnalités) : devis au cas par cas
- **Support** : `<email / ticket / téléphone — délais de réponse>`

## Contact

**Kevin** — Développeur freelance
fostraceur999@gmail.com

---

*Document généré à la mise en ligne. Pour toute question, n'hésitez pas à me contacter.*
