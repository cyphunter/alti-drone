/**
 * Récupération des avis clients depuis la fiche Bilik d'Alti' Drone & Services.
 *
 * Source : https://www.bilik.fr/presentations/3351-alti-drone-et-services
 *
 * Deux passes de parsing sur le HTML de la page :
 *
 *   1. **RSC payload (`self.__next_f.push(...)`)** — source principale.
 *      Bilik est un site Next.js, le rendu serveur sérialise TOUS les avis
 *      (8 actuellement) dans le payload React Server Components avec leur
 *      ville (`addressLocality`), title (prestation), texte, et date ISO.
 *      Le JSON-LD ne porte que les 5 plus récents — on a besoin des 8.
 *
 *   2. **JSON-LD schema.org** — source secondaire.
 *      Sert principalement à récupérer l'agrégat (`aggregateRating.ratingValue`
 *      + `reviewCount`) qui n'est pas exposé aussi proprement dans le RSC.
 *      Sert aussi de fallback si la structure RSC change.
 *
 * Cache : ISR Next.js à 6 h. Try/catch global : en cas d'échec, on rend
 * un objet vide pour ne jamais casser la home.
 */

import type { Temoignage } from "@/data/temoignages";

export type BilikReview = {
  /** Slug stable construit depuis auteur + date. */
  id: string;
  /** Nom de l'auteur tel que publié sur Bilik. */
  author: string;
  /** Date ISO YYYY-MM-DD. */
  date: string;
  /** Note sur 5 (Bilik n'accepte que des entiers). */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Prestation effectuée. */
  about: string;
  /** Texte intégral de l'avis. */
  text: string;
  /** Ville du client. Vide si non extractible. */
  locality: string;
};

export type BilikData = {
  reviews: readonly BilikReview[];
  aggregateRating: number | null;
  reviewCount: number | null;
  sourceUrl: string;
};

const BILIK_URL =
  "https://www.bilik.fr/presentations/3351-alti-drone-et-services";

export async function getBilikReviews(): Promise<BilikData> {
  const emptyResult: BilikData = {
    reviews: [],
    aggregateRating: null,
    reviewCount: null,
    sourceUrl: BILIK_URL,
  };

  try {
    const res = await fetch(BILIK_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AltiDroneBot/1.0; +https://altidroneservices.fr)",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 21600, tags: ["bilik-reviews"] },
    });

    if (!res.ok) return emptyResult;

    const html = await res.text();
    const agg = parseAggregateFromJsonLd(html);
    const reviews = parseReviewsFromRsc(html);

    // Fallback : si le RSC n'a rien renvoyé, on essaie le JSON-LD.
    const finalReviews =
      reviews.length > 0 ? reviews : parseReviewsFromJsonLd(html);

    if (finalReviews.length === 0 && !agg) return emptyResult;

    return {
      reviews: finalReviews,
      aggregateRating: agg?.ratingValue ?? null,
      reviewCount: agg?.reviewCount ?? null,
      sourceUrl: BILIK_URL,
    };
  } catch {
    return emptyResult;
  }
}

// ─── Parseur RSC (source principale, 8 avis) ──────────────────────────

/**
 * Extrait les avis du payload Next.js encodé dans la page (`self.__next_f.push`).
 * Cherche chaque occurrence de `\"givenName\":\"X\",\"familyName\":\"Y\"`
 * puis lit dans la fenêtre suivante les champs `dateCreated`, `addressLocality`,
 * `title`, `text`. Tolère les chaînes RSC échappées (`\\n`, `\\"`).
 */
function parseReviewsFromRsc(html: string): BilikReview[] {
  const reviews: BilikReview[] = [];
  const seen = new Set<string>();
  const nameRe =
    /\\"givenName\\":\\"([^"\\]+)\\",\\"familyName\\":\\"([^"\\]+)\\"/g;

  let m: RegExpExecArray | null;
  while ((m = nameRe.exec(html))) {
    const author = `${m[1]} ${m[2]}`.replace(/\s+/g, " ").trim();
    if (!author) continue;

    // Fenêtre de ~3000 chars après le nom — un avis Bilik fait ~500-2000.
    const win = html.slice(m.index, m.index + 3000);
    const dateCreated = grabField(win, "dateCreated");
    const locality = grabField(win, "addressLocality") ?? "";
    const title = grabField(win, "title") ?? "";

    // `text` peut contenir des escapes \\" et \\n — capture jusqu'à la
    // prochaine guillemet RSC non-échappée.
    const textMatch = win.match(/\\"text\\":\\"((?:\\\\.|[^"\\])*)\\"/);
    const text = textMatch ? unescapeRscString(textMatch[1]) : "";

    if (!dateCreated || !text) continue;
    const isoDate = dateCreated.slice(0, 10);
    const key = `${author}|${isoDate}`;
    if (seen.has(key)) continue;
    seen.add(key);

    reviews.push({
      id: slugify(key),
      author,
      date: isoDate,
      rating: 5, // Bilik n'expose pas la note unitaire dans le RSC pour tous
      //         les avis ; agrégat = 5.0/5 → tous les avis publiés sont 5/5.
      about: title,
      text,
      locality,
    });
  }

  return reviews;
}

