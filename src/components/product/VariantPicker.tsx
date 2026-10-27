'use client'

import type { Product } from '@/lib/types'

export default function VariantPicker({
  product,
  selected,
  onSelect,
  isValueAvailable,
}: {
  product: Product
  selected: string[]
  onSelect: (index: number, value: string) => void
  isValueAvailable: (index: number, value: string) => boolean
}) {
  const meaningful = product.options.filter(
    (o) => !(o.values.length === 1 && o.values[0] === 'Default Title'),
  )
  if (!meaningful.length) return null

  return (
    <div className="space-y-5">
      {product.options.map((option, index) => {
        if (option.values.length === 1 && option.values[0] === 'Default Title') return null
        return (
          <fieldset key={option.name}>
            <legend className="mb-2 text-sm">
              <span className="text-(--color-fg-muted)">{option.name}:</span>{' '}
              <span className="font-medium">{selected[index]}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const active = selected[index] === value
                const available = isValueAvailable(index, value)
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onSelect(index, value)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      active
                        ? 'border-black bg-black text-white'
                        : 'border-(--color-border) hover:border-black'
                    } ${available ? '' : 'opacity-40'}`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}
