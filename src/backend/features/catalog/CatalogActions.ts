"use server"

import { CatalogService, CatalogFilters } from "./CatalogService"
import { getCurrentStore } from "@/backend/lib/store-context"

const service = new CatalogService()

export async function getCatalogProducts(filters?: CatalogFilters) {
  const store = await getCurrentStore()
  return service.listProducts(store.id, filters)
}

export async function getCatalogProductBySlug(slug: string) {
  const store = await getCurrentStore()
  return service.getProductBySlug(store.id, slug)
}

export async function getCatalogCategories() {
  const store = await getCurrentStore()
  return service.listCategories(store.id)
}
