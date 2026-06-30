export interface CatalogProduct {
  id: string
  name: string
  slug: string
  price: number
  priceFormatted: string
  image: string | null
  categorySlug: string | null
  categoryName: string | null
  badge: string | null
}

export interface CatalogCategory {
  id: string
  name: string
  slug: string
  icon: string
  bgColor: string
  description: string
}

export type ClientType = "individual" | "business"
