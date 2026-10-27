import Link from 'next/link'
import Image from 'next/image'
import { CATEGORY_CARDS } from '@/data/homepage'
import Reveal from '@/components/ui/Reveal'

export default function CategoryCards() {
  return (
    <section className="page-width section-gap">
      <ul className="grid gap-4 sm:grid-cols-3">
        {CATEGORY_CARDS.map((card, i) => (
          <Reveal as="li" key={card.href} delay={i * 80}>
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-(--radius-block)"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="zoom-img object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <p className="t-h3">{card.title}</p>
                <span className="mt-1 inline-block text-xs font-medium tracking-[0.08em] underline underline-offset-4">
                  VIEW MORE
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
