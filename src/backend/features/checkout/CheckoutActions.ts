"use server"

import { CheckoutService, CheckoutInput } from "./CheckoutService"
import { getCartToken } from "@/backend/lib/cart-token"
import { getCurrentStore } from "@/backend/lib/store-context"

const service = new CheckoutService()

export async function checkout(clientData: Omit<CheckoutInput, "token" | "storePhone" | "storeName">) {
  const store = await getCurrentStore()
  const token = await getCartToken()
  if (!token) throw new Error("No active cart")

  return service.checkout({
    token,
    storePhone: store.phone ?? "",
    storeName: store.name,
    client: clientData.client,
  })
}
