import type { StoreProduct } from "@/backend/domain/store-product/StoreProduct.entity"
import type { Category } from "@/backend/domain/category/Category.entity"
import type { ProductPhoto } from "@/backend/domain/product/ProductPhoto.entity"
import type { CatalogProduct, CatalogCategory } from "./types"

function getPrimaryPhotoUrl(photos?: ProductPhoto[]): string | null {
  if (!photos || photos.length === 0) return null
  const primary = photos.find((p) => p.isPrimary)
  return (primary ?? photos[0]).url
}

const categoryMeta: Record<string, { icon: string; bgColor: string; description: string }> = {
  chocolates: { icon: "🍫", bgColor: "bg-amber-50", description: "Tabletas, bombones y más" },
  caramelos: { icon: "🍬", bgColor: "bg-pink-50", description: "Duros, blandos y ácidos" },
  galletitas: { icon: "🍪", bgColor: "bg-yellow-50", description: "Dulces y rellenas" },
  snacks: { icon: "🥨", bgColor: "bg-orange-50", description: "Salados para compartir" },
}

export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("es-AR")
}

export function mapStoreProductToCatalog(sp: StoreProduct): CatalogProduct {
  const isOffer =
    sp.offerPrice != null &&
    sp.offerUntil != null &&
    new Date(sp.offerUntil) > new Date()

  return {
    id: sp.id,
    name: sp.product.name,
    slug: sp.product.slug,
    price: isOffer ? sp.offerPrice! : sp.price,
    priceFormatted: formatPrice(isOffer ? sp.offerPrice! : sp.price),
    image: getPrimaryPhotoUrl(sp.product.photos),
    categorySlug: sp.category?.slug ?? null,
    categoryName: sp.category?.name ?? null,
    badge: isOffer ? "Oferta" : null,
  }
}

export function mapCategoryToCatalog(cat: Category): CatalogCategory {
  const meta = categoryMeta[cat.slug] ?? { icon: "🍬", bgColor: "bg-pink-50", description: "" }
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: meta.icon,
    bgColor: meta.bgColor,
    description: meta.description,
  }
}
