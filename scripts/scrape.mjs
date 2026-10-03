/**
 * Pulls the live catalog from the Shopify storefront JSON endpoints into
 * src/data/catalog.json. Re-run with `npm run scrape` whenever the store changes.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SHOP = process.env.SHOP_ORIGIN ?? 'https://www.thekskinstudio.com'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'src/data/catalog.json')
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131 Safari/537.36'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getJSON(path, attempt = 0) {
  try {
    const res = await fetch(`${SHOP}${path}`, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`)
    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    if (attempt >= 4) {
      console.warn(`  ! giving up on ${path}: ${err.message}`)
      return null
    }
    await sleep(600 * 2 ** attempt)
    return getJSON(path, attempt + 1)
  }
}

/** Walks a `?page=N` paginated endpoint until it returns an empty array. */
async function paginate(path, key, max = 40) {
  const all = []
  for (let page = 1; page <= max; page++) {
    const sep = path.includes('?') ? '&' : '?'
    const data = await getJSON(`${path}${sep}limit=250&page=${page}`)
    const batch = data?.[key]
    if (!Array.isArray(batch) || batch.length === 0) break
    all.push(...batch)
    if (batch.length < 250) break
    await sleep(120)
  }
  return all
}

/** Runs `worker` over `items` with a bounded number of in-flight requests. */
async function pool(items, limit, worker) {
  const out = new Array(items.length)
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++
        out[i] = await worker(items[i], i)
      }
    }),
  )
  return out
}

const money = (v) => (v == null ? null : Number(v))

function trimProduct(p) {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    type: p.product_type || '',
    tags: p.tags ?? [],
    publishedAt: p.published_at,
    descriptionHtml: p.body_html ?? '',
    options: (p.options ?? []).map((o) => ({ name: o.name, values: o.values })),
    images: (p.images ?? []).map((img) => ({
      src: img.src,
      width: img.width,
      height: img.height,
      alt: img.alt ?? null,
    })),
    variants: (p.variants ?? []).map((v) => ({
      id: v.id,
      title: v.title,
      sku: v.sku ?? null,
      price: money(v.price),
      compareAtPrice: money(v.compare_at_price),
      available: v.available !== false,
      options: [v.option1, v.option2, v.option3].filter(Boolean),
      featuredImage: v.featured_image?.src ?? null,
    })),
  }
}

async function main() {
  console.log(`Scraping ${SHOP} ...`)

  const rawProducts = await paginate('/products.json', 'products')
  console.log(`  products: ${rawProducts.length}`)

  const rawCollections = await paginate('/collections.json', 'collections')
  console.log(`  collections: ${rawCollections.length}`)

  const known = new Set(rawProducts.map((p) => p.handle))

  // Collection membership is only exposed per collection, so fan out.
  const extras = new Map()
  const memberships = await pool(rawCollections, 6, async (c, i) => {
    if (i % 20 === 0) console.log(`  membership ${i}/${rawCollections.length}`)
    const items = await paginate(`/collections/${c.handle}/products.json`, 'products', 12)
    for (const p of items) if (!known.has(p.handle)) extras.set(p.handle, p)
    return items.map((p) => p.handle)
  })

  // /products.json omits unpublished-to-online-store items that collections still list.
  if (extras.size) {
    console.log(`  + ${extras.size} products found only via collections`)
    rawProducts.push(...extras.values())
  }

  const products = rawProducts.map(trimProduct)
  const byHandle = new Map(products.map((p) => [p.handle, p]))

  const collections = rawCollections.map((c, i) => ({
    id: c.id,
    handle: c.handle,
    title: c.title,
    description: c.description ?? '',
    image: c.image?.src ?? null,
    productHandles: (memberships[i] ?? []).filter((h) => byHandle.has(h)),
  }))

  const catalog = {
    shop: SHOP,
    scrapedAt: new Date().toISOString(),
    currency: 'PKR',
    products: products.sort((a, b) => a.title.localeCompare(b.title)),
    collections: collections.sort((a, b) => a.title.localeCompare(b.title)),
  }

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(catalog, null, 1))
  const withProducts = collections.filter((c) => c.productHandles.length).length
  console.log(`Wrote ${OUT}`)
  console.log(`  ${products.length} products, ${collections.length} collections (${withProducts} non-empty)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
