import Image from 'next/image'
import { PRESS } from '@/data/homepage'
import Reveal from '@/components/ui/Reveal'

export default function Press() {
  return (
    <section className="page-width section-gap">
      <h2 className="t-eyebrow mb-8 text-center text-(--color-fg-muted)">{PRESS.heading}</h2>
      <ul className="grid gap-8 sm:grid-cols-3">
        {PRESS.items.map((item, i) => (
          <Reveal as="li" key={item.logo} delay={i * 80} className="text-center">
            <div className="relative mx-auto h-10 w-32">
              <Image
                src={item.logo}
                alt=""
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
            <blockquote className="mt-4 text-[1.05rem] text-(--color-fg-muted)">
              “{item.quote}”
            </blockquote>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
