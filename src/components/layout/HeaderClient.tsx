'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useUI } from './UIProvider'
import type { NavItem } from '@/data/navigation'
import type { Collection } from '@/lib/types'
import Logo from './Logo'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/icons'

export default function HeaderClient({
  menu,
  brands,
}: {
  menu: NavItem[]
  brands: Collection[]
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [stuck, setStuck] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { count, openCart, hydrated } = useCart()
  const { openSearch, openNav } = useUI()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  /** Small grace period so diagonal pointer travel into the panel doesn't close it. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const activeItem = menu.find((m) => m.title === openMenu && (m.columns || m.brands))

  return (
    <header
      className={`sticky top-0 z-50 bg-[--color-bg] transition-shadow ${
        stuck ? 'shadow-[0_1px_0_0_var(--color-border)]' : ''
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="page-width">
        <div className="flex items-center gap-4 py-3 lg:grid lg:grid-cols-[165px_1fr_auto] lg:items-start lg:gap-8 lg:py-4">
          <button
            type="button"
            onClick={openNav}
            aria-label="Open menu"
            className="-ml-2 p-2 lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Logo
            size={165}
            className="mx-auto w-[96px] lg:mx-0 lg:w-[165px]"
          />

          <nav
            aria-label="Main"
            className="hidden self-center lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-1"
            onMouseEnter={cancelClose}
          >
            {menu.map((item) => {
              const hasPanel = Boolean(item.columns || item.brands)
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenMenu(hasPanel ? item.title : null)
                  }}
                  onFocus={() => setOpenMenu(hasPanel ? item.title : null)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={hasPanel ? openMenu === item.title : undefined}
                    className="link-underline inline-flex items-center py-1 text-[0.9375rem] font-medium"
                  >
                    {item.title}
                  </Link>
                </div>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 self-center lg:gap-2">
            <button type="button" onClick={openSearch} aria-label="Search" className="p-2">
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Log in" className="hidden p-2 lg:block">
              <UserIcon />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart${hydrated && count ? `, ${count} items` : ''}`}
              className="relative p-2"
            >
              <BagIcon />
              {hydrated && count > 0 ? (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[--color-primary] px-1 text-[0.625rem] font-medium leading-none text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu panel */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className={`absolute inset-x-0 top-full hidden overflow-hidden border-t border-[--color-border] bg-[--color-bg] transition-[opacity,transform] lg:block ${
          activeItem
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        {activeItem ? <MegaMenu item={activeItem} brands={brands} /> : null}
      </div>

      <MobileNav menu={menu} brands={brands} />
    </header>
  )
}
