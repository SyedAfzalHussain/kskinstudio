'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LOOKBOOK } from '@/data/homepage'
import { cdnImage, formatMoney } from '@/lib/format'
import { ChevronIcon, PlusIcon } from '@/components/ui/icons'
import type { HotspotProduct } from '@/lib/hotspot'

export default function Lookbook({ products }: { products: Record<string, HotspotProduct> }) {
  const [slide, setSlide] = useState(0)
  const [openSpot, setOpenSpot] = useState<string | null>(null)
  const current = LOOKBOOK.slides[slide]

  return (
    <section className="page-width section-gap">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="t-display-3">{LOOKBOOK.heading}</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[--color-fg-muted]">
            {slide + 1}/{LOOKBOOK.slides.length}
          </span>
          <button
            type="button"
            onClick={() => setSlide((s) => (s - 1 + LOOKBOOK.slides.length) % LOOKBOOK.slides.length)}
            aria-label="Previous look"
            className="grid h-10 w-10 place-items-center rounded-full border border-[--color-border] hover:bg-black hover:text-white"
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setSlide((s) => (s + 1) % LOOKBOOK.slides.length)}
            aria-label="Next look"
            className="grid h-10 w-10 place-items-center rounded-full border border-[--color-border] hover:bg-black hover:text-white"
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[--radius-block] bg-[--color-bg-secondary]">
        <div className="relative aspect-[4/5] sm:aspect-[16/9]">
          <Image
            src={current.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />

          {current.hotspots.map((spot) => {
            const product = products[spot.handle]
            if (!product) return null
            const open = openSpot === spot.handle
            return (
              <div
                key={spot.handle}
                className="absolute"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenSpot(open ? null : spot.handle)}
                  aria-label={`Shop ${product.title}`}
                  aria-expanded={open}
                  className="grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
                >
                  <PlusIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-45' : ''}`} />
                </button>

                {open ? (
                  <Link
                    href={`/products/${product.handle}`}
                    className="absolute left-6 top-0 flex w-60 items-center gap-3 rounded-[--radius-card-inner] bg-white p-3 shadow-lg"
                  >
                    {product.image ? (
                      <span className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-md bg-[--color-bg-secondary]">
                        <Image
                          src={cdnImage(product.image, 140)}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                    ) : null}
                    <span className="min-w-0">
                      <span className="line-clamp-2 block text-xs font-medium">{product.title}</span>
                      <span className="mt-1 block text-sm">{formatMoney(product.price)}</span>
                    </span>
                  </Link>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
