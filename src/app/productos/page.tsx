"use client"

import { useState, useMemo, useEffect } from "react"
import { getCatalogProducts } from "@/backend/features/catalog/CatalogActions"
import { getCatalogCategories } from "@/backend/features/catalog/CatalogActions"
import { addToCart } from "@/backend/features/cart/CartActions"
import { mapStoreProductToCatalog, mapCategoryToCatalog } from "@/lib/mappers"
import type { CatalogProduct, CatalogCategory } from "@/lib/types"
import { useCart } from "@/context/CartContext"
import FloatingCandies from "@/components/FloatingCandies"
import Image from "next/image"

const candies = [
  { emoji: "🍬", position: { top: "4%", left: "3%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍭", position: { top: "6%", right: "5%" }, animation: "float-delayed" as const, size: "text-3xl" },
  { emoji: "🍫", position: { bottom: "4%", left: "6%" }, animation: "float-slow" as const, size: "text-xl" },
  { emoji: "🍩", position: { bottom: "6%", right: "3%" }, animation: "float" as const, size: "text-2xl" },
]

export default function ProductosPage() {
  const { addItem } = useCart()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [categories, setCategories] = useState<CatalogCategory[]>([])

  useEffect(() => {
    Promise.all([
      getCatalogProducts().then((sp) => sp.map(mapStoreProductToCatalog)),
      getCatalogCategories().then((cats) => cats.map(mapCategoryToCatalog)),
    ]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
    })
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !selectedCategory || p.categorySlug === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory, products])

  const handleAdd = async (p: CatalogProduct) => {
    addItem({ id: p.id, name: p.name, price: p.priceFormatted, image: p.image ?? "/placeholder-product.svg" })
    await addToCart(p.id, 1)
  }

  return (
    <div className="min-h-screen pt-16 bg-cream">
      <section className="relative py-12 overflow-hidden">
        <FloatingCandies candies={candies} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl text-dark mb-2">Todos los Productos</h1>
            <p className="font-body text-gray">Encontrá lo que buscás entre nuestra variedad de golosinas</p>
          </div>

          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray text-lg">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-pastel font-body text-sm text-dark placeholder:text-gray/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                !selectedCategory ? "bg-primary text-white" : "bg-white text-dark/70 hover:bg-pastel"
              }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat.slug ? "bg-primary text-white" : "bg-white text-dark/70 hover:bg-pastel"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="font-display text-lg text-dark">No encontramos productos con ese nombre</p>
              <p className="font-body text-sm text-gray mt-1">Probá con otro término de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform shadow-sm"
                >
                  <div className="relative">
                    <Image
                      src={product.image ?? "/placeholder-product.svg"}
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
                    <h3 className="font-display text-dark text-base font-semibold mb-1">{product.name}</h3>
                    <p className="font-body text-primary font-bold text-lg mb-3">{product.priceFormatted}</p>
                    <button
                      onClick={() => handleAdd(product)}
                      className="block w-full bg-primary text-white text-center font-semibold py-2.5 rounded-full text-sm hover:scale-105 transition-transform cursor-pointer"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
