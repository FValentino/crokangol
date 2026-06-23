"use server"

import { StoreService } from "../services/StoreService"
import { Store } from "../models/Store.entity"

const service = new StoreService()

export async function getStores() {
  return service.list()
}

export async function getStore(id: string) {
  return service.getById(id)
}

export async function getStoreByDomain(domain: string) {
  return service.getByDomain(domain)
}

export async function createStore(data: {
  name: string
  domain: string
  uuid: string
  address?: string
  phone?: string
  email?: string
  socialLinks?: { platform: string; url: string }[]
}) {
  return service.create(data)
}

export async function updateStore(id: string, data: Partial<Store>) {
  return service.update(id, data)
}

export async function deactivateStore(id: string) {
  return service.deactivate(id)
}
