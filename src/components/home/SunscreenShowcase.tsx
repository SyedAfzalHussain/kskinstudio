import Link from 'next/link'
import Image from 'next/image'
import { SUNSCREEN_SHOWCASE } from '@/data/homepage'
import ProductRail from '@/components/product/ProductRail'
import type { Product } from '@/lib/types'

export default function SunscreenShowcase({ products }: { products: Product[] }) {
  return (
    <section className="section-gap bg-[--color-bg-secondary]">
      <div className="page-width">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center lg:gap-14">
          <div className="relative overflow-hidden rounded-[--radius-block]">
            <div className="relative aspect-[4/5]">
              <Image
                src={SUNSCREEN_SHOWCASE.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="t-eyebrow text-white/70">{SUNSCREEN_SHOWCASE.eyebrow}</p>
              <p className="t-h3 mt-1">{SUNSCREEN_SHOWCASE.heading}</p>
              <Link href={SUNSCREEN_SHOWCASE.cta.href} className="btn btn--light btn--sm mt-4">
                {SUNSCREEN_SHOWCASE.cta.label}
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <ProductRail products={products} />
          </div>
        </div>
      </div>
    </section>
  )
}
