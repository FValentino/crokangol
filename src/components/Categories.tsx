"use client"

import { useRef, useEffect, useState } from "react"
import { getCatalogCategories } from "@/backend/features/catalog/CatalogActions"
import type { CatalogCategory } from "@/lib/types"
import FloatingCandies from "./FloatingCandies"
import { CategorySkeleton, ErrorDisplay } from "./Skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const candies = [
  { emoji: "🍬", position: { top: "8%", left: "5%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍭", position: { top: "6%", right: "8%" }, animation: "float-delayed" as const, size: "text-3xl" },
  { emoji: "🍫", position: { bottom: "6%", left: "10%" }, animation: "float-slow" as const, size: "text-xl" },
  { emoji: "🍩", position: { bottom: "8%", right: "5%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍪", position: { top: "3%", left: "35%" }, animation: "float-delayed" as const, size: "text-xl" },
  { emoji: "🧁", position: { top: "12%", right: "25%" }, animation: "float-slow" as const, size: "text-2xl" },
  { emoji: "🍿", position: { bottom: "4%", left: "40%" }, animation: "float" as const, size: "text-lg" },
  { emoji: "🍡", position: { bottom: "10%", right: "30%" }, animation: "float-delayed" as const, size: "text-xl" },
]

export default function Categories() {
  const [categories, setCategories] = useState<CatalogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getCatalogCategories()
      .then((cats) => setCategories(cats))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [])

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 24 : 200
    scrollRef.current.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" })
  }

  return (
    <section id="categorias" className="relative py-20 bg-cream overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Nuestras Categorías
          </h2>
          <p className="font-body text-gray text-lg max-w-xl mx-auto">
            Todo lo que buscas para endulzar tus momentos especiales
          </p>
        </div>
        {error ? (
          <ErrorDisplay />
        ) : (
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
            <div ref={scrollRef} className="w-[90%] mx-auto flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="snap-start shrink-0 w-[140px] sm:w-[180px]">
                      <CategorySkeleton />
                    </div>
                  ))
                : categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/productos?category=${cat.slug}`}
                      data-card
                      className={`${cat.bgColor} snap-start shrink-0 w-[140px] sm:w-[180px] rounded-2xl p-5 flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-lg transition-all cursor-pointer`}
                    >
                      <span className="text-4xl mb-3">{cat.icon}</span>
                      <h3 className="font-display text-dark text-sm sm:text-base font-semibold">{cat.name}</h3>
                      <p className="font-body text-gray text-xs mt-1 leading-tight">{cat.description}</p>
                    </Link>
                  ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
