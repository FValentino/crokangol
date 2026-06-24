import { StoreProductRepository } from "@/backend/domain/store-product/StoreProductRepository"
import { CategoryRepository } from "@/backend/domain/category/CategoryRepository"

export interface CatalogFilters {
  categoryId?: string
  search?: string
}

export class CatalogService {
  private storeProductRepo: StoreProductRepository
  private categoryRepo: CategoryRepository

  constructor(
    storeProductRepo?: StoreProductRepository,
    categoryRepo?: CategoryRepository
  ) {
    this.storeProductRepo = storeProductRepo ?? new StoreProductRepository()
    this.categoryRepo = categoryRepo ?? new CategoryRepository()
  }

  async listProducts(storeId: string, filters?: CatalogFilters) {
    if (filters?.categoryId) {
      return this.storeProductRepo.findByStoreAndCategory(storeId, filters.categoryId)
    }

    const products = await this.storeProductRepo.findByStore(storeId)

    if (filters?.search) {
      const q = filters.search.toLowerCase()
      return products.filter((sp) => sp.product.name.toLowerCase().includes(q))
    }

    return products
  }

  async getProductBySlug(storeId: string, slug: string) {
    return this.storeProductRepo.findByStoreAndSlug(storeId, slug)
  }

  async listCategories(storeId: string) {
    return this.categoryRepo.findByStore(storeId)
  }
}
