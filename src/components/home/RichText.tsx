import Link from 'next/link'

export default function RichText({
  heading,
  cta,
  className = '',
}: {
  heading: string
  cta: { label: string; href: string }
  className?: string
}) {
  return (
    <section className={`page-width section-gap ${className}`}>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <h2 className="t-display-3">{heading}</h2>
        <Link href={cta.href} className="btn btn--outline btn--lg">
          {cta.label}
        </Link>
      </div>
    </section>
  )
}
