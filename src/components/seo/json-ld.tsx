import type { Thing, WithContext } from "schema-dts";

/**
 * Composant JSON-LD typé avec schema-dts.
 * Usage :
 *   <JsonLd schema={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */
export function JsonLd<T extends Thing>({ schema }: { schema: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      // schema-dts garantit la structure → safe à inject
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
