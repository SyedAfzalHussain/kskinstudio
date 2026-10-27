import Link from 'next/link'
import Image from 'next/image'
import { CARD_IMAGES } from '@/data/homepage'
import Reveal from '@/components/ui/Reveal'

export default function CardImages() {
  return (
    <section className="page-width section-gap">
      <h2 className="t-display-3 mb-8">{CARD_IMAGES.heading}</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {CARD_IMAGES.cards.map((card, i) => (
          <Reveal as="li" key={card.href + card.heading} delay={i * 80}>
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-(--radius-block)"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="zoom-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="t-eyebrow text-white/70">{card.eyebrow}</p>
                <p className="t-h3 mt-1">{card.heading}</p>
                <p className="mt-2 max-w-xs text-sm text-white/80">{card.body}</p>
                <span className="btn btn--light btn--sm mt-4">{card.cta}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
