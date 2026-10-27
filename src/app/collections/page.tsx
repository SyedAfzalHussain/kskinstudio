import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getAllCollections } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Every collection in the Kskinstudio store, from serums to gift sets.',
}

export default function CollectionsIndexPage() {
  const collections = getAllCollections().filter((c) => c.productHandles.length > 0)

  return (
    <div className="page-width pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Collections' }]} />
      <h1 className="t-display-2 mb-8">Collections</h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {collections.map((collection) => (
          <li key={collection.handle}>
            <Link href={`/collections/${collection.handle}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-(--radius-block) bg-(--color-bg-secondary)">
                {collection.image ? (
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="zoom-img object-cover"
                  />
                ) : (
                  <span className="grid h-full place-items-center px-3 text-center text-sm text-(--color-fg-muted)">
                    {collection.title}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium">{collection.title}</p>
              <p className="text-xs text-(--color-fg-muted)">
                {collection.productHandles.length} products
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
