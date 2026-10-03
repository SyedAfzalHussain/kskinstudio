'use client'

import { useRef } from 'react'
import ProductCard from './ProductCard'
import { ChevronIcon } from '@/components/ui/icons'
import type { Product } from '@/lib/types'

/** Horizontally scrolling product row with arrow controls, as on the live theme. */
export default function ProductRail({
  products,
  newHandles,
}: {
  products: Product[]
  newHandles?: Set<string>
}) {
  const railRef = useRef<HTMLUListElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('li')
    const amount = card ? card.clientWidth + 16 : rail.clientWidth * 0.8
    rail.scrollBy({ left: amount * direction * 2, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <ul ref={railRef} className="rail -mx-[--page-padding] gap-4 px-[--page-padding]">
        {products.map((product) => (
          <li
            key={product.handle}
            className="w-[calc(50%-0.5rem)] shrink-0 md:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)] 2xl:w-[calc(20%-0.8rem)]"
          >
            <ProductCard product={product} isNew={newHandles?.has(product.handle)} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-2 lg:absolute lg:-top-14 lg:right-0 lg:mt-0">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous products"
          className="grid h-10 w-10 place-items-center rounded-full border border-[--color-border] transition-colors hover:bg-black hover:text-white"
        >
          <ChevronIcon className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next products"
          className="grid h-10 w-10 place-items-center rounded-full border border-[--color-border] transition-colors hover:bg-black hover:text-white"
        >
          <ChevronIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
