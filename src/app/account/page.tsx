import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Sign in to your Kskinstudio account.',
}

export default function AccountPage() {
  return (
    <div className="page-width page-width--narrow pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
      <div className="mx-auto max-w-sm py-10 text-center">
        <h1 className="t-display-3">Log in</h1>
        <p className="mt-3 text-[--color-fg-muted]">
          Customer accounts are handled by the store&apos;s commerce backend. Wire this page to
          Shopify customer accounts (or your own auth) when you connect checkout.
        </p>
        <Link href="/" className="btn btn--primary btn--lg mt-8">
          Back to shopping
        </Link>
      </div>
    </div>
  )
}
