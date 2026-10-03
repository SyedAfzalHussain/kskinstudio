'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useUI } from '@/components/layout/UIProvider'
import { cdnImage, stripHtml } from '@/lib/format'
import { CloseIcon } from '@/components/ui/icons'
import AddToCart from './AddToCart'

export default function QuickView() {
  const { quickView: product, setQuickView } = useUI()
  if (!product) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        onClick={() => setQuickView(null)}
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[--radius-block] bg-[--color-bg] md:grid-cols-2"
      >
        <button
          type="button"
          onClick={() => setQuickView(null)}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="relative aspect-square bg-[--color-bg-secondary]">
          {product.images[0] ? (
            <Image
              src={cdnImage(product.images[0].src, 800)}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 448px, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="p-6 lg:p-8">
          <h2 className="t-h4">{product.title}</h2>
          {product.descriptionHtml ? (
            <p className="mt-2 line-clamp-3 text-sm text-[--color-fg-muted]">
              {stripHtml(product.descriptionHtml, 180)}
            </p>
          ) : null}

          <div className="mt-6">
            <AddToCart product={product} onAdded={() => setQuickView(null)} />
          </div>

          <Link
            href={`/products/${product.handle}`}
            onClick={() => setQuickView(null)}
            className="link-underline mt-5 inline-block text-sm font-medium"
          >
            View full details
          </Link>
        </div>
      </div>
    </div>
  )
}
