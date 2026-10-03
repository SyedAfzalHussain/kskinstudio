import type { Product } from './types'

/** Minimal product shape passed from the server into the Lookbook client component. */
export type HotspotProduct = {
  handle: string
  title: string
  price: number
  image: string | null
}

export function toHotspotProduct(product: Product): HotspotProduct {
  return {
    handle: product.handle,
    title: product.title,
    price: Math.min(...product.variants.map((v) => v.price)),
    image: product.images[0]?.src ?? null,
  }
}
