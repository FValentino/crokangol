import { Cart } from "@/backend/domain/cart/Cart.entity"
import { CartItem } from "@/backend/domain/cart/CartItem.entity"
import { CartRepository } from "@/backend/domain/cart/CartRepository"
import { StoreProductRepository } from "@/backend/domain/store-product/StoreProductRepository"

export class CartService {
  private cartRepo: CartRepository
  private storeProductRepo: StoreProductRepository

  constructor(cartRepo?: CartRepository, storeProductRepo?: StoreProductRepository) {
    this.cartRepo = cartRepo ?? new CartRepository()
    this.storeProductRepo = storeProductRepo ?? new StoreProductRepository()
  }

  async getCart(token: string): Promise<Cart | null> {
    return this.cartRepo.findByToken(token)
  }

  async addItem(
    token: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    const cart = await this.cartRepo.findByToken(token)
    if (!cart) throw new Error("Cart not found")

    const storeId = cart.store.id
    const storeProduct = await this.storeProductRepo.findByStoreAndProductId(storeId, productId)
    if (!storeProduct) throw new Error("Product not found")
    if (!storeProduct.product.active) throw new Error("Product is not active")

    const existing = cart.items.find((i) => i.productId === productId)
    if (existing) {
      existing.quantity += quantity
      existing.subtotal = existing.unitPrice * existing.quantity
      await this.cartRepo.saveItem(existing)
    } else {
      const item = new CartItem()
      item.cart = cart
      item.productId = productId
      item.productName = storeProduct.product.name
      item.productImage = storeProduct.product.photos?.find((p) => p.isPrimary)?.url ?? null
      item.unitPrice = storeProduct.price
      item.quantity = quantity
      item.subtotal = storeProduct.price * quantity
      cart.items.push(item)
    }

    return this.cartRepo.save(cart)
  }

  async updateItemQuantity(
    token: string,
    itemId: string,
    quantity: number
  ): Promise<Cart> {
    const cart = await this.cartRepo.findByToken(token)
    if (!cart) throw new Error("Cart not found")

    const item = cart.items.find((i) => i.id === itemId)
    if (!item) throw new Error("Item not found in cart")

    item.quantity = quantity
    item.subtotal = item.unitPrice * quantity
    await this.cartRepo.saveItem(item)

    return this.cartRepo.findByToken(token) as Promise<Cart>
  }

  async removeItem(token: string, itemId: string): Promise<Cart> {
    const cart = await this.cartRepo.findByToken(token)
    if (!cart) throw new Error("Cart not found")

    await this.cartRepo.deleteItem(itemId)
    return this.cartRepo.findByToken(token) as Promise<Cart>
  }

  async clearCart(token: string): Promise<void> {
    const cart = await this.cartRepo.findByToken(token)
    if (!cart) throw new Error("Cart not found")

    await this.cartRepo.clearItems(cart.id)
  }
}
