import { Client, ClientType } from "../models/Client.entity"
import { ClientRepository } from "../repositories/ClientRepository"
import { Store } from "@/backend/modules/stores/models/Store.entity"

export class ClientService {
  private repository: ClientRepository

  constructor() {
    this.repository = new ClientRepository()
  }

  async listByStore(storeId: string): Promise<Client[]> {
    return this.repository.findByStore(storeId)
  }

  async getById(id: string): Promise<Client | null> {
    return this.repository.findById(id)
  }

  async create(data: {
    storeId: string
    type: ClientType
    firstName?: string
    lastName?: string
    businessName?: string
    legalName?: string
    phone: string
    email?: string
  }): Promise<Client> {
    const client = new Client()
    client.store = { id: data.storeId } as Store
    client.type = data.type
    client.firstName = data.firstName ?? null
    client.lastName = data.lastName ?? null
    client.businessName = data.businessName ?? null
    client.legalName = data.legalName ?? null
    client.phone = data.phone
    client.email = data.email ?? null
    return this.repository.save(client)
  }

  async update(
    id: string,
    data: Partial<Client>
  ): Promise<Client | null> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
