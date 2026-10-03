import type { ReactNode } from 'react'

type MarqueeProps = {
  children: ReactNode
  /** Seconds for one full loop. */
  duration?: number
  direction?: 'left' | 'right'
  className?: string
  repeat?: number
}

/** Duplicates its children so the CSS translate loop is seamless. */
export default function Marquee({
  children,
  duration = 30,
  direction = 'left',
  className = '',
  repeat = 2,
}: MarqueeProps) {
  return (
    <div
      className={`marquee ${className}`}
      data-direction={direction}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div className="marquee__track" key={i} aria-hidden={i > 0}>
          {children}
        </div>
      ))}
    </div>
  )
}
