import { Repository, ILike } from "typeorm"
import { StoreProduct } from "./StoreProduct.entity"
import { getDataSource } from "@/backend/lib/database"

export interface StoreProductFilters {
  categoryId?: string
  search?: string
}

export class StoreProductRepository {
  private repo: Repository<StoreProduct>

  constructor() {
    this.repo = {} as Repository<StoreProduct>
  }

  private async getRepo(): Promise<Repository<StoreProduct>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(StoreProduct)
    }
    return this.repo
  }

  async findByStoreWithFilters(storeId: string, filters?: StoreProductFilters): Promise<StoreProduct[]> {
    const repo = await this.getRepo()
    const where: Record<string, unknown> = { store: { id: storeId }, active: true }

    if (filters?.categoryId) {
      where.category = { id: filters.categoryId }
    }
    if (filters?.search) {
      where.product = { name: ILike(`%${filters.search}%`) }
    }

    return repo.find({
      where,
      relations: { product: true, category: true },
      order: { product: { name: "ASC" } },
    })
  }

  async findByStore(storeId: string): Promise<StoreProduct[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { store: { id: storeId }, active: true },
      relations: { product: true, category: true },
      order: { product: { name: "ASC" } },
    })
  }

  async findByStoreAndCategory(
    storeId: string,
    categoryId: string
  ): Promise<StoreProduct[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { store: { id: storeId }, category: { id: categoryId }, active: true },
      relations: { product: true, category: true },
    })
  }

  async findByStoreAndSlug(
    storeId: string,
    slug: string
  ): Promise<StoreProduct | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { store: { id: storeId }, product: { slug }, active: true },
      relations: { product: true, category: true },
    })
  }

  async findByStoreAndProductId(
    storeId: string,
    productId: string
  ): Promise<StoreProduct | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { store: { id: storeId }, product: { id: productId } },
      relations: { product: true },
    })
  }

  async findById(id: string): Promise<StoreProduct | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { id },
      relations: { product: true, category: true, store: true },
    })
  }

  async save(storeProduct: StoreProduct): Promise<StoreProduct> {
    const repo = await this.getRepo()
    return repo.save(storeProduct)
  }

  async update(id: string, data: Partial<StoreProduct>): Promise<StoreProduct | null> {
    const repo = await this.getRepo()
    await repo.update(id, data)
    return this.findById(id)
  }

  async softDelete(id: string): Promise<void> {
    const repo = await this.getRepo()
    await repo.update(id, { active: false })
  }
}
