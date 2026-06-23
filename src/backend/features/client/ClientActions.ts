"use server"

import { ClientService } from "./ClientService"
import { Client, ClientType } from "@/backend/domain/client/Client.entity"

const service = new ClientService()

export async function getClientsByStore(storeId: string) {
  return service.listByStore(storeId)
}

export async function getClient(id: string) {
  return service.getById(id)
}

export async function createClient(data: {
  storeId: string
  type: ClientType
  firstName?: string
  lastName?: string
  businessName?: string
  legalName?: string
  phone: string
  email?: string
}) {
  return service.create(data)
}

export async function updateClient(
  id: string,
  data: Partial<Client>
) {
  return service.update(id, data)
}

export async function deleteClient(id: string) {
  await service.delete(id)
}
