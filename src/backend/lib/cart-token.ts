import { cookies } from "next/headers"
import { Cart } from "@/backend/domain/cart/Cart.entity"
import { CartRepository } from "@/backend/domain/cart/CartRepository"
import { StoreRepository } from "@/backend/domain/store/StoreRepository"

const TOKEN_COOKIE = "cart_token"

export async function getOrCreateCartToken(domain: string): Promise<string> {
  const cookieStore = await cookies()
  const existing = cookieStore.get(TOKEN_COOKIE)?.value

  if (existing) return existing

  const cartRepo = new CartRepository()
  const storeRepo = new StoreRepository()
  const store = await storeRepo.findByDomain(domain)
  if (!store) throw new Error(`Store not found: ${domain}`)

  const token = crypto.randomUUID()
  const cart = new Cart()
  cart.token = token
  cart.store = store
  cart.items = []
  await cartRepo.save(cart)

  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })

  return token
}

export async function getCartToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_COOKIE)?.value ?? null
}
