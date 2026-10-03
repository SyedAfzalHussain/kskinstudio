'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductRail from '@/components/product/ProductRail'
import type { Product } from '@/lib/types'

export type TabPanel = { id: string; label: string; href: string; products: Product[] }

export default function ProductTabs({
  tabs,
  newHandles,
}: {
  tabs: TabPanel[]
  newHandles: string[]
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]
  const newSet = new Set(newHandles)

  if (!current) return null

  return (
    <section className="page-width section-gap">
      <div
        role="tablist"
        aria-label="Product collections"
        className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-3"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === active}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={`t-display-3 transition-opacity ${
              tab.id === active ? 'opacity-100' : 'opacity-30 hover:opacity-60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`}>
        <ProductRail products={current.products} newHandles={newSet} />
      </div>

      <div className="mt-10 flex justify-center">
        <Link href={current.href} className="btn btn--outline btn--lg">
          Shop All Products
        </Link>
      </div>
    </section>
  )
}
