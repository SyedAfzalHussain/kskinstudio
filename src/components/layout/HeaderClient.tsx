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
      className={`sticky top-0 z-50 bg-(--color-bg) transition-shadow ${
        stuck ? 'shadow-[0_1px_0_0_var(--color-border)]' : ''
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="page-width">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2 lg:grid-cols-[116px_1fr_auto] lg:gap-10 lg:py-0">
          <button
            type="button"
            onClick={openNav}
            aria-label="Open menu"
            className="-ml-2 justify-self-start p-2 lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Logo
            size={165}
            className="w-[88px] lg:w-[116px]"
          />

          <nav
            aria-label="Main"
            className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-x-7 lg:gap-y-1"
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

          <div className="flex items-center justify-self-end gap-1 lg:gap-2">
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
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-(--color-primary) px-1 text-[0.625rem] font-medium leading-none text-white">
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
        className={`absolute inset-x-0 top-full hidden overflow-hidden border-t border-(--color-border) bg-(--color-bg) transition-[opacity,transform] lg:block ${
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
