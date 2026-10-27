'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Collection } from '@/lib/types'
import type { NavItem } from '@/data/navigation'

/** Groups brand collections under their first character, A–Z then numeric. */
function groupBrands(brands: Collection[]) {
  const groups = new Map<string, Collection[]>()
  for (const brand of brands) {
    const clean = brand.title.replace(/^[0-9]+\)/, '').trim()
    const letter = clean.charAt(0).toUpperCase()
    const key = /[A-Z]/.test(letter) ? letter : '#'
    const bucket = groups.get(key)
    if (bucket) bucket.push(brand)
    else groups.set(key, [brand])
  }
  return [...groups.entries()].sort(([a], [b]) => {
    if (a === '#') return 1
    if (b === '#') return -1
    return a.localeCompare(b)
  })
}

export function brandLabel(collection: Collection): string {
  return collection.title.replace(/^[0-9]+\)/, '').trim()
}

export default function MegaMenu({ item, brands }: { item: NavItem; brands: Collection[] }) {
  if (item.layout === 'brands') {
    const groups = groupBrands(brands)
    return (
      <div className="page-width py-10">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <p className="t-eyebrow text-(--color-fg-muted)">Shop by brand</p>
          <Link href="/brands" className="link-underline text-sm font-medium">
            View all brands
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-6 gap-y-7">
          {groups.map(([letter, items]) => (
            <div key={letter}>
              <p className="mb-2 text-xs font-medium tracking-[0.12em] text-(--color-fg-faint)">
                {letter}
              </p>
              <ul className="space-y-1.5">
                {items.map((brand) => (
                  <li key={brand.handle}>
                    <Link
                      href={`/collections/${brand.handle}`}
                      className="link-underline text-sm text-(--color-fg-muted) hover:text-(--color-fg)"
                    >
                      {brandLabel(brand)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page-width grid gap-10 py-10 lg:grid-cols-[1fr_auto]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {item.columns?.map((column) => (
          <div key={column.title}>
            <p className="mb-3 text-sm font-medium">{column.title}</p>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-(--color-fg-muted) hover:text-(--color-fg)"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {item.feature ? (
        <Link
          href={item.feature.href}
          className="group relative hidden w-[280px] overflow-hidden rounded-(--radius-block) lg:block"
        >
          <Image
            src={item.feature.image}
            alt=""
            width={560}
            height={700}
            sizes="280px"
            className="zoom-img h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
            <p className="t-h4">{item.feature.heading}</p>
            <p className="mt-1 text-sm text-white/80">{item.feature.caption}</p>
          </div>
        </Link>
      ) : null}
    </div>
  )
}
