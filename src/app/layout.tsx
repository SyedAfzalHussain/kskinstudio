import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import SearchDrawer from '@/components/layout/SearchDrawer'
import NewsletterPopup from '@/components/layout/NewsletterPopup'
import QuickView from '@/components/product/QuickView'
import { UIProvider } from '@/components/layout/UIProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thekskinstudio.com'),
  title: {
    default: 'Kskinstudio – Korean skin store',
    template: '%s – Kskinstudio',
  },
  description:
    'Authentic Korean skincare, haircare and makeup delivered across Pakistan. Serums, sunscreens, toners and gift sets from the brands you actually want.',
  openGraph: {
    type: 'website',
    siteName: 'Kskinstudio',
    title: 'Kskinstudio – Korean skin store',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <a
          href="#MainContent"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-black focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>
          <UIProvider>
            <Header />
            <main id="MainContent">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchDrawer />
            <QuickView />
            <NewsletterPopup />
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  )
}
