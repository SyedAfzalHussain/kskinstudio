'use client'

import { useState } from 'react'

export default function NewsletterForm({ note }: { note: string }) {
  const [done, setDone] = useState(false)

  return (
    <div className="mt-4">
      {done ? (
        <p className="text-sm font-medium">Thanks for subscribing — your code is on its way.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
          className="flex max-w-sm gap-2"
        >
          <input
            type="email"
            required
            placeholder="Email"
            aria-label="Email"
            className="field bg-white"
          />
          <button type="submit" className="btn btn--primary">
            Join
          </button>
        </form>
      )}
      <p className="mt-3 max-w-sm text-xs text-(--color-fg-muted)">{note}</p>
    </div>
  )
}
