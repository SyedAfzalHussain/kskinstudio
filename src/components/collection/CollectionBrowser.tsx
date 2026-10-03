'use client'

import { useMemo, useState } from 'react'
import ProductGrid from '@/components/product/ProductGrid'
import { ChevronIcon } from '@/components/ui/icons'
import type { Product } from '@/lib/types'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'title-asc', label: 'Alphabetically, A–Z' },
  { id: 'title-desc', label: 'Alphabetically, Z–A' },
  { id: 'date-desc', label: 'Newest first' },
] as const

type SortId = (typeof SORTS)[number]['id']

const PAGE_SIZE = 24

const lowestPrice = (p: Product) =>
  p.variants.length ? Math.min(...p.variants.map((v) => v.price)) : 0

export default function CollectionBrowser({
  products,
  newHandles = [],
}: {
  products: Product[]
  newHandles?: string[]
}) {
  const [sort, setSort] = useState<SortId>('featured')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const newSet = useMemo(() => new Set(newHandles), [newHandles])

  const filtered = useMemo(() => {
    let list = products
    if (inStockOnly) list = list.filter((p) => p.variants.some((v) => v.available))
    if (onSaleOnly) {
      list = list.filter((p) =>
        p.variants.some((v) => v.compareAtPrice != null && v.compareAtPrice > v.price),
      )
    }

    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => lowestPrice(a) - lowestPrice(b))
        break
      case 'price-desc':
        sorted.sort((a, b) => lowestPrice(b) - lowestPrice(a))
        break
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'date-desc':
        sorted.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        break
      default:
        break
    }
    return sorted
  }, [products, sort, inStockOnly, onSaleOnly])

  const shown = filtered.slice(0, visible)

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-[--color-border] py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setInStockOnly((v) => !v)
              setVisible(PAGE_SIZE)
            }}
            aria-pressed={inStockOnly}
            className={`btn btn--sm ${inStockOnly ? 'btn--primary' : 'btn--secondary'}`}
          >
            In stock
          </button>
          <button
            type="button"
            onClick={() => {
              setOnSaleOnly((v) => !v)
              setVisible(PAGE_SIZE)
            }}
            aria-pressed={onSaleOnly}
            className={`btn btn--sm ${onSaleOnly ? 'btn--primary' : 'btn--secondary'}`}
          >
            On sale
          </button>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-[--color-fg-muted]">{filtered.length} products</p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[--color-fg-muted]">Sort by</span>
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortId)
                  setVisible(PAGE_SIZE)
                }}
                className="appearance-none rounded-full border border-[--color-border] bg-transparent py-2 pl-4 pr-9 text-sm"
              >
                {SORTS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90" />
            </span>
          </label>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-[--color-fg-muted]">
          No products match these filters.
        </p>
      ) : (
        <ProductGrid products={shown} newHandles={newSet} />
      )}

      {visible < filtered.length ? (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn btn--outline btn--lg"
          >
            Load more ({filtered.length - visible} left)
          </button>
        </div>
      ) : null}
    </>
  )
}
