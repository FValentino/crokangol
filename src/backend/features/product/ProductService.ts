import { Product } from "@/backend/domain/product/Product.entity"
import { ProductRepository } from "@/backend/domain/product/ProductRepository"
import { StoreProduct } from "@/backend/domain/store-product/StoreProduct.entity"
import { StoreProductRepository } from "@/backend/domain/store-product/StoreProductRepository"
import { Store } from "@/backend/domain/store/Store.entity"
import { Category } from "@/backend/domain/category/Category.entity"

export class ProductService {
  private repository: ProductRepository
  private storeProductRepo: StoreProductRepository

  constructor() {
    this.repository = new ProductRepository()
    this.storeProductRepo = new StoreProductRepository()
  }

  async listAll(): Promise<Product[]> {
    return this.repository.findAll()
  }

  async getById(id: string): Promise<Product | null> {
    return this.repository.findById(id)
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return this.repository.findBySlug(slug)
  }

  async create(data: {
    name: string
    slug: string
    weightKg: number
    lengthCm: number
    heightCm: number
    widthCm: number
    quantity: number
    description?: string
  }): Promise<Product> {
    const product = new Product()
    product.name = data.name
    product.slug = data.slug
    product.weightKg = data.weightKg
    product.lengthCm = data.lengthCm
    product.heightCm = data.heightCm
    product.widthCm = data.widthCm
    product.quantity = data.quantity
    product.description = data.description ?? null
    return this.repository.save(product)
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.repository.update(id, data)
  }

  async deactivate(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }

  /** Store-specific product linking */
  async linkProductToStore(data: {
    storeId: string
    productId: string
    categoryId?: string
    priceType: "per_box" | "per_unit" | "both"
    price: number
    minQuantity?: number
  }): Promise<StoreProduct> {
    const sp = new StoreProduct()
    sp.store = { id: data.storeId } as Store
    sp.product = { id: data.productId } as Product
    if (data.categoryId) {
      sp.category = { id: data.categoryId } as Category
    }
    sp.priceType = data.priceType
    sp.price = data.price
    sp.minQuantity = data.minQuantity ?? 1
    return this.storeProductRepo.save(sp)
  }
}
