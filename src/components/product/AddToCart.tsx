'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { useVariant } from '@/lib/use-variant'
import { formatMoney, discountPercent } from '@/lib/format'
import VariantPicker from './VariantPicker'
import QuantityStepper from './QuantityStepper'
import type { Product } from '@/lib/types'

export default function AddToCart({
  product,
  showQuantity = true,
  onAdded,
}: {
  product: Product
  showQuantity?: boolean
  onAdded?: () => void
}) {
  const { addLine } = useCart()
  const { selected, selectOption, variant, isValueAvailable } = useVariant(product)
  const [quantity, setQuantity] = useState(1)

  const price = variant?.price ?? Math.min(...product.variants.map((v) => v.price))
  const compareAt = variant?.compareAtPrice ?? null
  const off = discountPercent(price, compareAt)
  const unavailable = !variant || !variant.available

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`t-h3 ${off ? 'text-[--color-primary]' : ''}`}>{formatMoney(price)}</span>
        {compareAt && compareAt > price ? (
          <>
            <span className="text-lg text-[--color-fg-muted] line-through">
              {formatMoney(compareAt)}
            </span>
            <span className="badge" style={{ background: 'var(--color-badge-sale)' }}>
              -{off}%
            </span>
          </>
        ) : null}
      </div>

      <VariantPicker
        product={product}
        selected={selected}
        onSelect={selectOption}
        isValueAvailable={isValueAvailable}
      />

      <div className="flex flex-wrap items-center gap-3">
        {showQuantity ? <QuantityStepper value={quantity} onChange={setQuantity} /> : null}
        <button
          type="button"
          disabled={unavailable}
          onClick={() => {
            if (!variant) return
            addLine({ variantId: variant.id, productHandle: product.handle, quantity })
            onAdded?.()
          }}
          className="btn btn--primary btn--lg flex-1"
        >
          {unavailable ? 'Sold out' : 'Add to cart'}
        </button>
      </div>

      <p className="text-sm text-[--color-fg-muted]">
        {variant?.available
          ? 'In stock — ships in 1–2 business days'
          : 'Currently unavailable in this option'}
      </p>
    </div>
  )
}
