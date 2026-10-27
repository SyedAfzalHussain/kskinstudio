import type { ReactNode } from 'react'

export default function SectionHeading({
  eyebrow,
  heading,
  body,
  align = 'center',
  action,
}: {
  eyebrow?: string
  heading: string
  body?: string
  align?: 'center' | 'left'
  action?: ReactNode
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-3 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      }`}
    >
      {eyebrow ? <p className="t-eyebrow text-(--color-fg-muted)">{eyebrow}</p> : null}
      <h2 className="t-display-3 max-w-2xl">{heading}</h2>
      {body ? <p className="max-w-xl text-(--color-fg-muted)">{body}</p> : null}
      {action}
    </div>
  )
}
