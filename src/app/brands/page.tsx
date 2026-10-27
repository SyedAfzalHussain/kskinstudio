import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { BRAND_HANDLES } from '@/data/navigation'
import { getBrandCollections } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Brands',
  description: 'Every Korean beauty brand stocked at Kskinstudio, A to Z.',
}

function label(title: string) {
  return title.replace(/^[0-9]+\)/, '').trim()
}

export default function BrandsPage() {
  const brands = getBrandCollections(BRAND_HANDLES)

  const groups = new Map<string, typeof brands>()
  for (const brand of brands) {
    const first = label(brand.title).charAt(0).toUpperCase()
    const key = /[A-Z]/.test(first) ? first : '#'
    const bucket = groups.get(key)
    if (bucket) bucket.push(brand)
    else groups.set(key, [brand])
  }
  const sorted = [...groups.entries()].sort(([a], [b]) =>
    a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b),
  )

  return (
    <div className="page-width pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
      <h1 className="t-display-2">Brands</h1>
      <p className="mt-3 max-w-xl text-(--color-fg-muted)">
        {brands.length} Korean beauty brands, stocked and shipped from Pakistan.
      </p>

      <nav aria-label="Jump to letter" className="mt-6 flex flex-wrap gap-2">
        {sorted.map(([letter]) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-(--color-border) text-sm transition-colors hover:bg-black hover:text-white"
          >
            {letter}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-10">
        {sorted.map(([letter, items]) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
            <h2 className="t-h3 mb-4 border-b border-(--color-border) pb-2">{letter}</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
              {items.map((brand) => (
                <li key={brand.handle}>
                  <Link
                    href={`/collections/${brand.handle}`}
                    className="link-underline text-(--color-fg-muted) hover:text-(--color-fg)"
                  >
                    {label(brand.title)}
                    <span className="ml-1 text-xs text-(--color-fg-faint)">
                      ({brand.productHandles.length})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
