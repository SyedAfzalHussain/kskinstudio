import liteJson from '@/data/catalog-lite.json'

/**
 * Client-safe catalog slice. Keys are short because this ships in the browser
 * bundle — see scripts/build-lite-index.mjs.
 */
type LiteVariant = {
  id: number
  t: string
  p: number
  c: number | null
  a: boolean
  i: string | null
}

type LiteProductRaw = {
  h: string
  t: string
  y: string
  g: string[]
  i: string | null
  v: LiteVariant[]
}

export type LiteVariantView = {
  id: number
  title: string
  price: number
  compareAtPrice: number | null
  available: boolean
  image: string | null
}

export type LiteProduct = {
  handle: string
  title: string
  type: string
  tags: string[]
  image: string | null
  variants: LiteVariantView[]
  price: number
}

const raw = (liteJson as { products: LiteProductRaw[] }).products

const expand = (p: LiteProductRaw): LiteProduct => ({
  handle: p.h,
  title: p.t,
  type: p.y,
  tags: p.g,
  image: p.i,
  variants: p.v.map((v) => ({
    id: v.id,
    title: v.t,
    price: v.p,
    compareAtPrice: v.c,
    available: v.a,
    image: v.i,
  })),
  price: p.v.length ? Math.min(...p.v.map((v) => v.p)) : 0,
})

export const liteProducts: LiteProduct[] = raw.map(expand)

const byHandle = new Map(liteProducts.map((p) => [p.handle, p]))

export function getLiteProduct(handle: string): LiteProduct | undefined {
  return byHandle.get(handle)
}

/** Same ranking as the server-side search, over the slim index. */
export function searchLite(query: string, limit = 60): LiteProduct[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  const scored: { product: LiteProduct; score: number }[] = []

  for (const product of liteProducts) {
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
