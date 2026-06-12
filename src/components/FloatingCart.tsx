"use client"

import { useCart } from "@/context/CartContext"

export default function FloatingCart() {
  const { totalItems, setOpen } = useCart()

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
      aria-label="Carrito"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-white stroke-2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-secondary text-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  )
}
