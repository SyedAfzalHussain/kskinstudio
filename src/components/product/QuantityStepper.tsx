'use client'

import { MinusIcon, PlusIcon } from '@/components/ui/icons'

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="inline-flex h-12 items-center rounded-full border border-(--color-border)">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="grid h-12 w-11 place-items-center disabled:opacity-30"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        aria-label="Quantity"
        onChange={(e) => {
          const next = Number.parseInt(e.target.value, 10)
          if (!Number.isNaN(next)) onChange(Math.min(max, Math.max(min, next)))
        }}
        className="w-10 [appearance:textfield] bg-transparent text-center text-sm outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="grid h-12 w-11 place-items-center disabled:opacity-30"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
