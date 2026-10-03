'use client'

import { useMemo } from 'react'
import { useCart } from './cart'
import { getLiteProduct, type LiteProduct, type LiteVariantView } from './catalog-lite'
import type { CartLine } from './types'

export type CartItem = { line: CartLine; product: LiteProduct; variant: LiteVariantView }

/** Joins stored cart lines against the slim index, dropping anything stale. */
export function useCartDetails() {
  const { lines } = useCart()

  return useMemo(() => {
    const items: CartItem[] = []
    for (const line of lines) {
      const product = getLiteProduct(line.productHandle)
      if (!product) continue
      const variant = product.variants.find((v) => v.id === line.variantId)
      if (!variant) continue
      items.push({ line, product, variant })
    }
    const subtotal = items.reduce((sum, i) => sum + i.variant.price * i.line.quantity, 0)
    const compareAtTotal = items.reduce(
      (sum, i) => sum + (i.variant.compareAtPrice ?? i.variant.price) * i.line.quantity,
      0,
    )
    return { items, subtotal, savings: Math.max(0, compareAtTotal - subtotal) }
  }, [lines])
}
