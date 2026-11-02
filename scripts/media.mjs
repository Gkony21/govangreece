// Builds the site's photos and videos from the originals, which never enter the repo.
//
//   npm run media               rebuild everything listed in media/media.config.mjs
//   npm run media -- hero-van   rebuild only entries whose id starts with "hero-van"
//
// Needs macOS (`sips` decodes iPhone HEIC photos) and ffmpeg. Originals are read from MEDIA_SOURCE,
// default ../photos/drive-2026-10-31 next to the repo. Output: public/media/* and lib/media.ts.
// sharp and ffmpeg write no metadata (EXIF, GPS, camera, dates); scripts/check-media.mjs verifies that.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { media } from "../media/media.config.mjs";

const root = path.resolve(import.meta.dirname, "..");
const source = path.resolve(root, process.env.MEDIA_SOURCE ?? "../photos/drive-2026-10-31");
const outDir = path.join(root, "public/media");
const filters = process.argv.slice(2);
const tmp = mkdtempSync(path.join(tmpdir(), "govan-media-"));

const VIDEO_WIDTH = 540;
const POSTER_QUALITY = 70;

function run(cmd, args) {
  return execFileSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
}

function sourcePath(name) {
  const file = path.join(source, name);
  if (!existsSync(file)) throw new Error(`Original not found: ${file}`);
  return file;
}

