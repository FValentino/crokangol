"use client"

import { useRef, useEffect, useState } from "react"
import { getCatalogProducts } from "@/backend/features/catalog/CatalogActions"
import { addToCart } from "@/backend/features/cart/CartActions"
import type { CatalogProduct } from "@/lib/types"
import FloatingCandies from "./FloatingCandies"
import ProductCard from "./ProductCard"
import { ProductCardSkeleton, ErrorDisplay } from "./Skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getCatalogProducts()
      .then((prods) => {
        setProducts(prods)
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [])

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 24 : 260
    scrollRef.current.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" })
  }

  const handleAdd = async (p: CatalogProduct) => {
    addItem({ id: p.id, name: p.name, price: p.priceFormatted, image: p.image ?? "/placeholder-product.svg" })
    await addToCart(p.id, 1)
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
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-dark hover:text-primary hover:scale-110 transition-all hidden sm:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
          {error ? (
            <ErrorDisplay />
          ) : (
            <div ref={scrollRef} className="w-[90%] mx-auto flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="snap-start shrink-0 w-[200px] sm:w-[240px]">
                      <ProductCardSkeleton />
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.id} data-card className="snap-start shrink-0 w-[200px] sm:w-[240px]">
                      <ProductCard
                        product={product}
                        onAdd={handleAdd}
                        className="bg-cream hover:shadow-lg"
                      />
                    </div>
                  ))}
            </div>
          )}
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
