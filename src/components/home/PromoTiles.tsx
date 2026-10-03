import Image from 'next/image'
import Marquee from '@/components/ui/Marquee'
import { PROMO_TILES } from '@/data/homepage'

/** Word/image ticker that alternates text and rounded image chips. */
export default function PromoTiles() {
  return (
    <section className="section-gap overflow-hidden bg-black py-8 text-white">
      <Marquee duration={36}>
        {PROMO_TILES.words.map((word, i) => (
          <div key={`${word}-${i}`} className="flex shrink-0 items-center gap-8 px-8">
            <span className="t-display-3 whitespace-nowrap">{word}</span>
            <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-full">
              <Image
                src={PROMO_TILES.images[i % PROMO_TILES.images.length]}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
