// Checks the site's media before it ships. Runs in CI on every pull request.
//
//   node scripts/check-media.mjs            no metadata in public/media, every consent value valid
//   node scripts/check-media.mjs --launch   also fails while any photo or video still waits for permission
//
// "Metadata" means EXIF/XMP in WebP files and location or device tags in MP4 files: GPS, camera, dates.

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { media } from "../media/media.config.mjs";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "public/media");
const launch = process.argv.includes("--launch");
const problems = [];

// WebP is a RIFF file: walk its chunks and reject EXIF and XMP.
function webpMetadata(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return ["not a WebP file"];
  const found = [];
  for (let at = 12; at + 8 <= buf.length; ) {
    const id = buf.toString("ascii", at, at + 4);
    const size = buf.readUInt32LE(at + 4);
    if (id === "EXIF" || id === "XMP ") found.push(id.trim());
    at += 8 + size + (size % 2);
  }
  return found;
}

// MP4 tags are plain text inside the file: look for the ones phones write.
const mp4Tags = ["©xyz", "ISO6709", "com.apple.quicktime", "location", "©mak", "©mod", "©day"];
function mp4Metadata(buf) {
  const text = buf.toString("latin1");
  return mp4Tags.filter((tag) => text.includes(Buffer.from(tag, "utf8").toString("latin1")));
}

for (const name of readdirSync(dir)) {
  const buf = readFileSync(path.join(dir, name));
  const found = name.endsWith(".webp") ? webpMetadata(buf) : name.endsWith(".mp4") ? mp4Metadata(buf) : ["unexpected file type"];
  if (found.length) problems.push(`public/media/${name}: ${found.join(", ")}`);
}

const consentValues = ["none", "pending", "ok"];
for (const entry of media) {
  if (!consentValues.includes(entry.consent)) problems.push(`${entry.id}: consent must be one of ${consentValues.join(", ")}`);
  if (launch && entry.consent === "pending") problems.push(`${entry.id} (${entry.ref}): waiting for permission from the people in it`);
}

if (problems.length) {
  console.error(`Media check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`Media check passed: ${readdirSync(dir).length} files, ${media.length} entries${launch ? ", all cleared for launch" : ""}.`);