// HEIC isn't readable by sharp's bundled libvips, so macOS converts it to a full-quality JPEG first.
function decodable(file) {
  if (!/\.heic$/i.test(file)) return file;
  const out = path.join(tmp, `${path.basename(file)}.jpg`);
  run("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "100", file, "--out", out]);
  return out;
}

function cropBox(width, height, [aw, ah], [fx, fy]) {
  const ratio = aw / ah;
  let w = width;
  let h = Math.round(width / ratio);
  if (h > height) {
    h = height;
    w = Math.round(height * ratio);
  }
  const clamp = (v, max) => Math.min(Math.max(v, 0), max);
  return {
    left: clamp(Math.round(fx * width - w / 2), width - w),
    top: clamp(Math.round(fy * height - h / 2), height - h),
    width: w,
    height: h,
  };
}

async function buildPhoto(entry) {
  // Rotate per the camera's orientation flag first, so crops and blur boxes refer to the photo as seen.
  const { data, info } = await sharp(decodable(sourcePath(entry.src))).rotate().toBuffer({ resolveWithObject: true });
  let image = data;

  if (entry.blur?.length) {
    const layers = await Promise.all(
      entry.blur.map(async ([x, y, w, h]) => {
        const box = {
          left: Math.round(x * info.width),
          top: Math.round(y * info.height),
          width: Math.round(w * info.width),
          height: Math.round(h * info.height),
        };
        const input = await sharp(image).extract(box).blur(Math.max(box.width, box.height) / 6).toBuffer();
        return { input, left: box.left, top: box.top };
      }),
    );
    image = await sharp(image).composite(layers).toBuffer();
  }

  // A region narrows the photo first, e.g. one frame out of a printed photo strip.
  let { width, height } = info;
  if (entry.region) {
    const [x, y, w, h] = entry.region;
    const region = { left: Math.round(x * width), top: Math.round(y * height), width: Math.round(w * width), height: Math.round(h * height) };
    image = await sharp(image).extract(region).toBuffer();
    ({ width, height } = region);
  }

  const box = cropBox(width, height, entry.aspect, entry.focus);
  const cropped = await sharp(image).extract(box).toBuffer();
  // Never upscale: drop widths larger than the crop, and offer the crop's own width instead.
  const widths = entry.widths.filter((w) => w <= box.width);
  if (widths.length < entry.widths.length) widths.push(box.width);

  const files = [];
  for (const w of widths) {
    const name = `${entry.id}-${w}.webp`;
    const out = await sharp(cropped)
      .resize({ width: w })
      .webp({ quality: entry.quality ?? 72, effort: 6 })
      .toFile(path.join(outDir, name));
    files.push({ name, width: out.width, height: out.height });
  }

  const largest = files.at(-1);
  return {
    kind: "photo",
    src: `/media/${files[0].name}`,
    srcSet: files.map((f) => `/media/${f.name} ${f.width}w`).join(", "),
    width: largest.width,
    height: largest.height,
  };
}

function buildVideo(entry) {
  const name = `${entry.id}.mp4`;
  const out = path.join(outDir, name);
  const sources = [entry.src].flat().map(sourcePath);
  const scale = `scale=${VIDEO_WIDTH}:-2,setsar=1,fps=30`;

  const input = [];
  let filter;
  if (sources.length === 1) {
    const [start, length] = entry.trim ?? [0, 6];
    input.push("-ss", String(start), "-t", String(length), "-i", sources[0]);
    filter = ["-vf", scale];
  } else {
    sources.forEach((s) => input.push("-i", s));
    const scaled = sources.map((_, i) => `[${i}:v]${scale}[v${i}]`).join(";");
    const joined = sources.map((_, i) => `[v${i}]`).join("");
    filter = ["-filter_complex", `${scaled};${joined}concat=n=${sources.length}:v=1:a=0[v]`, "-map", "[v]"];
  }

  // Silent (-an), H.264 for every browser, moov atom up front so it starts playing before it has fully loaded.
  // -map_metadata -1 and bitexact drop creation dates, GPS and the camera model.
  run("ffmpeg", [
    "-y", "-v", "error", ...input, ...filter, "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", "-map_metadata", "-1", "-map_chapters", "-1",
    "-fflags", "+bitexact", "-flags:v", "+bitexact", out,
  ]);

  const [width, height] = run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", out])
    .toString()
    .trim()
    .split(",")
    .map(Number);

  const frame = path.join(tmp, `${entry.id}.png`);
  run("ffmpeg", ["-y", "-v", "error", "-i", out, "-frames:v", "1", frame]);
  const poster = `${entry.id}-poster.webp`;
  return sharp(frame)
    .webp({ quality: POSTER_QUALITY, effort: 6 })
    .toFile(path.join(outDir, poster))
    .then(() => ({ kind: "video", src: `/media/${name}`, poster: `/media/${poster}`, width, height }));
}

// The JSON object inside lib/media.ts from the last run.
function readGenerated() {
  const file = path.join(root, "lib/media.ts");
  if (!existsSync(file)) return {};
  const match = readFileSync(file, "utf8").match(/export const media = (\{[\s\S]*\}) as const;/);
  return match ? JSON.parse(match[1]) : {};
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const ids = new Set();
  for (const entry of media) {
    if (ids.has(entry.id)) throw new Error(`Duplicate id: ${entry.id}`);
    ids.add(entry.id);
  }

  const selected = filters.length ? media.filter((e) => filters.some((f) => e.id.startsWith(f))) : media;
  if (selected.length === 0) throw new Error(`No entries match: ${filters.join(", ")}`);

  // A full run starts from an empty folder, so files of removed entries don't linger.
  if (!filters.length) {
    for (const f of readdirSync(outDir)) rmSync(path.join(outDir, f));
  }

  const built = {};
  for (const entry of selected) {
    process.stdout.write(`${entry.id} (${entry.ref})… `);
    built[entry.id] = entry.kind === "video" ? await buildVideo(entry) : await buildPhoto(entry);
    console.log("ok");
  }

  // lib/media.ts lists every entry, so a partial run keeps the others from the previous run.
  const previous = filters.length ? readGenerated() : {};
  const all = {};
  for (const entry of media) {
    const files = built[entry.id] ?? previous[entry.id];
    if (!files) continue;
    all[entry.id] = { ...files, alt: entry.alt, consent: entry.consent };
  }

  writeFileSync(
    path.join(root, "lib/media.ts"),
    `// Generated by scripts/media.mjs from media/media.config.mjs. Do not edit by hand: run \`npm run media\`.\n\n` +
      `export const media = ${JSON.stringify(all, null, 2)} as const;\n\n` +
      `export type MediaId = keyof typeof media;\n`,
  );
}

try {
  await main();
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
