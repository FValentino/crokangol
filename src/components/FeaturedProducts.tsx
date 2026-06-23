"use client"

import { useRef } from "react"
import { products } from "@/data/mock"
import Image from "next/image"
import FloatingCandies from "./FloatingCandies"
import { useCart } from "@/context/CartContext"

const candies = [
  { emoji: "🍪", position: { top: "5%", left: "3%" }, animation: "float-slow" as const, size: "text-2xl" },
  { emoji: "🥨", position: { top: "10%", right: "4%" }, animation: "float" as const, size: "text-xl" },
  { emoji: "🍬", position: { bottom: "5%", left: "8%" }, animation: "float-delayed" as const, size: "text-3xl" },
  { emoji: "🍫", position: { bottom: "8%", right: "6%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍭", position: { top: "2%", left: "40%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍩", position: { top: "6%", right: "30%" }, animation: "float-slow" as const, size: "text-xl" },
  { emoji: "🎂", position: { bottom: "3%", left: "35%" }, animation: "float-delayed" as const, size: "text-lg" },
  { emoji: "🍦", position: { bottom: "10%", right: "25%" }, animation: "float" as const, size: "text-2xl" },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 24 : 260
    scrollRef.current.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" })
  }

  return (
    <section id="productos" className="relative py-20 bg-white overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Productos Destacados
          </h2>
          <p className="font-body text-gray text-lg max-w-xl mx-auto">
            Los más elegidos por nuestros clientes
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-dark hover:text-primary hover:scale-110 transition-all hidden sm:flex"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-dark hover:text-primary hover:scale-110 transition-all hidden sm:flex"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div ref={scrollRef} className="w-[90%] mx-auto flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {products.map((product) => (
            <div
              key={product.id}
              data-card
              className="snap-start shrink-0 w-[200px] sm:w-[240px] bg-cream rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all shadow-sm"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover"
                />
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                      product.badge === "Más vendido"
                        ? "bg-secondary text-dark"
                        : product.badge === "Nuevo"
                          ? "bg-primary text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-dark text-base font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="font-body text-primary font-bold text-lg mb-3">{product.price}</p>
                <button
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  className="block w-full bg-primary text-white text-center font-semibold py-2.5 rounded-full text-sm hover:scale-105 transition-transform cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="text-center mt-10">
          <a
            href="/productos"
            className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/30"
          >
            Ver todos los productos →
          </a>
        </div>
      </div>
    </section>
  )
}
