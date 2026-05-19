import sanitizeHtml from "sanitize-html";

/**
 * Sanitize du HTML utilisateur AVANT stockage ou affichage `dangerouslySetInnerHTML`.
 * Whitelist conservative — adapter selon besoin éditorial.
 */
export function sanitize(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s",
      "ul", "ol", "li",
      "h2", "h3", "h4",
      "a", "blockquote", "code", "pre",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
          target: attribs.target ?? "_blank",
        },
      }),
    },
  });
}

/** Strip total → texte brut, pour previews / OG description. */
export function stripHtml(input: string): string {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
}
