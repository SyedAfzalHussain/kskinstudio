'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'
import { useCartDetails } from '@/lib/use-cart-details'
import { cdnImage, formatMoney, splitTitle } from '@/lib/format'
import QuantityStepper from '@/components/product/QuantityStepper'

export default function CartView() {
  const { hydrated, updateQuantity, removeLine, clear } = useCart()
  const { items, subtotal, savings } = useCartDetails()

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-(--radius-block) bg-(--color-bg-secondary)" />
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <p className="t-h3">Your cart is empty</p>
        <p className="max-w-sm text-(--color-fg-muted)">
          Browse serums, sunscreens and gift sets — free shipping over Rs.2000.
        </p>
        <Link href="/collections/all" className="btn btn--primary btn--lg">
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
      <div>
        <ul className="divide-y divide-(--color-border) border-y border-(--color-border)">
          {items.map(({ line, product, variant }) => (
            <li key={line.variantId} className="flex gap-4 py-6">
              <Link
                href={`/products/${product.handle}`}
                className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-(--radius-card-inner) bg-(--color-bg-secondary) sm:w-32"
              >
                {product.image ? (
                  <Image
                    src={cdnImage(variant.image ?? product.image, 300)}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : null}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${product.handle}`}
                      className="line-clamp-2 font-medium"
                    >
                      {splitTitle(product.title).name}
                    </Link>
                    {variant.title !== 'Default Title' ? (
                      <p className="mt-1 text-sm text-(--color-fg-muted)">{variant.title}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-medium">
                    {formatMoney(variant.price * line.quantity)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(next) => updateQuantity(line.variantId, next)}
                  />
                  <button
                    type="button"
                    onClick={() => removeLine(line.variantId)}
                    className="text-sm text-(--color-fg-muted) underline underline-offset-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between">
          <Link href="/collections/all" className="link-underline text-sm font-medium">
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-(--color-fg-muted) underline underline-offset-4"
          >
            Clear cart
          </button>
        </div>
      </div>

      <aside className="h-fit rounded-(--radius-block) bg-(--color-bg-secondary) p-6 lg:sticky lg:top-40">
        <h2 className="t-h4">Order summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-(--color-fg-muted)">Subtotal</dt>
            <dd>{formatMoney(subtotal)}</dd>
          </div>
          {savings > 0 ? (
            <div className="flex justify-between text-(--color-primary)">
              <dt>You save</dt>
              <dd>-{formatMoney(savings)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="text-(--color-fg-muted)">Shipping</dt>
            <dd>{subtotal >= 2000 ? 'Free' : 'Calculated at checkout'}</dd>
          </div>
          <div className="flex justify-between border-t border-(--color-border) pt-3 text-base font-medium">
            <dt>Total</dt>
            <dd>{formatMoney(subtotal)}</dd>
          </div>
        </dl>

        <Link href="/checkout" className="btn btn--primary btn--lg btn--full mt-6">
          Checkout
        </Link>
        <p className="mt-3 text-center text-xs text-(--color-fg-muted)">
          Taxes calculated at checkout
        </p>
      </aside>
    </div>
  )
}
