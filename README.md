# Danova Renovations

Marketing website for Danova Renovations - premium paint, flooring, and renovation services in Fort Lauderdale and Miami, Florida.

## Git LFS (Images)

Images (JPG, PNG, GIF, WebP, SVG) are stored with [Git LFS](https://git-lfs.com/) to keep the repo lean.

**First-time setup:**
```bash
brew install git-lfs
git lfs install
```

**Clone with LFS files:**
```bash
git clone <repo-url>
git lfs pull
```

**Migrate existing images to LFS** (run once to convert images already in the repo):
```bash
./scripts/migrate-to-lfs.sh
# Or with history rewrite: ./scripts/migrate-to-lfs.sh --rewrite-history
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Fonts**: Playfair Display, Source Sans 3

## Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `web/danova/app/` - Next.js App Router pages
- `web/danova/components/` - React components (layout, home, shared, ui)
- `web/danova/lib/` - Constants, content, utilities

## Build

```bash
cd web
npm run build
npm start
```

## SEO & AI Bots

- Structured data (LocalBusiness, FAQPage, Article)
- Sitemap at `/sitemap.xml`
- robots.txt allows Googlebot and OAI-SearchBot
