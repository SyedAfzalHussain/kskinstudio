import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SearchBox from '@/components/collection/SearchBox'
import ProductGrid from '@/components/product/ProductGrid'
import { searchProducts } from '@/lib/catalog'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q}` : 'Search',
    description: 'Search the Kskinstudio catalogue.',
    robots: { index: false },
  }
}

const SUGGESTIONS = [
  { label: 'Sunscreen', href: '/collections/sunscreens' },
  { label: 'Serums', href: '/collections/serum-ampoule' },
  { label: 'Toner pads', href: '/collections/facial-pads-toner-pads' },
  { label: 'Cleansers', href: '/collections/cleansers' },
  { label: 'Gift sets', href: '/collections/olive-young-gift-sets' },
]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const results = query ? searchProducts(query, 120) : []

  return (
    <div className="page-width pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="t-display-2 mb-8">Search</h1>

      <SearchBox initialQuery={query} />

      {query ? (
        <>
          <p className="mt-6 text-sm text-(--color-fg-muted)">
            {results.length} result{results.length === 1 ? '' : 's'} for “{query}”
          </p>
          {results.length ? (
            <div className="mt-8">
              <ProductGrid products={results} />
            </div>
          ) : (
            <p className="py-16 text-(--color-fg-muted)">
              Nothing matched. Try a brand name or a product type like “sunscreen”.
            </p>
          )}
        </>
      ) : (
        <div className="mt-8">
          <p className="t-eyebrow text-(--color-fg-muted)">Popular searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Link key={s.href} href={s.href} className="btn btn--secondary btn--sm">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
