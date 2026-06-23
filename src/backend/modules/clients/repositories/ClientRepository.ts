import { Repository } from "typeorm"
import { Client } from "../models/Client.entity"
import { getDataSource } from "@/backend/lib/database"

export class ClientRepository {
  private repo: Repository<Client>

  constructor() {
    this.repo = {} as Repository<Client>
  }

  private async getRepo(): Promise<Repository<Client>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Client)
    }
    return this.repo
  }

  async findByStore(storeId: string): Promise<Client[]> {
    const repo = await this.getRepo()
    return repo.find({ where: { store: { id: storeId } } })
  }

  async findById(id: string): Promise<Client | null> {
    const repo = await this.getRepo()
    return repo.findOneBy({ id })
  }

  async findByEmail(storeId: string, email: string): Promise<Client | null> {
    const repo = await this.getRepo()
    return repo.findOne({ where: { store: { id: storeId }, email } })
  }

  async save(client: Client): Promise<Client> {
    const repo = await this.getRepo()
    return repo.save(client)
  }

  async update(
    id: string,
    data: Partial<Client>
  ): Promise<Client | null> {
    const repo = await this.getRepo()
    await repo.update(id, data)
    return this.findById(id)
  }

  async delete(id: string): Promise<void> {
    const repo = await this.getRepo()
    await repo.delete(id)
  }
}
