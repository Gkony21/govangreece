# govangreece.gr

Website for **GO! Van** (drinks & smiles): 360 Video Booth, Mirror Photo Booth, Audio Guestbook and Cocktail Van Bar for events in Laconia, Greece.

Built with Next.js (App Router, static export), TypeScript and Tailwind CSS. Hosted on Cloudflare Pages.

## Development

```bash
npm install      # also enables the git hooks in .githooks/
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
npm run typecheck
```

## Branches and deploys

- `main` is the live site at https://govangreece.gr. It only takes pull requests from `dev`.
- `dev` is the site in progress, at https://dev.govangreece.pages.dev.
- Each change is built on its own branch and opened as a pull request into `dev`. Every branch gets its own Cloudflare Pages preview link.
- CI (`.github/workflows/ci.yml`) runs on every pull request: lint, typecheck, build, and a gitleaks scan of the git history and of the built site.

## Content

Business details (phone, email, social links) live in `lib/site.ts`. Only details the business already publishes belong there.

## What never goes in this repo

The pre-commit hook (`.githooks/pre-commit`) checks these on every commit:

- Secrets: `.env*`, `.dev.vars`, API keys, tokens. They live in the Cloudflare dashboard (and `.dev.vars` locally, which is ignored).
- Original photos and videos. Only optimized WebP files, with metadata (EXIF, GPS) stripped.
- Design sources (`.psd`, `.ai`), client documents, private notes.
- Messages sent through the contact form.
