import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Kskinstudio order.',
}

export default function CheckoutPage() {
  return (
    <div className="page-width page-width--narrow pt-6">
      <Breadcrumbs trail={[{ label: 'Home', href: '/' }, { label: 'Checkout' }]} />
      <div className="mx-auto max-w-lg py-10 text-center">
        <h1 className="t-display-3">Checkout</h1>
        <p className="mt-3 text-(--color-fg-muted)">
          This build ships with a local cart. To take real payments, point this route at Shopify
          checkout — create a cart with the Storefront API and redirect to its <code>checkoutUrl</code>.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/cart" className="btn btn--secondary btn--lg">
            Back to cart
          </Link>
          <Link href="/collections/all" className="btn btn--primary btn--lg">
            Keep shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
