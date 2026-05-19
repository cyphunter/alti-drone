#!/usr/bin/env node
/**
 * Télécharge les images du site existant (assets.zyrosite.com) vers public/images/.
 *
 * À exécuter UNE FOIS au setup du projet, puis manuellement quand le client
 * fournit de nouvelles photos. Les URLs sont extraites depuis le HTML scrapé
 * de altidroneservices.fr — adapter le tableau ASSETS si les images changent.
 *
 * Usage :
 *   npm run download-assets
 *
 * Les images sont servies en attendant via le CSP "img-src https://assets.zyrosite.com"
 * (cf. next.config.ts). Ce script permet de les rapatrier pour ne plus dépendre du CDN tiers.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "images");

const ZYROSITE = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=cover";

const ASSETS = [
  // (id, sous-dossier, taille, sourceUrl)
  ["hero-action", "hero", 1920, `${ZYROSITE},w=1920/mp84wMEb64sEBBPm/651763254_122117680869200770_3613438175520487822_n-WMxVxRSE1FxEGg2s.jpg`],
  ["toit-demoussage-1", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-d-a-c-cran-2026-03-05-222401-GrxtPltUu42uJVQB.png`],
  ["toit-demoussage-2", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-d-a-c-cran-2026-04-14-112856-WplduuVNBL3vCmrQ.png`],
  ["tuiles-chantier", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-01-28-174341-z34EuHSC98sSnwU3.png`],
  ["facade-bardage", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-01-28-175110-MWdwgwDYc4yvHDlc.png`],
  ["panneaux-solaires", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-02-02-211613-wimvbLqbIONn0xBE.png`],
  ["drone-vol", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/mvimg_20260320_100705-XVhSEnDOjFS7Ofxi.jpg`],
  ["inspection", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/mvimg_20260317_104713-sOgFwhM17kUCYQlu.jpg`],
  ["panneaux-resultat", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-05-02-151541-j1l8OuJa2bZ50D7T.png`],
  ["chantier-particulier", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-05-02-151709-dsycTxore7U0eOK9.png`],
  ["tuiles-zoom", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-03-13-133611-3AWiULQ17Q8g4uPV.png`],
  ["chantier-bardage", "galerie", 1440, `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/1000013801-WzTHv0jJNDHDcg21.jpg`],
];

async function downloadOne(id, subdir, _size, url) {
  const ext = url.includes(".jpg") ? "jpg" : "png";
  const filename = `${id}.${ext}`;
  const outPath = join(OUT_DIR, subdir, filename);
  await mkdir(dirname(outPath), { recursive: true });

  process.stdout.write(`→ ${subdir}/${filename} … `);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB`);
    return { id, ok: true, size: buf.length };
  } catch (err) {
    console.log(`✗ ${err.message}`);
    return { id, ok: false, error: err.message };
  }
}

async function main() {
  console.log(`Téléchargement de ${ASSETS.length} images vers public/images/\n`);
  const results = [];
  for (const asset of ASSETS) {
    results.push(await downloadOne(...asset));
  }

  const ok = results.filter((r) => r.ok).length;
  const ko = results.length - ok;
  const totalSize = results.reduce((s, r) => s + (r.size || 0), 0);
  console.log(`\nTerminé : ${ok} OK, ${ko} échec(s) — total ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

  if (ko > 0) {
    console.log(
      "\nNote : certaines images n'ont pas pu être téléchargées. Si le site source est toujours actif,\nle CSP de next.config.ts autorise déjà assets.zyrosite.com en remoteImage, donc les <Image>\nfonctionnent même sans rapatriement local.",
    );
  } else {
    console.log(
      "\nÉtape suivante (optionnelle) : convertir en WebP optimisé via un outil externe\n(squoosh-cli, sharp en script séparé, ou imagemagick). Cibler < 200 KB par image pour\nle bundle initial.",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
