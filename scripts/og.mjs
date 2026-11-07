// Builds public/og.jpg, the picture shown when a link to the site is shared (Viber, WhatsApp, Facebook...): 1200x630,
// the night-purple of the site with the logo, three photos printed like the booth's prints, and the party around them:
// fairy lights, neon signs and sparkles, as on the site. No text, so it serves both languages.
//
//   node scripts/og.mjs                 → public/og.jpg
//   node scripts/og.mjs <dir> <variant> → <dir>/og-<variant>.jpg, to compare variants (lights, neon, full)
//
// The photos are the client's originals (macOS, for HEIC), from MEDIA_SOURCE or ../photos/drive-2026-10-31, as in
// scripts/media.mjs. The output has no metadata (no EXIF, no GPS).
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.resolve(root, process.env.MEDIA_SOURCE ?? "../photos/drive-2026-10-31");
const tmp = mkdtempSync(path.join(tmpdir(), "govan-og-"));
const [outDir, variant = "full"] = process.argv.slice(2);
const out = outDir ? path.join(outDir, `og-${variant}.jpg`) : path.join(root, "public/og.jpg");
const W = 1200;
const H = 630;

// The three prints: file, vertical focus (0 top, 1 bottom), tilt, and where its centre sits.
const prints = [
  { src: "IMG_2799.heic", fy: 0.55, deg: -8, x: 690, y: 330 }, // the van at sunset
  { src: "IMG_9642.HEIC", fy: 0.5, deg: 3, x: 865, y: 300 }, // the 360 platform with the neon heart
  { src: "IMG_4292.HEIC", fy: 0.5, deg: 9, x: 1040, y: 335 }, // the van's bar at night
];

function jpeg(file) {
  const full = path.join(source, file);
  const target = path.join(tmp, `${file}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", full, "--out", target], { stdio: "ignore" });
  return target;
}

// A photo cut to 3:4, in a white border with a deeper bottom, tilted: like a print from the booth.
async function print({ src, fy, deg }) {
  const photo = await sharp(jpeg(src)).rotate().toBuffer();
  const { width, height } = await sharp(photo).metadata();
  const h = Math.min(height, Math.round((width * 4) / 3));
  const top = Math.max(0, Math.min(height - h, Math.round(fy * height - h / 2)));
  const cut = await sharp(photo).extract({ left: 0, top, width, height: h }).resize(228, 304).toBuffer();
  const framed = await sharp(cut).extend({ top: 11, bottom: 36, left: 11, right: 11, background: "#fbf5ff" }).png().toBuffer();
  return sharp(framed).rotate(deg, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

// Strings of warm bulbs sagging across the top, and two short ones low in the corners. Whole bulbs only.
function lights() {
  const strand = (x0, y0, x1, y1, sag, r, step) => {
    const bulbs = [];
    const n = Math.round(Math.hypot(x1 - x0, y1 - y0) / step);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t + sag * 4 * t * (1 - t);
      if (x < r || x > W - r || y < r) continue;
      bulbs.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#fff3d6" filter="url(#bulb)"/>`);
    }
    const mid = (x0 + x1) / 2;
    const wire = `<path d="M${x0} ${y0} Q${mid} ${(y0 + y1) / 2 + sag * 2} ${x1} ${y1}" stroke="#2c2245" stroke-width="1.5" fill="none"/>`;
    return wire + bulbs.join("");
  };
  return [
    strand(-40, 8, W + 40, 8, 70, 4, 46),
    strand(-40, -6, W + 40, -6, 120, 3, 38),
  ].join("");
}

// The site's neon signs (components/NeonSign.tsx): white tubes with a coloured halo.
const tubes = {
  cocktail: ["M24 40 H164 L94 120 Z", "M52 62 H136", "M94 120 V188", "M58 198 Q94 184 130 198", "M186 40 A24 24 0 1 1 138 40 A24 24 0 1 1 186 40", "M162 24 V56 M148.1 32 L175.9 48 M148.1 48 L175.9 32"],
  heart: ["M100 172 C54 140 22 110 22 76 C22 50 42 30 66 30 C82 30 94 40 100 54 C106 40 118 30 134 30 C158 30 178 50 178 76 C178 110 146 140 100 172 Z"],
};

function neon(kind, x, y, scale, halo, deg = 0) {
  const paths = tubes[kind].map((d) => `<path d="${d}"/>`).join("");
  const g = (filter, width, colour) =>
    `<g transform="translate(${x} ${y}) rotate(${deg}) scale(${scale})" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" filter="${filter}">${paths}</g>`;
  return g("url(#halo)", 12, halo) + g("url(#tube)", 5, "#fff4fd");
}

// Four-point sparkles and a few dots of light, like the sparkles on the site's signs.
function sparkles() {
  const star = (x, y, s, o) =>
    `<path d="M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z" fill="#fbf5ff" opacity="${o}" filter="url(#tube)"/>`;
  const dot = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="0.8" filter="url(#tube)"/>`;
  return [
    star(520, 120, 16, 0.9), star(560, 560, 11, 0.8), star(1150, 560, 13, 0.85), star(60, 560, 10, 0.7), star(590, 470, 8, 0.7),
    dot(545, 210, 3, "#d58cff"), dot(110, 120, 2.5, "#ffd38a"), dot(1160, 150, 3, "#d58cff"), dot(420, 585, 2.5, "#ff8ad8"), dot(640, 600, 2, "#ffd38a"),
  ].join("");
}

function overlay(kind) {
  const withLights = kind !== "neon";
  const withNeon = kind !== "lights";
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
  <filter id="bulb" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="tube" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="halo" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>
${withLights ? lights() : ""}
${withNeon ? neon("cocktail", 40, 440, 0.62, "#d58cff", -8) + neon("heart", 450, 455, 0.45, "#ff6fd2", 10) : ""}
${sparkles()}
</svg>`);
}

// The night background: deep purple with a violet glow behind the logo and a warmer one behind the prints.
const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
  <radialGradient id="a" cx="0.25" cy="0.52" r="0.42"><stop offset="0" stop-color="#5a2f96"/><stop offset="0.55" stop-color="#2b1850" stop-opacity="0.9"/><stop offset="1" stop-color="#120c22" stop-opacity="0"/></radialGradient>
  <radialGradient id="b" cx="0.72" cy="0.55" r="0.4"><stop offset="0" stop-color="#3b1e5c"/><stop offset="1" stop-color="#120c22" stop-opacity="0"/></radialGradient>
</defs>
<rect width="100%" height="100%" fill="#120c22"/><rect width="100%" height="100%" fill="url(#b)"/><rect width="100%" height="100%" fill="url(#a)"/>
</svg>`);

const logo = await sharp(path.join(root, "public/logo.webp")).resize(380, 380).png().toBuffer();
const layers = [{ input: overlay(variant), left: 0, top: 0 }, { input: logo, left: 100, top: 128 }];
for (const p of prints) {
  const img = await print(p);
  const { width, height } = await sharp(img).metadata();
  layers.push({ input: img, left: Math.round(p.x - width / 2), top: Math.round(p.y - height / 2) });
}

await sharp(background).composite(layers).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
console.log(`Wrote ${path.relative(process.cwd(), out)}`);
