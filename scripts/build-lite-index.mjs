/**
 * Derives a slim, client-safe index from catalog.json.
 * The full catalog is ~1.7MB and must never reach the browser bundle; the
 * drawers, search page and cart only need titles, prices and one thumbnail.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'src/data/catalog.json')
const OUT = resolve(ROOT, 'src/data/catalog-lite.json')

const catalog = JSON.parse(await readFile(SRC, 'utf8'))

/** Drop the `?v=` cache buster; `cdnImage()` re-adds the width param. */
const thumb = (src) => (src ? src.split('?')[0] : null)

const products = catalog.products.map((p) => ({
  h: p.handle,
  t: p.title,
  y: p.type || '',
  g: p.tags ?? [],
  i: thumb(p.images[0]?.src),
  v: p.variants.map((v) => ({
    id: v.id,
    t: v.title,
    p: v.price,
    c: v.compareAtPrice,
    a: v.available,
    i: thumb(v.featuredImage),
  })),
}))

await writeFile(OUT, JSON.stringify({ products }))

const bytes = JSON.stringify({ products }).length
console.log(`Wrote ${OUT} — ${products.length} products, ${(bytes / 1024).toFixed(0)} KB`)
