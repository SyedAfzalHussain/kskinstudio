import Image from 'next/image'
import Marquee from '@/components/ui/Marquee'
import { BRAND_STRIP } from '@/data/homepage'

export default function BrandStrip() {
  return (
    <section className="section-gap border-y border-(--color-border)">
      <Marquee duration={40}>
        {BRAND_STRIP.map((src) => (
          <div key={src} className="relative mx-6 h-20 w-40 shrink-0 sm:mx-10 sm:h-24 sm:w-52">
            <Image src={src} alt="" fill sizes="208px" className="object-contain" />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
