import Image from 'next/image'
import { HIGHLIGHT } from '@/data/homepage'

/** Headline with inline image chips woven between the words. */
export default function HighlightText() {
  return (
    <section className="page-width section-gap">
      <p className="t-display-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <span>{HIGHLIGHT.words[0]}</span>
        <span className="relative inline-block h-11 w-20 overflow-hidden rounded-full align-middle sm:h-14 sm:w-28">
          <Image src={HIGHLIGHT.images[0]} alt="" fill sizes="112px" className="object-cover" />
        </span>
        <span>{HIGHLIGHT.words[1]}</span>
        <span>{HIGHLIGHT.words[2]}</span>
        <span className="relative inline-block h-11 w-20 overflow-hidden rounded-full align-middle sm:h-14 sm:w-28">
          <Image src={HIGHLIGHT.images[1]} alt="" fill sizes="112px" className="object-cover" />
        </span>
        <span>{HIGHLIGHT.words[3]}</span>
        <span className="relative inline-block h-11 w-20 overflow-hidden rounded-full align-middle sm:h-14 sm:w-28">
          <Image src={HIGHLIGHT.images[2]} alt="" fill sizes="112px" className="object-cover" />
        </span>
      </p>
    </section>
  )
}
