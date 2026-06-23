"use server"

import { CategoryService } from "./CategoryService"
import { Category } from "@/backend/domain/category/Category.entity"

const service = new CategoryService()

export async function getCategoriesByStore(storeId: string) {
  return service.listByStore(storeId)
}

export async function getCategory(id: string) {
  return service.getById(id)
}

export async function createCategory(data: {
  storeId: string
  name: string
  slug: string
}) {
  return service.create(data)
}

export async function updateCategory(
  id: string,
  data: Partial<Category>
) {
  return service.update(id, data)
}

export async function deleteCategory(id: string) {
  await service.delete(id)
}
