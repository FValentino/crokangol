"use server"

import { ProductService } from "./ProductService"
import { getCurrentStore } from "@/backend/lib/store-context"

const service = new ProductService()

export async function getAllProducts() {
  return service.listAll()
}

export async function getProduct(id: string) {
  return service.getById(id)
}

export async function getProductBySlug(slug: string) {
  return service.getBySlug(slug)
}

export async function createProduct(data: {
  name: string
  slug: string
  weightKg: number
  lengthCm: number
  heightCm: number
  widthCm: number
  quantity: number
  description?: string
}) {
  return service.create(data)
}

export async function updateProduct(
  id: string,
  data: Partial<import("@/backend/domain/product/Product.entity").Product>
) {
  return service.update(id, data)
}

export async function deactivateProduct(id: string) {
  return service.deactivate(id)
}

export async function linkProductToStore(data: {
  productId: string
  categoryId?: string
  priceType: "per_box" | "per_unit" | "both"
  price: number
  minQuantity?: number
}) {
  const store = await getCurrentStore()
  return service.linkProductToStore({
    storeId: store.id,
    ...data,
  })
}
