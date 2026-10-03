import Link from 'next/link'
import Image from 'next/image'
import { COLLECTION_LIST } from '@/data/homepage'
import SectionHeading from './SectionHeading'
import Reveal from '@/components/ui/Reveal'

export default function CollectionList({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="page-width section-gap">
      <SectionHeading
        eyebrow={COLLECTION_LIST.eyebrow}
        heading={COLLECTION_LIST.heading}
        body={COLLECTION_LIST.body}
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {COLLECTION_LIST.items.map((item, i) => (
          <Reveal as="li" key={item.handle} delay={(i % 6) * 60}>
            <Link href={`/collections/${item.handle}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-[--radius-block] bg-[--color-bg-secondary]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="zoom-img object-cover"
                />
              </div>
              <p className="mt-3 text-center text-[1.05rem] font-medium">{item.title}</p>
              <p className="text-center text-sm text-[--color-fg-muted]">
                {counts[item.handle] ?? 0} products
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
