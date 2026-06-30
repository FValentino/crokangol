"use client"

import { useEffect, useState } from "react"
import { getCatalogCategories } from "@/backend/features/catalog/CatalogActions"
import { mapCategoryToCatalog } from "@/lib/mappers"
import type { CatalogCategory } from "@/lib/types"
import FloatingCandies from "./FloatingCandies"
import { CategorySkeleton, ErrorDisplay } from "./Skeleton"

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

  useEffect(() => {
    getCatalogCategories()
      .then((cats) => setCategories(cats.map(mapCategoryToCatalog)))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [])

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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
              : categories.map((cat, i) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`${cat.bgColor} rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-lg transition-all cursor-pointer animate-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-4xl mb-3">{cat.icon}</span>
              <h3 className="font-display text-dark text-lg font-semibold">{cat.name}</h3>
              <p className="font-body text-gray text-xs mt-1">{cat.description}</p>
            </a>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
