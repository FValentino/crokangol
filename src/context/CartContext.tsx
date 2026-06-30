"use client"

import { createContext, useContext, useState, useCallback, useMemo } from "react"
import { addToCart as addToCartAction } from "@/backend/features/cart/CartActions"
import { checkout as checkoutAction } from "@/backend/features/checkout/CheckoutActions"

export interface CartItem {
  id: string
  name: string
  price: string
  priceValue: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: { id: string; name: string; price: string; image: string }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  open: boolean
  setOpen: (v: boolean) => void
  checkout: (data: { firstName: string; lastName: string; phone: string; email?: string }) => Promise<string>
}

const CartContext = createContext<CartContextType | null>(null)

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  const addItem = useCallback((product: { id: string; name: string; price: string; image: string }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceValue: parsePrice(product.price),
          quantity: 1,
          image: product.image,
        },
      ]
    })
    setOpen(true)
    addToCartAction(product.id, 1).catch(console.error)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const checkout = useCallback(
    async (data: { firstName: string; lastName: string; phone: string; email?: string }) => {
      const result = await checkoutAction({
        client: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: "individual" as any,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
        },
      })
      setItems([])
      return result.whatsappLink
    },
    [],
  )

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((s, i) => s + i.priceValue * i.quantity, 0), [items])

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, open, setOpen, checkout }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
