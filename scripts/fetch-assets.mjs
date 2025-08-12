// Internal reproduction authorized by Ferme Solaire
// Simple asset fetcher to mirror homepage assets locally and rewrite paths.
// Usage (manual): `node scripts/fetch-assets.mjs`
// Note: Not executed automatically by Lovable. Provided for completeness.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ASSETS = path.resolve(__dirname, '../public/assets');
const OUT_FONTS = path.resolve(__dirname, '../public/fonts');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function download(url, dest) {
  await ensureDir(path.dirname(dest));
  return new Promise((resolve, reject) => {
    const file = fs.open(dest, 'w');
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirects
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Failed ' + url + ' ' + res.statusCode));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        const buf = Buffer.concat(chunks);
        await fs.writeFile(dest, buf);
        resolve(dest);
      });
    }).on('error', reject);
  });
}

async function main() {
  await ensureDir(OUT_ASSETS);
  await ensureDir(OUT_FONTS);

  const ASSETS = [
    {
      url: 'https://cdn.prod.website-files.com/63be8720f81b056b6775ca28/63cfdd16474592425b7518e3_Home%20Hero.png',
      out: path.join(OUT_ASSETS, 'home-hero.png')
    },
    {
      url: 'https://cdn.prod.website-files.com/63ca74be7d71b6c128d7ac1e/63e611a7b8870e0703058b51_63e60d457589495064407036_Solar%20Energy%20on%20the%20farm-poster-00001.jpeg',
      out: path.join(OUT_ASSETS, 'hero-video-poster.jpeg')
    },
    {
      url: 'https://cdn.prod.website-files.com/63be8720f81b056b6775ca28/63e60d457589495064407036_Solar%20Energy%20on%20the%20farm-transcode.mp4',
      out: path.join(OUT_ASSETS, 'hero-video.mp4')
    }
  ];

  for (const a of ASSETS) {
    console.log('Downloading', a.url);
    await download(a.url, a.out);
  }

  console.log('Assets downloaded to /public/assets');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
