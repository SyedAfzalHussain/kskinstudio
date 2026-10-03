import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/data/homepage'
import Accordion from '@/components/ui/Accordion'

export default function FaqSection() {
  return (
    <section className="page-width section-gap">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="t-display-3">{FAQ.heading}</h2>
          <p className="mt-4 max-w-md text-[--color-fg-muted]">{FAQ.body}</p>
          <p className="mt-2 text-[--color-fg-muted]">
            {FAQ.note}{' '}
            <Link href={FAQ.cta.href} className="link-underline text-[--color-fg]">
              contact us
            </Link>
          </p>
          <Link href={FAQ.cta.href} className="btn btn--primary btn--lg mt-6">
            {FAQ.cta.label}
          </Link>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[--radius-block] lg:aspect-[4/3]">
            <Image
              src={FAQ.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:pt-4">
          <Accordion items={FAQ.items} />
        </div>
      </div>
    </section>
  )
}
