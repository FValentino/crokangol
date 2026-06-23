import { Product } from "@/backend/domain/product/Product.entity"
import { ProductRepository } from "@/backend/domain/product/ProductRepository"
import { Store } from "@/backend/domain/store/Store.entity"
import { Category } from "@/backend/domain/category/Category.entity"

export class ProductService {
  private repository: ProductRepository

  constructor() {
    this.repository = new ProductRepository()
  }

  async listByStore(storeId: string): Promise<Product[]> {
    return this.repository.findByStore(storeId)
  }

  async getById(id: string): Promise<Product | null> {
    return this.repository.findById(id)
  }

  async getBySlug(
    storeId: string,
    slug: string
  ): Promise<Product | null> {
    return this.repository.findBySlug(storeId, slug)
  }

  async listByCategory(
    storeId: string,
    categoryId: string
  ): Promise<Product[]> {
    return this.repository.findByCategory(storeId, categoryId)
  }

  async create(data: {
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
  }): Promise<Product> {
    const product = new Product()
    product.store = { id: data.storeId } as Store
    if (data.categoryId) {
      product.category = { id: data.categoryId } as Category
    }
    product.name = data.name
    product.slug = data.slug
    product.pricePerBox = data.pricePerBox
    product.weightKg = data.weightKg
    product.lengthCm = data.lengthCm
    product.heightCm = data.heightCm
    product.widthCm = data.widthCm
    product.quantity = data.quantity
    product.description = data.description ?? null
    product.photos = []
    return this.repository.save(product)
  }

  async update(
    id: string,
    data: Partial<Product>
  ): Promise<Product | null> {
    return this.repository.update(id, data)
  }

  async deactivate(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }
}
