'use client'

import { useId, useState } from 'react'
import { MinusIcon, PlusIcon } from './icons'

export type AccordionItem = { q: string; a: string }

export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[]
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()

  return (
    <div className="divide-y divide-[--color-border] border-y border-[--color-border]">
      {items.map((item, i) => {
        const expanded = open === i
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium"
              >
                <span>{item.q}</span>
                <span className="shrink-0 text-[--color-fg-muted]">
                  {expanded ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel-${i}`}
              hidden={!expanded}
              className="pb-6 text-[--color-fg-muted]"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
