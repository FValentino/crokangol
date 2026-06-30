import { StoreProductRepository, StoreProductFilters } from "@/backend/domain/store-product/StoreProductRepository"
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
    return this.storeProductRepo.findByStoreWithFilters(storeId, filters as StoreProductFilters)
  }

  async getProductBySlug(storeId: string, slug: string) {
    return this.storeProductRepo.findByStoreAndSlug(storeId, slug)
  }

  async listCategories(storeId: string) {
    return this.categoryRepo.findByStore(storeId)
  }
}
