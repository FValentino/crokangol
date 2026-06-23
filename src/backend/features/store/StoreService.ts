import { Store } from "@/backend/domain/store/Store.entity"
import { StoreRepository } from "@/backend/domain/store/StoreRepository"

export class StoreService {
  private repository: StoreRepository

  constructor() {
    this.repository = new StoreRepository()
  }

  async list(): Promise<Store[]> {
    return this.repository.findActive()
  }

  async getById(id: string): Promise<Store | null> {
    return this.repository.findById(id)
  }

  async getByDomain(domain: string): Promise<Store | null> {
    return this.repository.findByDomain(domain)
  }

  async create(data: {
    name: string
    domain: string
    uuid: string
    address?: string
    phone?: string
    email?: string
    socialLinks?: { platform: string; url: string }[]
  }): Promise<Store> {
    const store = new Store()
    store.name = data.name
    store.domain = data.domain
    store.uuid = data.uuid
    store.address = data.address ?? null
    store.phone = data.phone ?? null
    store.email = data.email ?? null
    store.socialLinks = data.socialLinks ?? []
    return this.repository.save(store)
  }

  async update(
    id: string,
    data: Partial<Store>
  ): Promise<Store | null> {
    return this.repository.update(id, data)
  }

  async deactivate(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }
}
