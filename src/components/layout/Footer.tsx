import Link from 'next/link'
import { FOOTER_MENUS, SOCIAL_LINKS } from '@/data/navigation'
import { FOOTER_ABOUT, NEWSLETTER } from '@/data/homepage'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/icons'
import NewsletterForm from './NewsletterForm'
import PaymentIcons from './PaymentIcons'

const SOCIAL_ICONS = [FacebookIcon, InstagramIcon, YoutubeIcon]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[--color-border] bg-[--color-bg-secondary]">
      <div className="page-width py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="t-h3">{NEWSLETTER.heading}</p>
            <p className="mt-2 text-sm text-[--color-fg-muted]">{NEWSLETTER.body}</p>
            <NewsletterForm note={NEWSLETTER.note} />
          </div>

          <div>
            <p className="t-subheading">{FOOTER_ABOUT.heading}</p>
            <p className="mt-3 text-sm leading-relaxed text-[--color-fg-muted]">
              {FOOTER_ABOUT.body}
            </p>
            <Link
              href={FOOTER_ABOUT.cta.href}
              className="link-underline mt-3 inline-block text-sm font-medium"
            >
              {FOOTER_ABOUT.cta.label}
            </Link>
          </div>

          {FOOTER_MENUS.map((menu) => (
            <div key={menu.title}>
              <p className="t-subheading">{menu.title}</p>
              <ul className="mt-3 space-y-2">
                {menu.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-[--color-fg-muted] hover:text-[--color-fg]"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[--color-border] pt-6">
          {SOCIAL_LINKS.map((social, i) => {
            const Icon = SOCIAL_ICONS[i] ?? FacebookIcon
            return (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.title}
                className="text-[--color-fg-muted] transition-colors hover:text-[--color-fg]"
              >
                <Icon />
              </a>
            )
          })}
          <div className="ml-auto">
            <PaymentIcons />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-[--color-fg-muted] lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Korean skin store.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_MENUS[0].links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
