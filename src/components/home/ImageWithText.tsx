import Link from 'next/link'
import Image from 'next/image'
import { IMAGE_WITH_TEXT } from '@/data/homepage'
import Reveal from '@/components/ui/Reveal'

export default function ImageWithText() {
  return (
    <section className="page-width section-gap">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[--radius-block] bg-[--color-bg-secondary]">
            <Image
              src={IMAGE_WITH_TEXT.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="t-eyebrow text-[--color-fg-muted]">{IMAGE_WITH_TEXT.eyebrow}</p>
          <h2 className="t-display-3 mt-3">{IMAGE_WITH_TEXT.heading}</h2>
          <p className="mt-4 max-w-md text-[--color-fg-muted]">{IMAGE_WITH_TEXT.body}</p>
          <Link href={IMAGE_WITH_TEXT.cta.href} className="btn btn--primary btn--lg mt-6">
            {IMAGE_WITH_TEXT.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
