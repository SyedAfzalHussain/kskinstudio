'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/ui/icons'

/** Input only — results are rendered on the server from the full catalog. */
export default function SearchBox({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [lastQuery, setLastQuery] = useState(initialQuery)
  const router = useRouter()

  // Adjust state during render when the URL's query changes (React's documented
  // alternative to syncing props into state from an effect).
  if (lastQuery !== initialQuery) {
    setLastQuery(initialQuery)
    setQuery(initialQuery)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const trimmed = query.trim()
        router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search')
      }}
      role="search"
      className="relative max-w-xl"
    >
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-fg-muted)" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products…"
        aria-label="Search for products"
        className="field pl-12 pr-24"
      />
      <button type="submit" className="btn btn--primary btn--sm absolute right-1.5 top-1/2 -translate-y-1/2">
        Search
      </button>
    </form>
  )
}
