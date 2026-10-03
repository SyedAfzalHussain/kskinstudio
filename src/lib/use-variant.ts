'use client'

import { useMemo, useState } from 'react'
import type { Product, ProductVariant } from './types'

/** Tracks option selections and resolves them to a concrete variant. */
export function useVariant(product: Product) {
  const firstAvailable =
    product.variants.find((v) => v.available) ?? product.variants[0] ?? null

  const [selected, setSelected] = useState<string[]>(() => firstAvailable?.options ?? [])

  const variant = useMemo<ProductVariant | null>(() => {
    if (!product.variants.length) return null
    const match = product.variants.find(
      (v) =>
        v.options.length === selected.length &&
        v.options.every((opt, i) => opt === selected[i]),
    )
    return match ?? null
  }, [product.variants, selected])

  const selectOption = (index: number, value: string) => {
    setSelected((current) => {
      const next = [...current]
      next[index] = value
      return next
    })
  }

  /** A value is offered when at least one variant matching the other picks carries it. */
  const isValueAvailable = (index: number, value: string) =>
    product.variants.some(
      (v) =>
        v.available &&
        v.options[index] === value &&
        v.options.every((opt, i) => i === index || opt === selected[i]),
    )

  return { selected, selectOption, variant, isValueAvailable }
}
