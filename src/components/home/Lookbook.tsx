'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LOOKBOOK } from '@/data/homepage'
import { cdnImage, formatMoney } from '@/lib/format'
import { ChevronIcon } from '@/components/ui/icons'
import type { HotspotProduct } from '@/lib/hotspot'

export default function Lookbook({ products }: { products: Record<string, HotspotProduct> }) {
  const [slide, setSlide] = useState(0)
  const [active, setActive] = useState<string | null>(null)
  const current = LOOKBOOK.slides[slide]
  const spots = current.hotspots
    .map((spot, i) => ({ ...spot, n: i + 1, product: products[spot.handle] }))
    .filter((spot) => spot.product)

  const go = (next: number) => {
    setSlide((next + LOOKBOOK.slides.length) % LOOKBOOK.slides.length)
    setActive(null)
  }

  return (
    <section className="page-width section-gap">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="t-display-3">{LOOKBOOK.heading}</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-(--color-fg-muted)">
            {slide + 1} / {LOOKBOOK.slides.length}
          </span>
          <button
            type="button"
            onClick={() => go(slide - 1)}
            aria-label="Previous look"
            className="grid h-10 w-10 place-items-center rounded-full border border-(--color-border) transition-colors hover:bg-black hover:text-white"
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(slide + 1)}
            aria-label="Next look"
            className="grid h-10 w-10 place-items-center rounded-full border border-(--color-border) transition-colors hover:bg-black hover:text-white"
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <div className="relative overflow-hidden rounded-(--radius-block) bg-(--color-bg-secondary)">
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/4.4]">
            <Image
              key={current.image}
              src={current.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            {spots.map((spot) => (
              <button
                key={spot.handle}
                type="button"
                onClick={() => setActive(spot.handle === active ? null : spot.handle)}
                aria-label={`Highlight ${spot.product.title}`}
                aria-pressed={active === spot.handle}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-medium shadow-md ring-4 transition-all ${
                  active === spot.handle
                    ? 'scale-110 bg-black text-white ring-white/70'
                    : 'bg-white text-black ring-white/40 hover:scale-110'
                }`}
              >
                {spot.n}
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-3">
          {spots.map((spot) => (
            <li key={spot.handle}>
              <Link
                href={`/products/${spot.handle}`}
                onMouseEnter={() => setActive(spot.handle)}
                onMouseLeave={() => setActive(null)}
                className={`flex items-center gap-4 rounded-(--radius-block) border p-3 transition-colors ${
                  active === spot.handle
                    ? 'border-black'
                    : 'border-(--color-border) hover:border-black'
                }`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-xs font-medium text-white">
                  {spot.n}
                </span>
                <span className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-(--radius-card-inner) bg-(--color-bg-secondary)">
                  {spot.product.image ? (
                    <Image
                      src={cdnImage(spot.product.image, 200)}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 block font-medium leading-snug">
                    {spot.product.title}
                  </span>
                  <span className="mt-1 block text-(--color-fg-muted)">
                    {formatMoney(spot.product.price)}
                  </span>
                </span>
                <ChevronIcon className="h-4 w-4 shrink-0 text-(--color-fg-muted)" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
