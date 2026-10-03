'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUI } from './UIProvider'
import { searchLite } from '@/lib/catalog-lite'
import { cdnImage, formatMoney } from '@/lib/format'
import { CloseIcon, SearchIcon } from '@/components/ui/icons'

const SUGGESTIONS = [
  { label: 'Sunscreen', href: '/collections/sunscreens' },
  { label: 'Serums', href: '/collections/serum-ampoule' },
  { label: 'Toner pads', href: '/collections/facial-pads-toner-pads' },
  { label: 'Cleansers', href: '/collections/cleansers' },
  { label: 'Gift sets', href: '/collections/olive-young-gift-sets' },
]

export default function SearchDrawer() {
  const { overlay, closeOverlay } = useUI()
  const [query, setQuery] = useState('')
  const [wasOpen, setWasOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const open = overlay === 'search'

  // Reset the field as the drawer closes, without a throwaway render pass.
  if (wasOpen !== open) {
    setWasOpen(open)
    if (!open) setQuery('')
  }

  // Focusing is a real DOM effect, so it stays in one.
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 80)
    return () => window.clearTimeout(id)
  }, [open])

  const results = useMemo(() => (query.trim() ? searchLite(query, 6) : []), [query])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    closeOverlay()
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <div
        onClick={closeOverlay}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Search"
        className={`fixed inset-x-0 top-0 z-50 max-h-[85vh] overflow-y-auto bg-[--color-bg] transition-transform duration-300 ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="page-width py-6">
          <form onSubmit={submit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[--color-fg-muted]" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products…"
                aria-label="Search for products"
                className="field pl-12"
              />
            </div>
            <button type="button" onClick={closeOverlay} aria-label="Close search" className="p-2">
              <CloseIcon />
            </button>
          </form>

          {query.trim() === '' ? (
            <div className="mt-6">
              <p className="t-eyebrow text-[--color-fg-muted]">Popular searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={closeOverlay}
                    className="btn btn--secondary btn--sm"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="mt-8 text-[--color-fg-muted]">
              No results for “{query}”. Try a brand or product type.
            </p>
          ) : (
            <>
              <ul className="mt-6 divide-y divide-[--color-border]">
                {results.map((product) => (
                  <li key={product.handle}>
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={closeOverlay}
                      className="flex items-center gap-4 py-3"
                    >
                      <span className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-[--radius-card-inner] bg-[--color-bg-secondary]">
                        {product.image ? (
                          <Image
                            src={cdnImage(product.image, 140)}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 block text-sm font-medium">
                          {product.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-[--color-fg-muted]">
                          {formatMoney(product.price)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button onClick={submit} className="btn btn--secondary btn--full mt-4">
                See all results for “{query}”
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
