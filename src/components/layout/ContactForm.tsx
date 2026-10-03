'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="rounded-[--radius-block] bg-[--color-bg-secondary] p-8">
        <p className="t-h4">Thanks — message received.</p>
        <p className="mt-2 text-[--color-fg-muted]">
          We&apos;ll reply to your email within one business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="max-w-xl space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm">Name</span>
          <input type="text" name="name" required className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm">Email</span>
          <input type="email" name="email" required className="field" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm">Phone (optional)</span>
        <input type="tel" name="phone" className="field" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm">Message</span>
        <textarea name="message" required rows={6} className="field" />
      </label>
      <button type="submit" className="btn btn--primary btn--lg">
        Send message
      </button>
    </form>
  )
}
