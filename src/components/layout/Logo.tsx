import Link from 'next/link'
import Image from 'next/image'

const LOGO_SRC =
  'https://www.thekskinstudio.com/cdn/shop/files/K_Skin_Studio.jpg?v=1780610391'

/**
 * The source JPEG is a square with a lot of cream padding. Crop it to a
 * landscape window (the wordmark sits dead centre) and lift the cream to pure
 * white so it blends into the header instead of showing as a box.
 */
export default function Logo({ size = 165, className = '' }: { size?: number; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Kskinstudio — home"
      className={`relative block aspect-[5/3] overflow-hidden ${className}`}
    >
      <Image
        src={LOGO_SRC}
        alt="Kskinstudio"
        fill
        priority
        sizes={`${size}px`}
        className="object-cover [filter:brightness(1.08)_contrast(1.06)]"
      />
    </Link>
  )
}
