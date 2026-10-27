import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CollectionBrowser from '@/components/collection/CollectionBrowser'
import {
  getAllCollections,
  getCollectionOrAll,
  getCollectionProducts,
  getAllProducts,
  getNewArrivals,
} from '@/lib/catalog'
import { stripHtml } from '@/lib/format'

type Params = { handle: string }

export function generateStaticParams(): Params[] {
  return [{ handle: 'all' }, ...getAllCollections().map((c) => ({ handle: c.handle }))]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { handle } = await params
  const collection = getCollectionOrAll(handle)
  if (!collection) return { title: 'Collection not found' }
  return {
    title: collection.title,
    description: collection.description
      ? stripHtml(collection.description, 160)
      : `Shop ${collection.title} at Kskinstudio — authentic Korean beauty delivered across Pakistan.`,
  }
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params
  const collection = getCollectionOrAll(handle)
  if (!collection) notFound()

  const products =
    handle === 'all' ? getAllProducts() : getCollectionProducts(handle)
  const newHandles = getNewArrivals(20).map((p) => p.handle)

  return (
    <div className="page-width pt-6">
      <Breadcrumbs
        trail={[
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/collections' },
          { label: collection.title },
        ]}
      />

      <header className="mb-8">
        {collection.image ? (
          <div className="relative mb-8 aspect-[21/7] overflow-hidden rounded-(--radius-block) bg-(--color-bg-secondary)">
            <Image
              src={collection.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <h1 className="t-display-2">{collection.title}</h1>
        {collection.description ? (
          <div
            className="rte mt-3 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: collection.description }}
          />
        ) : null}
      </header>

      {products.length === 0 ? (
        <p className="py-20 text-center text-(--color-fg-muted)">
          This collection is empty right now — check back soon.
        </p>
      ) : (
        <CollectionBrowser products={products} newHandles={newHandles} />
      )}
    </div>
  )
}
