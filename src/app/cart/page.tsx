import type { Metadata } from 'next'
import CartView from '@/components/cart/CartView'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review the items in your Kskinstudio cart.',
}

export default function CartPage() {
  return (
    <div className="page-width pt-8">
      <h1 className="t-display-2 mb-8">Your cart</h1>
      <CartView />
    </div>
  )
}