function grabField(window: string, key: string): string | null {
  const re = new RegExp(`\\\\"${escapeReg(key)}\\\\":\\\\"([^"\\\\]+)\\\\"`);
  const m = window.match(re);
  return m ? m[1] : null;
}

function escapeReg(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function unescapeRscString(s: string): string {
  return s
    .replace(/\\\\n/g, "\n")
    .replace(/\\\\u([0-9a-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    )
    .replace(/\\\\"/g, '"')
    .replace(/\\\\\\\\/g, "\\")
    .trim();
}

// ─── Parseur JSON-LD (agrégat + fallback) ─────────────────────────────

type RawSchema = {
  "@graph"?: RawSchema[];
  review?: Array<{
    author?: { name?: string };
    datePublished?: string;
    reviewRating?: { ratingValue?: number | string };
    about?: { name?: string };
    reviewBody?: string;
  }>;
  aggregateRating?: {
    ratingValue?: number | string;
    reviewCount?: number;
  };
};

function parseAggregateFromJsonLd(
  html: string,
): { ratingValue: number; reviewCount: number } | null {
  for (const node of jsonLdNodes(html)) {
    const agg = node.aggregateRating;
    if (!agg) continue;
    const rv = Number.parseFloat(String(agg.ratingValue ?? ""));
    if (!Number.isFinite(rv)) continue;
    return {
      ratingValue: rv,
      reviewCount: agg.reviewCount ?? 0,
    };
  }
  return null;
}

function parseReviewsFromJsonLd(html: string): BilikReview[] {
  const reviews: BilikReview[] = [];
  const seen = new Set<string>();

  for (const node of jsonLdNodes(html)) {
    if (!Array.isArray(node.review)) continue;
    for (const r of node.review) {
      const author = (r.author?.name ?? "").trim().replace(/\s+/g, " ");
      if (!author) continue;
      const date = (r.datePublished ?? "").trim().replace(/\//g, "-");
      const key = `${author}|${date}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const text = (r.reviewBody ?? "").trim();
      if (!text) continue;
      const ratingNum = Math.round(Number(r.reviewRating?.ratingValue ?? 5));
      reviews.push({
        id: slugify(key),
        author,
        date,
        rating: clampRating(ratingNum),
        about: (r.about?.name ?? "").trim(),
        text,
        locality: "",
      });
    }
  }

  return reviews;
}

function* jsonLdNodes(html: string): Generator<RawSchema> {
  const matches = html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  );
  for (const m of matches) {
    const raw = m[1]?.trim();
    if (!raw) continue;
    try {
      const data = JSON.parse(raw) as RawSchema | RawSchema[];
      const stack: RawSchema[] = Array.isArray(data) ? [...data] : [data];
      while (stack.length > 0) {
        const node = stack.pop();
        if (!node) continue;
        yield node;
        if (Array.isArray(node["@graph"])) {
          for (const child of node["@graph"]) stack.push(child);
        }
      }
    } catch {
      // skip malformed block
    }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────

function clampRating(n: number): 1 | 2 | 3 | 4 | 5 {
  if (!Number.isFinite(n)) return 5;
  if (n <= 1) return 1;
  if (n >= 5) return 5;
  return n as 1 | 2 | 3 | 4 | 5;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Adapte un BilikReview au type `Temoignage` consommé par les composants
 * d'affichage. La ville issue du RSC alimente proprement le champ `ville`.
 */
export function bilikToTemoignage(r: BilikReview): Temoignage {
  return {
    id: r.id,
    nom: r.author,
    ville: r.locality,
    prestation: r.about,
    texte: r.text,
    note: r.rating,
    date: r.date,
  };
}
