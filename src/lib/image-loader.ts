/**
 * Loader custom pour <Image> de Next.js.
 *
 * Pourquoi : l'optimizer Next.js /_next/image consomme du CPU Worker (transformation,
 * KV cache) et fait sauter le free tier rapidement. Pour notre cas (images compressées
 * à l'upload ou servies via R2 custom domain), on bypass complètement → URL servie telle quelle.
 *
 * Conséquences :
 *  - Pas de srcset multi-tailles auto
 *  - Pas de conversion auto AVIF/WebP par Next.js
 *  - Le client doit fournir des images déjà optimisées (compresser à l'upload)
 *
 * Migration vers Cloudflare Images :
 *  - Quand le projet passe sur Workers Paid, remplacer ce loader par un loader CF Images :
 *    return `https://imagedelivery.net/<account-hash>/${src}/w=${width},q=${quality}`;
 */
type LoaderProps = { src: string; width?: number; quality?: number };

export default function imageLoader({ src }: LoaderProps): string {
  return src;
}
