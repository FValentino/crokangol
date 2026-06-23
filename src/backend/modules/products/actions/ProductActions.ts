"use server"

import { ProductService } from "../services/ProductService"
import { Product } from "../models/Product.entity"

const service = new ProductService()

export async function getProductsByStore(storeId: string) {
  return service.listByStore(storeId)
}

export async function getProduct(id: string) {
  return service.getById(id)
}

export async function getProductBySlug(storeId: string, slug: string) {
  return service.getBySlug(storeId, slug)
}

export async function getProductsByCategory(
  storeId: string,
  categoryId: string
) {
  return service.listByCategory(storeId, categoryId)
}

export async function createProduct(data: {
  storeId: string
  categoryId?: string
  name: string
  slug: string
  pricePerBox: number
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
  data: Partial<Product>
) {
  return service.update(id, data)
}

export async function deactivateProduct(id: string) {
  return service.deactivate(id)
}
