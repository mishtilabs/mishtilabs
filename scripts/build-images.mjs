// Build-time image optimizer.
//
// Fetches each remote source image once (picsum, Unsplash) and converts it
// to a small, optimized WebP saved under `public/img/...`. Run via
// `npm run build-images` BEFORE deploy. Output is checked into git so
// the live site never has to hit a third-party CDN at runtime.
//
// Usage:   npm run build-images          # fetch + convert all
//          npm run build-images -- --force  # re-download even if cached

import { mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "img");

const force = process.argv.includes("--force");

// --- Manifest of every image we want pre-generated -----------------

// Re-derive the same picsum URL pattern used in src/lib/products.ts
const productSeed = (seed) => `https://picsum.photos/seed/mishti-${seed}/1200/900`;

// Mirrors the seeds used in src/lib/products.ts. Files are saved BY SEED
// (e.g. products/pravah-crm.webp) so the runtime img() helper in products.ts
// only needs a one-line URL change.
const PRODUCT_SEEDS = [
  "pravah-crm",
  "flowlife-finance",
  "growright-baby",
  "wedding-mandap",
  "mehfil-events",
  "kirana-store",
  "vidya-classroom",
  "vaidya-health",
  "annapurna-food",
  "paribar-family",
  "yatra-travel",
  "mandi-farm",
  "lekha-invoice",
  "sangrah-vault",
  "dhwani-podcast",
  "roshni-home",
  "chitra-photos",
  "charcha-team",
  "bandhan-hr",
  "niyam-legal",
  "sahaj-build",
  "tarang-sports",
  "drishti-vision",
  "vimaan-logistics",
  "kavya-writers",
  "mela-market",
  "suraksha-secure",
  "shilp-portfolio",
];

const STUDIO = [
  {
    out: "studio/team-coding",
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85",
    width: 800,
    aspect: 0.8, // 4:5 portrait
  },
  {
    out: "studio/designers",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    width: 800,
    aspect: 1.25, // 5:4
  },
  {
    out: "studio/engineers",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85",
    width: 720,
    aspect: 0.83, // 5:6
  },
];

const TESTIMONIAL_AVATARS = [
  ["aarav",  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85"],
  ["priya",  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=85"],
  ["hannah", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=85"],
  ["daniel", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=85"],
  ["rhea",   "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=85"],
  ["vikram", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=85"],
];

// --- Helpers --------------------------------------------------------

async function fetchBuffer(url) {
  const r = await fetch(url, { redirect: "follow" });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

async function ensureDir(p) {
  await mkdir(path.dirname(p), { recursive: true });
}

async function alreadyExists(absPath) {
  try {
    return (await stat(absPath)).size > 0;
  } catch {
    return false;
  }
}

async function processOne({ src, out, width, height }) {
  const absWebp = path.join(OUT_DIR, out + ".webp");
  if (!force && (await alreadyExists(absWebp))) {
    return { out, skipped: true };
  }
  const buf = await fetchBuffer(src);
  let img = sharp(buf, { failOn: "none" });
  if (width || height) {
    img = img.resize(width, height, { fit: "cover", position: "attention" });
  }
  const webp = await img.clone().webp({ quality: 78, effort: 5 }).toBuffer();
  await ensureDir(absWebp);
  await writeFile(absWebp, webp);
  return { out, bytes: webp.length };
}

// --- Main -----------------------------------------------------------

const tasks = [
  // Product cards — 800×600 webp, saved by seed string.
  ...PRODUCT_SEEDS.map((seed) => ({
    src: productSeed(seed),
    out: `products/${seed}`,
    width: 800,
    height: 600,
  })),
  // Studio collage — variable sizes
  ...STUDIO.map((s) => ({
    src: s.src,
    out: s.out,
    width: s.width,
    height: Math.round(s.width / s.aspect),
  })),
  // Testimonial avatars — 200×200 (rendered at 44×44, but retina)
  ...TESTIMONIAL_AVATARS.map(([id, src]) => ({
    src,
    out: `testimonials/${id}`,
    width: 200,
    height: 200,
  })),
];

console.log(`[build-images] Processing ${tasks.length} images → ${path.relative(ROOT, OUT_DIR)}/`);
console.log(`[build-images] ${force ? "Force mode (re-downloading all)" : "Cached files will be skipped"}`);

let done = 0, skipped = 0, totalBytes = 0;
const errors = [];

// Run with a small concurrency cap so we don't hammer the source CDNs.
const CONCURRENCY = 4;
const queue = [...tasks];
async function worker() {
  while (queue.length) {
    const task = queue.shift();
    try {
      const r = await processOne(task);
      if (r.skipped) {
        skipped++;
        process.stdout.write(`·`);
      } else {
        done++;
        totalBytes += r.bytes;
        process.stdout.write(`✓`);
      }
    } catch (err) {
      errors.push({ task, message: err.message });
      process.stdout.write(`✗`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
process.stdout.write("\n");

console.log(
  `[build-images] Done · ${done} fetched · ${skipped} skipped · ${(totalBytes / 1024).toFixed(1)} KB written`
);
if (errors.length) {
  console.error(`[build-images] ${errors.length} errors:`);
  for (const e of errors) console.error(`  · ${e.task.out}: ${e.message}`);
  process.exit(1);
}
