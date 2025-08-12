// Internal reproduction authorized by Ferme Solaire
// Fetch Lottie animations from ferme solaire homepage and save locally.
// Usage: node scripts/fetch-lottie.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/assets/lottie');
const MANIFEST_PATH = path.resolve(__dirname, '../src/data/lottie.json');
const HOMEPAGE = 'https://www.fermesolaire.fr/';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await ensureDir(path.dirname(dest));
  await fs.writeFile(dest, buf);
  return dest;
}

function extractLottieUrls(html) {
  const urls = new Set();
  // 1) Explicit Webflow Lottie blocks
  const reDataSrc = /class=["'][^"']*background-lottie[^"']*["'][^>]*data-src=["']([^"']+?\.json)["']/gim;
  let m;
  while ((m = reDataSrc.exec(html))) urls.add(m[1]);

  // 2) Any *_data.json on Webflow CDN
  const reAnyDataJson = /(https?:\/\/cdn\.prod\.website-files\.com\/[^"'\s>]+?_data\.json)/gim;
  while ((m = reAnyDataJson.exec(html))) urls.add(m[1]);

  return Array.from(urls);
}

async function main() {
  console.log('Fetching homepage:', HOMEPAGE);
  const res = await fetch(HOMEPAGE);
  if (!res.ok) throw new Error(`Failed to fetch homepage: ${res.status}`);
  const html = await res.text();

  const urls = extractLottieUrls(html);
  if (urls.length === 0) {
    console.warn('No Lottie URLs found. If this persists, inspect the homepage for updated selectors.');
    // still write a manifest pointing to expected path so code compiles
    await ensureDir(path.dirname(MANIFEST_PATH));
    await fs.writeFile(MANIFEST_PATH, JSON.stringify({ cable: '/assets/lottie/cable.json' }, null, 2));
    return;
  }

  // Pick first as "cable"
  const cableUrl = urls[0];
  const outPath = path.join(OUT_DIR, 'cable.json');
  console.log('Downloading Lottie:', cableUrl);
  await download(cableUrl, outPath);

  await ensureDir(path.dirname(MANIFEST_PATH));
  await fs.writeFile(MANIFEST_PATH, JSON.stringify({ cable: '/assets/lottie/cable.json' }, null, 2));
  console.log('Manifest written to src/data/lottie.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
