import Link from 'next/link'
import Image from 'next/image'

const LOGO_SRC =
  'https://www.thekskinstudio.com/cdn/shop/files/K_Skin_Studio.jpg?v=1780610391&width=440'

export default function Logo({ size = 165, className = '' }: { size?: number; className?: string }) {
  return (
    <Link href="/" aria-label="Kskinstudio — home" className={`relative block ${className}`}>
      <Image
        src={LOGO_SRC}
        alt="Kskinstudio"
        width={size}
        height={size}
        priority
        sizes={`${size}px`}
        className="h-auto w-full object-contain"
      />
    </Link>
  )
}
