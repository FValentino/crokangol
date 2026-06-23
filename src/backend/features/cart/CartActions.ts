"use server"

import { CartService } from "./CartService"
import { getOrCreateCartToken } from "@/backend/lib/cart-token"
import { getCurrentStore } from "@/backend/lib/store-context"

const service = new CartService()

export async function addToCart(productId: string, quantity: number) {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  return service.addItem(token, productId, quantity)
}

export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
) {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  return service.updateItemQuantity(token, itemId, quantity)
}

export async function removeFromCart(itemId: string) {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  return service.removeItem(token, itemId)
}

export async function getCart() {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  return service.getCart(token)
}

export async function clearCart() {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  await service.clearCart(token)
}
