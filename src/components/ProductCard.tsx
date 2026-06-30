import Image from "next/image"
import type { CatalogProduct } from "@/lib/types"

interface ProductCardProps {
  product: CatalogProduct
  onAdd: (product: CatalogProduct) => void
  className?: string
}

export default function ProductCard({ product, onAdd, className = "" }: ProductCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform shadow-sm ${className}`}
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
          onClick={() => onAdd(product)}
          className="block w-full bg-primary text-white text-center font-semibold py-2.5 rounded-full text-sm hover:scale-105 transition-transform cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
