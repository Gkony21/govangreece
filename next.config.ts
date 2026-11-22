import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to `out/`, which Cloudflare Pages serves.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // app/global-not-found.tsx: one 404 page for both root layouts (Greek and English).
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
