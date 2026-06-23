import { Repository } from "typeorm"
import { Store } from "../models/Store.entity"
import { getDataSource } from "@/backend/lib/database"

export class StoreRepository {
  private repo: Repository<Store>

  constructor() {
    this.repo = {} as Repository<Store>
  }

  private async getRepo(): Promise<Repository<Store>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Store)
    }
    return this.repo
  }

  async findAll(): Promise<Store[]> {
    const repo = await this.getRepo()
    return repo.find()
  }

  async findActive(): Promise<Store[]> {
    const repo = await this.getRepo()
    return repo.findBy({ active: true })
  }

  async findById(id: string): Promise<Store | null> {
    const repo = await this.getRepo()
    return repo.findOneBy({ id })
  }

  async findByDomain(domain: string): Promise<Store | null> {
    const repo = await this.getRepo()
    return repo.findOneBy({ domain })
  }

  async save(store: Store): Promise<Store> {
    const repo = await this.getRepo()
    return repo.save(store)
  }

  async update(id: string, data: Partial<Store>): Promise<Store | null> {
    const repo = await this.getRepo()
    await repo.update(id, data)
    return this.findById(id)
  }

  async softDelete(id: string): Promise<void> {
    const repo = await this.getRepo()
    await repo.update(id, { active: false })
  }
}
