import { ProductRepository } from "@/backend/domain/product/ProductRepository"
import { CategoryRepository } from "@/backend/domain/category/CategoryRepository"

export interface CatalogFilters {
  categoryId?: string
  search?: string
}

export class CatalogService {
  private productRepo: ProductRepository
  private categoryRepo: CategoryRepository

  constructor(
    productRepo?: ProductRepository,
    categoryRepo?: CategoryRepository
  ) {
    this.productRepo = productRepo ?? new ProductRepository()
    this.categoryRepo = categoryRepo ?? new CategoryRepository()
  }

  async listProducts(storeId: string, filters?: CatalogFilters) {
    if (filters?.categoryId) {
      return this.productRepo.findByCategory(storeId, filters.categoryId)
    }

    const products = await this.productRepo.findByStore(storeId)

    if (filters?.search) {
      const q = filters.search.toLowerCase()
      return products.filter((p) => p.name.toLowerCase().includes(q))
    }

    return products
  }

  async getProductBySlug(storeId: string, slug: string) {
    return this.productRepo.findBySlug(storeId, slug)
  }

  async listCategories(storeId: string) {
    return this.categoryRepo.findByStore(storeId)
  }
}
