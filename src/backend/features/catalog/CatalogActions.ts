"use server"

import { CatalogService, CatalogFilters } from "./CatalogService"
import { getCurrentStore } from "@/backend/lib/store-context"
import { mapStoreProductToCatalog, mapCategoryToCatalog } from "@/lib/mappers"
import type { CatalogProduct, CatalogCategory } from "@/lib/types"

const service = new CatalogService()

export async function getCatalogProducts(filters?: CatalogFilters): Promise<CatalogProduct[]> {
  const store = await getCurrentStore()
  const products = await service.listProducts(store.id, filters)
  return products.map(mapStoreProductToCatalog)
}

export async function getCatalogProductBySlug(slug: string) {
  const store = await getCurrentStore()
  return service.getProductBySlug(store.id, slug)
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const store = await getCurrentStore()
  const categories = await service.listCategories(store.id)
  return categories.map(mapCategoryToCatalog)
}
