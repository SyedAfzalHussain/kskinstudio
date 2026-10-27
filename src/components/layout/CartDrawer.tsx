'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'
import { useCartDetails } from '@/lib/use-cart-details'
import { formatMoney, cdnImage, splitTitle } from '@/lib/format'
import { CloseIcon, MinusIcon, PlusIcon } from '@/components/ui/icons'

const FREE_SHIPPING_THRESHOLD = 2000

export default function CartDrawer() {
  const { isOpen, closeCart, updateQuantity, removeLine, hydrated } = useCart()
  const { items, subtotal } = useCartDetails()

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="Cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-[92vw] max-w-md flex-col bg-(--color-bg) transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
          <p className="t-h4">Cart</p>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="p-2">
            <CloseIcon />
          </button>
        </div>

        {hydrated && items.length > 0 ? (
          <div className="border-b border-(--color-border) px-5 py-4">
            <p className="text-sm text-(--color-fg-muted)">
              {remaining > 0 ? (
                <>
                  You&apos;re <strong className="text-(--color-fg)">{formatMoney(remaining)}</strong>{' '}
                  away from free shipping
                </>
              ) : (
                'Congratulations — you qualify for free shipping!'
              )}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-(--color-field)">
              <div
                className="h-full rounded-full bg-black transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-5">
          {!hydrated ? null : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-(--color-fg-muted)">Your cart is empty</p>
              <Link href="/collections/all" onClick={closeCart} className="btn btn--primary">
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-(--color-border)">
              {items.map(({ line, product, variant }) => (
                <li key={line.variantId} className="flex gap-4 py-4">
                  <Link
                    href={`/products/${product.handle}`}
                    onClick={closeCart}
                    className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-(--radius-card-inner) bg-(--color-bg-secondary)"
                  >
                    {product.image ? (
                      <Image
                        src={cdnImage(variant.image ?? product.image, 200)}
                        alt={product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : null}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-medium"
                    >
                      {splitTitle(product.title).name}
                    </Link>
                    {variant.title !== 'Default Title' ? (
                      <p className="mt-0.5 text-xs text-(--color-fg-muted)">{variant.title}</p>
                    ) : null}
                    <p className="mt-1 text-sm">{formatMoney(variant.price)}</p>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-(--color-border)">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
                          className="grid h-8 w-8 place-items-center"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                          className="grid h-8 w-8 place-items-center"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.variantId)}
                        className="text-xs text-(--color-fg-muted) underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hydrated && items.length > 0 ? (
          <div className="space-y-3 border-t border-(--color-border) px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--color-fg-muted)">Subtotal</span>
              <span className="t-h5">{formatMoney(subtotal)}</span>
            </div>
            <p className="text-xs text-(--color-fg-muted)">
              Taxes and shipping calculated at checkout.
            </p>
            <Link href="/cart" onClick={closeCart} className="btn btn--secondary btn--full">
              View cart
            </Link>
            <Link href="/checkout" onClick={closeCart} className="btn btn--primary btn--full">
              Checkout
            </Link>
          </div>
        ) : null}
      </aside>
    </>
  )
}
