import { headers } from "next/headers"
import { StoreRepository } from "@/backend/domain/store/StoreRepository"

export async function getCurrentStore() {
  const host = (await headers()).get("host")?.split(":")[0] || ""
  const repo = new StoreRepository()
  const store = await repo.findByDomain(host)
  if (!store) throw new Error(`Store not found: ${host}`)
  return store
}
