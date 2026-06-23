import { Repository } from "typeorm"
import { Category } from "../models/Category.entity"
import { getDataSource } from "@/backend/lib/database"

export class CategoryRepository {
  private repo: Repository<Category>

  constructor() {
    this.repo = {} as Repository<Category>
  }

  private async getRepo(): Promise<Repository<Category>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Category)
    }
    return this.repo
  }

  async findByStore(storeId: string): Promise<Category[]> {
    const repo = await this.getRepo()
    return repo.find({ where: { store: { id: storeId } } })
  }

  async findById(id: string): Promise<Category | null> {
    const repo = await this.getRepo()
    return repo.findOneBy({ id })
  }

  async findBySlug(storeId: string, slug: string): Promise<Category | null> {
    const repo = await this.getRepo()
    return repo.findOne({ where: { store: { id: storeId }, slug } })
  }

  async save(category: Category): Promise<Category> {
    const repo = await this.getRepo()
    return repo.save(category)
  }

  async update(id: string, data: Partial<Category>): Promise<Category | null> {
    const repo = await this.getRepo()
    await repo.update(id, data)
    return this.findById(id)
  }

  async delete(id: string): Promise<void> {
    const repo = await this.getRepo()
    await repo.delete(id)
  }
}
