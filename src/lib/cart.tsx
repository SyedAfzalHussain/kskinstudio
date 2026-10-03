'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { CartLine } from './types'

const STORAGE_KEY = 'kskin.cart.v1'

type CartContextValue = {
  lines: CartLine[]
  count: number
  hydrated: boolean
  isOpen: boolean
  addLine: (line: CartLine) => void
  updateQuantity: (variantId: number, quantity: number) => void
  removeLine: (variantId: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (l): l is CartLine =>
        typeof l === 'object' &&
        l !== null &&
        typeof (l as CartLine).variantId === 'number' &&
        typeof (l as CartLine).productHandle === 'string' &&
        typeof (l as CartLine).quantity === 'number',
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const openedOnce = useRef(false)

  // The persisted cart can only be read after mount: doing it in a lazy
  // initializer would make the server and client render different markup.
  // This is a one-shot read from an external system, not a render cascade.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStorage())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage can be unavailable in private mode — the cart just won't persist */
    }
  }, [lines, hydrated])

  const addLine = useCallback((line: CartLine) => {
    setLines((current) => {
      const existing = current.find((l) => l.variantId === line.variantId)
      if (!existing) return [...current, line]
      return current.map((l) =>
        l.variantId === line.variantId ? { ...l, quantity: l.quantity + line.quantity } : l,
      )
    })
    openedOnce.current = true
    setIsOpen(true)
  }, [])

  const updateQuantity = useCallback((variantId: number, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((l) => l.variantId !== variantId)
        : current.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
    )
  }, [])

  const removeLine = useCallback((variantId: number) => {
    setLines((current) => current.filter((l) => l.variantId !== variantId))
  }, [])

  const clear = useCallback(() => setLines([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      hydrated,
      isOpen,
      addLine,
      updateQuantity,
      removeLine,
      clear,
      openCart,
      closeCart,
    }),
    [lines, hydrated, isOpen, addLine, updateQuantity, removeLine, clear, openCart, closeCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
