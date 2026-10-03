# Kskinstudio — Next.js rebuild

A Next.js 16 (App Router) rebuild of **thekskinstudio.com**, the Shopify storefront.
Same information architecture, same design system, same section order — rendered
from a locally scraped snapshot of the store's own catalog.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 677 prerendered pages
```

## What's here

| Route | Notes |
| --- | --- |
| `/` | All 17 homepage sections, in the live theme's order |
| `/collections` | Index of every non-empty collection |
| `/collections/[handle]` | 163 collections (incl. virtual `all`), with sort + filters |
| `/products/[handle]` | 495 products — gallery, variants, related, JSON-LD |
| `/brands` | A–Z brand index with letter jump-nav |
| `/search` | Server-rendered results; drawer search is client-side |
| `/cart`, `/checkout` | Local cart; checkout is a stub (see below) |
| `/pages/contact` | Contact form + FAQ |
| `/policies/[slug]` | 5 policy pages |
| `/sitemap.xml`, `/robots.txt` | Generated from the catalog |

Plus: sticky header with hover mega menu, mobile drawer nav, cart drawer with a
free-shipping progress bar, search drawer with live suggestions, quick view,
newsletter popup, and scroll-reveal animations.

## Data

The catalog is a **snapshot**, not a live connection. Two scripts own it:

```bash
npm run scrape   # re-pull the catalog, then rebuild the client index
npm run index    # rebuild only the client index from catalog.json
```

- `scripts/scrape.mjs` pulls `/products.json`, `/collections.json` and each
  collection's membership from the storefront's public JSON endpoints into
  `src/data/catalog.json` (~1.7 MB). Point it elsewhere with `SHOP_ORIGIN=…`.
- `scripts/build-lite-index.mjs` derives `src/data/catalog-lite.json` (~207 KB).

**Why two files.** `catalog.json` is server-only — importing it from a client
component would ship 1.7 MB to the browser. Anything running in the browser
(cart drawer, search drawer) reads the lite index via `src/lib/catalog-lite.ts`;
server components use the full catalog via `src/lib/catalog.ts`. Keep that split.

Images are served from the store's own Shopify CDN, allow-listed in
`next.config.ts` and sized through `cdnImage()`. Nothing is copied into `public/`.

## Going live

Three things are deliberately stubbed, because a static snapshot can't do them:

1. **Checkout** (`/checkout`) — create a cart with the Shopify Storefront API and
   redirect to its `checkoutUrl`.
2. **Accounts** (`/account`) — wire to Shopify customer accounts or your own auth.
3. **Forms** — the newsletter and contact forms resolve optimistically in local
   state; point them at your ESP and inbox.

For a genuinely live catalog, swap `src/lib/catalog.ts` for Storefront API calls.
Every page reads the catalog through that one module, so the page components
should not need to change.

## Content

Product copy, imagery and store text belong to the merchant and are reused here
with the store owner's authorization. Policy page copy in `src/data/policies.ts`
is placeholder text — replace it with the merchant's reviewed wording before
launch.

## Layout parity

Measured against the live site at 1440px: logo 165×165, nav origin x≈240,
DM Sans throughout, accent `#d63a2f`, 1700px page width, 2.4rem pill buttons,
2rem card radius. Tokens live in `src/app/globals.css`.
