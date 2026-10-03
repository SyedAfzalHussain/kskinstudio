import catalogJson from '@/data/catalog.json'
import type { Catalog, Collection, Product } from './types'

const catalog = catalogJson as unknown as Catalog

const productsByHandle = new Map(catalog.products.map((p) => [p.handle, p]))
const collectionsByHandle = new Map(catalog.collections.map((c) => [c.handle, c]))
const productsByVariantId = new Map(
  catalog.products.flatMap((p) => p.variants.map((v) => [v.id, p] as const)),
)

export const CURRENCY = catalog.currency
export const SCRAPED_AT = catalog.scrapedAt

export function getAllProducts(): Product[] {
  return catalog.products
}

export function getProduct(handle: string): Product | undefined {
  return productsByHandle.get(handle)
}

export function getProductByVariantId(variantId: number): Product | undefined {
  return productsByVariantId.get(variantId)
}

export function getAllCollections(): Collection[] {
  return catalog.collections
}

export function getCollection(handle: string): Collection | undefined {
  return collectionsByHandle.get(handle)
}

export function getCollectionProducts(handle: string): Product[] {
  const collection = collectionsByHandle.get(handle)
  if (!collection) return []
  return collection.productHandles
    .map((h) => productsByHandle.get(h))
    .filter((p): p is Product => Boolean(p))
}

/** `/collections/all` is virtual on Shopify — synthesize it. */
export function getCollectionOrAll(handle: string): Collection | undefined {
  if (handle === 'all') {
    return {
      id: 0,
      handle: 'all',
      title: 'All Products',
      description: 'Every Korean skincare, haircare and makeup product in the store.',
      image: null,
      productHandles: catalog.products.map((p) => p.handle),
    }
  }
  return collectionsByHandle.get(handle)
}

export function minPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price))
}

export function maxCompareAt(product: Product): number | null {
  const values = product.variants
    .map((v) => v.compareAtPrice)
    .filter((v): v is number => typeof v === 'number' && v > 0)
  return values.length ? Math.max(...values) : null
}

export function isOnSale(product: Product): boolean {
  return product.variants.some(
    (v) => typeof v.compareAtPrice === 'number' && v.compareAtPrice > v.price,
  )
}

export function isSoldOut(product: Product): boolean {
  return product.variants.every((v) => !v.available)
}

export function isNew(product: Product, withinDays = 45): boolean {
  const published = Date.parse(product.publishedAt)
  if (Number.isNaN(published)) return false
  const newest = catalog.products.reduce((acc, p) => {
    const t = Date.parse(p.publishedAt)
    return Number.isNaN(t) ? acc : Math.max(acc, t)
  }, 0)
  return newest - published <= withinDays * 24 * 60 * 60 * 1000
}

/** Newest first, used for the New Arrivals rails. */
export function getNewArrivals(limit = 8): Product[] {
  return [...catalog.products]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit)
}

/**
 * The store has no sales data exposed publicly, so "best sellers" follows the
 * merchandised order of the hand-curated collections, falling back to catalog order.
 */
export function getBestSellers(limit = 8): Product[] {
  const curated = ['best-sellers', 'bestsellers', 'serum-ampoule', 'moisturizers']
  const seen = new Set<string>()
  const out: Product[] = []
  for (const handle of curated) {
    for (const product of getCollectionProducts(handle)) {
      if (seen.has(product.handle)) continue
      seen.add(product.handle)
      out.push(product)
      if (out.length >= limit) return out
    }
  }
  for (const product of catalog.products) {
    if (seen.has(product.handle)) continue
    seen.add(product.handle)
    out.push(product)
    if (out.length >= limit) break
  }
  return out
}

export function getSaleProducts(limit = 8): Product[] {
  return catalog.products.filter(isOnSale).slice(0, limit)
}

export function searchProducts(query: string, limit = 60): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  const scored: { product: Product; score: number }[] = []

  for (const product of catalog.products) {
    const title = product.title.toLowerCase()
    const haystack = `${title} ${product.type} ${product.tags.join(' ')}`.toLowerCase()
    let score = 0
    for (const term of terms) {
      if (title.startsWith(term)) score += 6
      else if (title.includes(term)) score += 4
      else if (haystack.includes(term)) score += 1
      else {
        score = -1
        break
      }
    }
    if (score > 0) scored.push({ product, score })
  }

  return scored
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title))
    .slice(0, limit)
    .map((s) => s.product)
}

/** Collections a product belongs to, excluding the catch-all feeds. */
export function getProductCollections(handle: string): Collection[] {
  const skip = new Set(['new-arrivals', 'all'])
  return catalog.collections.filter(
    (c) => !skip.has(c.handle) && c.productHandles.includes(handle),
  )
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  const siblings = getProductCollections(product.handle)
    .sort((a, b) => a.productHandles.length - b.productHandles.length)
    .flatMap((c) => c.productHandles)

  const seen = new Set([product.handle])
  const out: Product[] = []
  for (const handle of siblings) {
    if (seen.has(handle)) continue
    seen.add(handle)
    const candidate = productsByHandle.get(handle)
    if (candidate) out.push(candidate)
    if (out.length >= limit) break
  }
  if (out.length < limit) {
    for (const candidate of getNewArrivals(limit * 3)) {
      if (seen.has(candidate.handle)) continue
      seen.add(candidate.handle)
      out.push(candidate)
      if (out.length >= limit) break
    }
  }
  return out
}

/** Brand collections that actually carry stock, for the /brands index. */
export function getBrandCollections(handles: readonly string[]): Collection[] {
  return handles
    .map((h) => collectionsByHandle.get(h))
    .filter((c): c is Collection => Boolean(c))
}
