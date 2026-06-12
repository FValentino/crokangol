"use client"

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="bg-cream rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform animate-fade-up shadow-sm"
              style={{ animationDelay: `${i * 0.08}s` }}
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
