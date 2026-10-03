import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { POLICIES } from '@/data/policies'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return Object.keys(POLICIES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const policy = POLICIES[slug]
  return policy ? { title: policy.title } : { title: 'Not found' }
}

export default async function PolicyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const policy = POLICIES[slug]
  if (!policy) notFound()

  return (
    <div className="page-width page-width--narrow pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: policy.title }]} />
      <h1 className="t-display-2">{policy.title}</h1>
      <div className="rte mt-8 space-y-6">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="t-h3 text-[--color-fg]">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
