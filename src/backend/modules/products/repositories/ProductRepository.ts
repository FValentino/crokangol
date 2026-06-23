import { Repository } from "typeorm"
import { Product } from "../models/Product.entity"
import { getDataSource } from "@/backend/lib/database"

export class ProductRepository {
  private repo: Repository<Product>

  constructor() {
    this.repo = {} as Repository<Product>
  }

  private async getRepo(): Promise<Repository<Product>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Product)
    }
    return this.repo
  }

  async findByStore(storeId: string): Promise<Product[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { store: { id: storeId }, active: true },
      relations: { photos: true, category: true },
    })
  }

  async findById(id: string): Promise<Product | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { id },
      relations: { photos: true, category: true },
    })
  }

  async findBySlug(storeId: string, slug: string): Promise<Product | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { store: { id: storeId }, slug },
      relations: { photos: true, category: true },
    })
  }

  async findByCategory(
    storeId: string,
    categoryId: string
  ): Promise<Product[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: {
        store: { id: storeId },
        category: { id: categoryId },
        active: true,
      },
      relations: { photos: true, category: true },
    })
  }

  async save(product: Product): Promise<Product> {
    const repo = await this.getRepo()
    return repo.save(product)
  }

  async update(
    id: string,
    data: Partial<Product>
  ): Promise<Product | null> {
    const repo = await this.getRepo()
    await repo.update(id, data)
    return this.findById(id)
  }

  async softDelete(id: string): Promise<void> {
    const repo = await this.getRepo()
    await repo.update(id, { active: false })
  }
}
