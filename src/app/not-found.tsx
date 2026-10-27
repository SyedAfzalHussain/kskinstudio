import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-width grid min-h-[50vh] place-items-center py-20 text-center">
      <div>
        <p className="t-display-1">404</p>
        <h1 className="t-h3 mt-2">We couldn&apos;t find that page</h1>
        <p className="mt-3 text-(--color-fg-muted)">
          The link may be old, or the product may have sold out.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn--primary btn--lg">
            Back home
          </Link>
          <Link href="/collections/all" className="btn btn--outline btn--lg">
            Shop all products
          </Link>
        </div>
      </div>
    </div>
  )
}
