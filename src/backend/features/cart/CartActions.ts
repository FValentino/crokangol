"use server"

import { CartService } from "./CartService"
import { getOrCreateCartToken } from "@/backend/lib/cart-token"
import { getCurrentStore } from "@/backend/lib/store-context"

const service = new CartService()

export async function addToCart(productId: string, quantity: number): Promise<void> {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  await service.addItem(token, productId, quantity)
}

export async function getCartItems(): Promise<{
  id: string
  productId: string | null
  productName: string
  productImage: string | null
  unitPrice: number
  quantity: number
}[]> {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  const cart = await service.getCart(token)
  if (!cart) return []
  const items = await service.getItems(cart.token)
  return items.map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.productName,
    productImage: item.productImage,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
  }))
}

export async function clearCart() {
  const store = await getCurrentStore()
  const token = await getOrCreateCartToken(store.domain)
  await service.clearCart(token)
}
