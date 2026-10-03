'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SLIDES } from '@/data/homepage'
import { ChevronIcon } from '@/components/ui/icons'

const INTERVAL = 6000

export default function Slideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused])

  const go = (next: number) => setIndex((next + SLIDES.length) % SLIDES.length)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="page-width pt-3"
    >
      <div className="relative overflow-hidden rounded-[--radius-block]">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/7]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.image}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />

              <div className="page-width absolute inset-0 flex items-center">
                <div className="max-w-lg text-white">
                  <p className="t-display-1">{slide.heading}</p>
                  <p className="mt-3 text-lg text-white/90 sm:text-xl">{slide.subheading}</p>
                  <Link href={slide.cta.href} className="btn btn--light btn--lg mt-6">
                    {slide.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 transition-colors hover:bg-white sm:grid"
        >
          <ChevronIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 transition-colors hover:bg-white sm:grid"
        >
          <ChevronIcon className="h-5 w-5" />
        </button>

        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
