import type { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactForm from '@/components/layout/ContactForm'
import Accordion from '@/components/ui/Accordion'
import { FAQ } from '@/data/homepage'
import { SOCIAL_LINKS } from '@/data/navigation'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Kskinstudio team about orders, products and shipping.',
}

export default function ContactPage() {
  return (
    <div className="page-width pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      <h1 className="t-display-2">Contact Us</h1>
      <p className="mt-3 max-w-xl text-[--color-fg-muted]">
        Questions about an order, a product or your routine? Send us a message and we&apos;ll get
        back within one business day.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <ContactForm />

        <aside className="space-y-8">
          <div>
            <h2 className="t-subheading">Customer care</h2>
            <p className="mt-2 text-sm text-[--color-fg-muted]">
              Monday–Saturday, 10am–7pm PKT
            </p>
          </div>
          <div>
            <h2 className="t-subheading">Follow</h2>
            <ul className="mt-2 space-y-1">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.title}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-sm text-[--color-fg-muted] hover:text-[--color-fg]"
                  >
                    {social.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="section-gap">
        <h2 className="t-display-3 mb-8">Frequently asked</h2>
        <div className="max-w-3xl">
          <Accordion items={FAQ.items} defaultOpen={null} />
        </div>
      </section>
    </div>
  )
}
