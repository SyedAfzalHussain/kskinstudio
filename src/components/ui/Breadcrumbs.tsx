import Link from 'next/link'

export default function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[--color-fg-muted]">
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {crumb.href ? (
              <Link href={crumb.href} className="link-underline hover:text-[--color-fg]">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[--color-fg]">{crumb.label}</span>
            )}
            {i < trail.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
