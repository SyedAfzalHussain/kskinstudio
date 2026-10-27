'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TESTIMONIALS } from '@/data/homepage'
import { ChevronIcon, StarIcon } from '@/components/ui/icons'

export default function Testimonials() {
  const railRef = useRef<HTMLUListElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('li')
    rail.scrollBy({
      left: (card ? card.clientWidth + 16 : rail.clientWidth * 0.8) * direction,
      behavior: 'smooth',
    })
  }

  return (
    <section className="page-width section-gap">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="t-display-3">{TESTIMONIALS.heading}</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous reviews"
            className="grid h-10 w-10 place-items-center rounded-full border border-(--color-border) hover:bg-black hover:text-white"
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next reviews"
            className="grid h-10 w-10 place-items-center rounded-full border border-(--color-border) hover:bg-black hover:text-white"
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul ref={railRef} className="rail -mx-(--page-padding) gap-4 px-(--page-padding)">
        {TESTIMONIALS.items.map((item) => (
          <li
            key={item.name + item.quote.slice(0, 12)}
            className="w-[86%] shrink-0 sm:w-[46%] lg:w-[31%] xl:w-[23%]"
          >
            <figure className="flex h-full flex-col overflow-hidden rounded-(--radius-block) border border-(--color-border)">
              <div className="relative aspect-[4/3] bg-(--color-bg-secondary)">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 23vw, (min-width: 640px) 46vw, 86vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex flex-1 flex-col p-5">
                <div className="flex gap-0.5 text-(--color-fg)">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm text-(--color-fg-muted)">{item.quote}</p>
                <p className="mt-4 text-sm font-medium">{item.name}</p>
                <p className="text-xs text-(--color-fg-muted)">Verified Buyer</p>
                {item.handle ? (
                  <Link
                    href={`/products/${item.handle}`}
                    className="link-underline mt-3 text-xs font-medium"
                  >
                    Shop this product
                  </Link>
                ) : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
