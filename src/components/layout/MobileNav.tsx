'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUI } from './UIProvider'
import { brandLabel } from './MegaMenu'
import type { NavItem } from '@/data/navigation'
import type { Collection } from '@/lib/types'
import { ChevronIcon, CloseIcon } from '@/components/ui/icons'
import Logo from './Logo'

export default function MobileNav({ menu, brands }: { menu: NavItem[]; brands: Collection[] }) {
  const { overlay, closeOverlay } = useUI()
  const [submenu, setSubmenu] = useState<string | null>(null)
  const open = overlay === 'nav'
  const active = menu.find((m) => m.title === submenu)

  const close = () => {
    closeOverlay()
    setSubmenu(null)
  }

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col bg-(--color-bg) transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-3">
          <Logo size={96} className="w-[84px]" />
          <button type="button" onClick={close} aria-label="Close menu" className="p-2">
            <CloseIcon />
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {/* Root level */}
          <nav
            className={`absolute inset-0 overflow-y-auto px-5 py-4 transition-transform duration-300 ${
              active ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <ul className="divide-y divide-(--color-border)">
              {menu.map((item) => {
                const hasPanel = Boolean(item.columns || item.brands)
                return (
                  <li key={item.title}>
                    {hasPanel ? (
                      <button
                        type="button"
                        onClick={() => setSubmenu(item.title)}
                        className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium"
                      >
                        {item.title}
                        <ChevronIcon className="h-4 w-4 text-(--color-fg-muted)" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-3.5 text-base font-medium"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 space-y-2 border-t border-(--color-border) pt-6 text-sm">
              <Link href="/account" onClick={close} className="block py-1">
                Log in
              </Link>
              <Link href="/search" onClick={close} className="block py-1">
                Search
              </Link>
              <Link href="/pages/contact" onClick={close} className="block py-1">
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Submenu level */}
          <nav
            className={`absolute inset-0 overflow-y-auto bg-(--color-bg) px-5 py-4 transition-transform duration-300 ${
              active ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {active ? (
              <>
                <button
                  type="button"
                  onClick={() => setSubmenu(null)}
                  className="mb-3 flex items-center gap-2 py-2 text-base font-medium"
                >
                  <ChevronIcon className="h-4 w-4 rotate-180" />
                  {active.title}
                </button>
                <Link
                  href={active.href}
                  onClick={close}
                  className="mb-4 inline-block text-sm underline underline-offset-4"
                >
                  Shop all {active.title}
                </Link>

                {active.layout === 'brands' ? (
                  <ul className="grid grid-cols-2 gap-x-4">
                    {brands.map((brand) => (
                      <li key={brand.handle}>
                        <Link
                          href={`/collections/${brand.handle}`}
                          onClick={close}
                          className="block py-2 text-sm text-(--color-fg-muted)"
                        >
                          {brandLabel(brand)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-6">
                    {active.columns?.map((column) => (
                      <div key={column.title}>
                        <p className="mb-2 text-sm font-medium">{column.title}</p>
                        <ul>
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={close}
                                className="block py-2 text-sm text-(--color-fg-muted)"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </>
  )
}
