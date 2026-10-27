'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useUI } from '@/components/layout/UIProvider'
import { useCart } from '@/lib/cart'
import { cdnImage, discountPercent, formatMoney, splitTitle } from '@/lib/format'
import { EyeIcon } from '@/components/ui/icons'
import type { Product } from '@/lib/types'

type Badges = { sale: number | null; soldOut: boolean; isNew: boolean }

function summarise(product: Product): Badges & { price: number; compareAt: number | null } {
  const prices = product.variants.map((v) => v.price)
  const price = prices.length ? Math.min(...prices) : 0
  const cheapest =
    product.variants.find((v) => v.price === price) ?? product.variants[0] ?? null
  const compareAt = cheapest?.compareAtPrice ?? null
  return {
    price,
    compareAt,
    sale: discountPercent(price, compareAt),
    soldOut: product.variants.length > 0 && product.variants.every((v) => !v.available),
    isNew: false,
  }
}

export default function ProductCard({
  product,
  isNew = false,
  priority = false,
  sizes = '(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw',
}: {
  product: Product
  isNew?: boolean
  priority?: boolean
  sizes?: string
}) {
  const { setQuickView } = useUI()
  const { addLine } = useCart()
  const { price, compareAt, sale, soldOut } = summarise(product)

  const primary = product.images[0]
  const secondary = product.images[1]
  const singleVariant = product.variants.length === 1 ? product.variants[0] : null

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-(--radius-card) bg-(--color-bg-secondary)">
        <Link href={`/products/${product.handle}`} className="block" tabIndex={-1} aria-hidden="true">
          <div className="relative aspect-square">
            {primary ? (
              <Image
                src={cdnImage(primary.src, 700)}
                alt=""
                fill
                sizes={sizes}
                priority={priority}
                className={`zoom-img object-cover mix-blend-multiply ${
                  secondary ? 'transition-opacity duration-500 group-hover:opacity-0' : ''
                }`}
              />
            ) : null}
            {secondary ? (
              <Image
                src={cdnImage(secondary.src, 700)}
                alt=""
                fill
                sizes={sizes}
                className="object-cover mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {soldOut ? (
            <span className="badge" style={{ background: 'var(--color-badge-soldout)' }}>
              Sold out
            </span>
          ) : null}
          {sale ? (
            <span className="badge" style={{ background: 'var(--color-badge-sale)' }}>
              -{sale}%
            </span>
          ) : null}
          {isNew && !soldOut ? (
            <span className="badge" style={{ background: 'var(--color-badge-new)' }}>
              New
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setQuickView(product)}
          aria-label={`Quick view: ${product.title}`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <EyeIcon className="h-4 w-4" />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          {soldOut ? (
            <Link href={`/products/${product.handle}`} className="btn btn--light btn--sm btn--full">
              View product
            </Link>
          ) : singleVariant ? (
            <button
              type="button"
              onClick={() =>
                addLine({
                  variantId: singleVariant.id,
                  productHandle: product.handle,
                  quantity: 1,
                })
              }
              className="btn btn--light btn--sm btn--full"
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setQuickView(product)}
              className="btn btn--light btn--sm btn--full"
            >
              Choose options
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="text-[1.05rem] font-medium leading-snug">
          <Link href={`/products/${product.handle}`} className="line-clamp-2 after:absolute after:inset-0 after:content-['']">
            {splitTitle(product.title).name}
          </Link>
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.95rem]">
          <span className={sale ? 'text-(--color-primary)' : undefined}>{formatMoney(price)}</span>
          {compareAt && compareAt > price ? (
            <span className="text-sm text-(--color-fg-muted) line-through">
              {formatMoney(compareAt)}
            </span>
          ) : null}
        </p>
      </div>
    </article>
  )
}
