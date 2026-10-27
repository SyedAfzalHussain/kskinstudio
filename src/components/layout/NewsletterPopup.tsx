'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { POPUP } from '@/data/homepage'
import { CloseIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/icons'
import { SOCIAL_LINKS } from '@/data/navigation'

const DISMISS_KEY = 'kskin.popup.dismissed'
const SOCIAL_ICONS = [FacebookIcon, InstagramIcon, YoutubeIcon]

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = window.sessionStorage.getItem(DISMISS_KEY) === '1'
    } catch {
      /* private mode — just show it */
    }
    if (dismissed) return
    const id = window.setTimeout(() => setOpen(true), 4000)
    return () => window.clearTimeout(id)
  }, [])

  const close = () => {
    setOpen(false)
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div onClick={close} aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={POPUP.heading}
        className="relative w-full max-w-md overflow-hidden rounded-(--radius-block) bg-(--color-bg)"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="relative aspect-[4/3]">
          <Image src={POPUP.image} alt="" fill sizes="448px" className="object-cover" />
        </div>

        <div className="px-6 py-6 text-center">
          <p className="t-display-3">{POPUP.heading}</p>
          <p className="t-display-3">{POPUP.subheading}</p>
          <p className="mt-3 text-sm text-(--color-fg-muted)">{POPUP.body}</p>

          {done ? (
            <p className="mt-5 text-sm font-medium">Thanks — check your inbox for the code.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setDone(true)
              }}
              className="mt-5 space-y-3"
            >
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                className="field text-center"
              />
              <button type="submit" className="btn btn--primary btn--full">
                {POPUP.cta}
              </button>
            </form>
          )}

          <div className="mt-5 flex justify-center gap-4">
            {SOCIAL_LINKS.map((social, i) => {
              const Icon = SOCIAL_ICONS[i] ?? FacebookIcon
              return (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.title}
                  className="text-(--color-fg-muted) transition-colors hover:text-(--color-fg)"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
