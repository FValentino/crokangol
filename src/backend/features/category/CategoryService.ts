import { Category } from "@/backend/domain/category/Category.entity"
import { CategoryRepository } from "@/backend/domain/category/CategoryRepository"
import { Store } from "@/backend/domain/store/Store.entity"

export class CategoryService {
  private repository: CategoryRepository

  constructor() {
    this.repository = new CategoryRepository()
  }

  async listByStore(storeId: string): Promise<Category[]> {
    return this.repository.findByStore(storeId)
  }

  async getById(id: string): Promise<Category | null> {
    return this.repository.findById(id)
  }

  async getBySlug(
    storeId: string,
    slug: string
  ): Promise<Category | null> {
    return this.repository.findBySlug(storeId, slug)
  }

  async create(data: {
    storeId: string
    name: string
    slug: string
  }): Promise<Category> {
    const category = new Category()
    category.store = { id: data.storeId } as Store
    category.name = data.name
    category.slug = data.slug
    return this.repository.save(category)
  }

  async update(
    id: string,
    data: Partial<Category>
  ): Promise<Category | null> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
