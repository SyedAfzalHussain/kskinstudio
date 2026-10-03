'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/types'

type Overlay = 'search' | 'nav' | null

type UIContextValue = {
  overlay: Overlay
  openSearch: () => void
  openNav: () => void
  closeOverlay: () => void
  quickView: Product | null
  setQuickView: (product: Product | null) => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [lastPath, setLastPath] = useState<string | null>(null)
  const { isOpen: cartOpen, closeCart } = useCart()
  const pathname = usePathname()

  const closeOverlay = useCallback(() => setOverlay(null), [])
  const openSearch = useCallback(() => setOverlay('search'), [])
  const openNav = useCallback(() => setOverlay('nav'), [])

  // Route changes should dismiss anything floating above the page. Adjusting
  // during render avoids a second commit with the old overlay still mounted.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOverlay(null)
    setQuickView(null)
  }

  const anyOpen = overlay !== null || cartOpen || quickView !== null

  useEffect(() => {
    document.body.dataset.overlayOpen = anyOpen ? 'true' : 'false'
    return () => {
      delete document.body.dataset.overlayOpen
    }
  }, [anyOpen])

  useEffect(() => {
    if (!anyOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setQuickView(null)
      setOverlay(null)
      closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [anyOpen, closeCart])

  const value = useMemo(
    () => ({ overlay, openSearch, openNav, closeOverlay, quickView, setQuickView }),
    [overlay, openSearch, openNav, closeOverlay, quickView],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>')
  return ctx
}
