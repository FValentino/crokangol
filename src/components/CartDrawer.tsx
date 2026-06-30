"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

function formatPrice(n: number): string {
  return "$" + n.toLocaleString("es-AR")
}

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, open, setOpen, clearCart, checkout } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.phone) {
      setError("Completá nombre, apellido y teléfono")
      return
    }
    setLoading(true)
    setError("")
    try {
      const url = await checkout({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email || undefined,
      })
      window.open(url, "_blank")
      setShowForm(false)
      setOpen(false)
    } catch {
      setError("Error al procesar el pedido. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => { setOpen(false); setShowForm(false) }}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-cream shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-pastel">
          <h2 className="font-display text-xl text-dark">Tu Carrito</h2>
          <button onClick={() => { setOpen(false); setShowForm(false) }} className="text-dark/50 hover:text-dark text-2xl leading-none" aria-label="Cerrar">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <span className="text-5xl mb-4">🛒</span>
            <p className="font-display text-lg text-dark mb-1">Carrito vacío</p>
            <p className="font-body text-sm text-gray">Agregá productos para empezar</p>
          </div>
        ) : showForm ? (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <h3 className="font-display text-lg text-dark mb-4">Tus datos</h3>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-body text-sm text-dark/70 mb-1 block">Nombre *</label>
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-pastel bg-white font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-dark/70 mb-1 block">Apellido *</label>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-pastel bg-white font-body text-sm focus:outline-none focus:border-primary"
                    placeholder="Perez"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-sm text-dark/70 mb-1 block">Teléfono *</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-pastel bg-white font-body text-sm focus:outline-none focus:border-primary"
                  placeholder="3512345678"
                />
              </div>
              <div>
                <label className="font-body text-sm text-dark/70 mb-1 block">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-pastel bg-white font-body text-sm focus:outline-none focus:border-primary"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              {error && <p className="font-body text-sm text-red-500">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 font-body text-sm text-dark/70 bg-white border border-pastel py-3 rounded-full font-semibold hover:bg-pastel transition-colors cursor-pointer"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-white font-semibold py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Procesando..." : "Confirmar Pedido"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white rounded-xl p-3 shadow-sm">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-pastel flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm text-dark font-semibold truncate">{item.name}</h3>
                    <p className="font-body text-primary font-bold text-sm mt-0.5">{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-pastel text-dark font-bold text-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        −
                      </button>
                      <span className="font-display text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-pastel text-dark font-bold text-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-gray hover:text-primary text-xs transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-pastel px-6 py-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-body text-dark font-semibold">Total</span>
                <span className="font-display text-xl text-primary font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3 rounded-full hover:scale-[1.02] transition-transform shadow-lg shadow-primary/30 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.554 4.122 1.518 5.86L.517 23.104l5.312-1.279A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.608-.512-5.146-1.398l-.37-.22-3.152.76.84-3.073-.24-.384A9.94 9.94 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Consultar por WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center font-body text-sm text-gray hover:text-primary transition-colors cursor-pointer"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
