'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cdnImage } from '@/lib/format'
import type { ProductImage } from '@/lib/types'

export default function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[]
  title: string
}) {
  const [active, setActive] = useState(0)
  if (!images.length) {
    return <div className="aspect-square rounded-(--radius-block) bg-(--color-bg-secondary)" />
  }

  const current = images[Math.min(active, images.length - 1)]

  return (
    <div className="flex flex-col-reverse gap-4 self-start lg:sticky lg:top-28 lg:flex-row">
      {images.length > 1 ? (
        <ul className="rail gap-3 lg:w-20 lg:flex-col lg:overflow-visible">
          {images.map((image, i) => (
            <li key={image.src} className="w-16 shrink-0 lg:w-full">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-(--radius-card-inner) border transition-colors ${
                  i === active ? 'border-black' : 'border-transparent'
                }`}
              >
                <Image
                  src={cdnImage(image.src, 160)}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="relative flex-1 overflow-hidden rounded-(--radius-block) bg-(--color-bg-secondary)">
        <div className="relative aspect-square">
          <Image
            src={cdnImage(current.src, 1200)}
            alt={current.alt ?? title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  )
}
