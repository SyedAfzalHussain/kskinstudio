import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ProductGallery from '@/components/product/ProductGallery'
import AddToCart from '@/components/product/AddToCart'
import ProductRail from '@/components/product/ProductRail'
import Accordion from '@/components/ui/Accordion'
import { StarIcon } from '@/components/ui/icons'
import {
  getAllProducts,
  getProduct,
  getProductCollections,
  getRelatedProducts,
  minPrice,
} from '@/lib/catalog'
import { cdnImage, stripHtml } from '@/lib/format'

type Params = { handle: string }

export function generateStaticParams(): Params[] {
  return getAllProducts().map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { handle } = await params
  const product = getProduct(handle)
  if (!product) return { title: 'Product not found' }

  const description = stripHtml(product.descriptionHtml, 160)
  const image = product.images[0]?.src

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      type: 'website',
      images: image ? [{ url: cdnImage(image, 1200) }] : undefined,
    },
  }
}

const SHIPPING_FAQ = [
  {
    q: 'Shipping & delivery',
    a: 'Orders ship within 1–2 business days and arrive in 3–7 business days nationwide. Free shipping on orders over Rs.2000.',
  },
  {
    q: 'Returns',
    a: 'Unopened products can be returned within 7 days of delivery. Contact us and we will arrange the pickup.',
  },
  {
    q: 'Authenticity',
    a: 'Every product is sourced directly and shipped sealed in its original packaging.',
  },
]

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params
  const product = getProduct(handle)
  if (!product) notFound()

  const collections = getProductCollections(handle)
  const related = getRelatedProducts(product, 10)
  const primaryCollection = collections[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: stripHtml(product.descriptionHtml, 500),
    image: product.images.slice(0, 5).map((i) => cdnImage(i.src, 1200)),
    brand: { '@type': 'Brand', name: product.vendor },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PKR',
      lowPrice: minPrice(product),
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.available)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <div className="page-width pt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        trail={[
          { label: 'Home', href: '/' },
          ...(primaryCollection
            ? [{ label: primaryCollection.title, href: `/collections/${primaryCollection.handle}` }]
            : [{ label: 'Collections', href: '/collections' }]),
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} title={product.title} />

        <div className="lg:py-4">
          {product.type ? (
            <p className="t-eyebrow text-[--color-fg-muted]">{product.type}</p>
          ) : null}
          <h1 className="t-h1 mt-2">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="text-sm text-[--color-fg-muted]">Verified buyer reviews</span>
          </div>

          <div className="mt-6">
            <AddToCart product={product} />
          </div>

          {collections.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {collections.slice(0, 6).map((collection) => (
                <Link
                  key={collection.handle}
                  href={`/collections/${collection.handle}`}
                  className="btn btn--secondary btn--sm"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-8">
            <Accordion items={SHIPPING_FAQ} defaultOpen={null} />
          </div>
        </div>
      </div>

      {product.descriptionHtml ? (
        <section className="section-gap">
          <h2 className="t-h2 mb-6">Description</h2>
          <div
            className="rte max-w-3xl"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </section>
      ) : null}

      {related.length ? (
        <section className="section-gap">
          <h2 className="t-display-3 mb-8">You may also like</h2>
          <ProductRail products={related} />
        </section>
      ) : null}
    </div>
  )
}
