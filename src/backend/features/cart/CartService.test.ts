import { describe, it, expect, vi, beforeEach } from "vitest"
import { CartService } from "./CartService"
import { Cart } from "@/backend/domain/cart/Cart.entity"
import { CartItem } from "@/backend/domain/cart/CartItem.entity"
import { StoreProductRepository } from "@/backend/domain/store-product/StoreProductRepository"

function createMockCartRepo() {
  return {
    findByToken: vi.fn(),
    findById: vi.fn(),
    save: vi.fn((cart: Cart) => Promise.resolve(cart)),
    saveItem: vi.fn((item: CartItem) => Promise.resolve(item)),
    deleteItem: vi.fn(),
    clearItems: vi.fn(),
  }
}

function createMockStoreProductRepo() {
  return {
    findByStoreAndProductId: vi.fn(),
  } as unknown as StoreProductRepository
}

const mockStore = { id: "store-1" }

function makeCart(overrides: Record<string, unknown> = {}): Cart {
  return {
    id: "cart-1",
    token: "token-1",
    store: mockStore as Cart["store"],
    status: "active",
    expiresAt: null,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as Cart
}

function makeStoreProduct(overrides: Record<string, unknown> = {}) {
  return {
    id: "sp-1",
    store: { id: "store-1" },
    product: {
      id: "prod-1",
      name: "Chocolate",
      slug: "chocolate",
      active: true,
      photos: [{ id: "p1", url: "/photo.jpg", isPrimary: true, sortOrder: 1 }],
    },
    priceType: "per_box",
    price: 100,
    minQuantity: 1,
    offerPrice: null,
    offerUntil: null,
    active: true,
    ...overrides,
  }
}

describe("CartService", () => {
  let service: CartService
  let cartRepo: ReturnType<typeof createMockCartRepo>
  let storeProductRepo: ReturnType<typeof createMockStoreProductRepo>

  beforeEach(() => {
    vi.clearAllMocks()
    cartRepo = createMockCartRepo()
    storeProductRepo = createMockStoreProductRepo()
    service = new CartService(cartRepo, storeProductRepo)
  })

  describe("getCart", () => {
    it("should return cart by token", async () => {
      const cart = makeCart()
      cartRepo.findByToken.mockResolvedValue(cart)

      const result = await service.getCart("token-1")

      expect(result).toEqual(cart)
      expect(cartRepo.findByToken).toHaveBeenCalledWith("token-1")
    })

    it("should return null when cart not found", async () => {
      cartRepo.findByToken.mockResolvedValue(null)

      const result = await service.getCart("invalid-token")

      expect(result).toBeNull()
    })
  })

  describe("addItem", () => {
    it("should add a new item to the cart", async () => {
      const cart = makeCart()
      const sp = makeStoreProduct()

      cartRepo.findByToken.mockResolvedValue(cart)
      storeProductRepo.findByStoreAndProductId.mockResolvedValue(sp)

      const result = await service.addItem("token-1", "prod-1", 2)

      expect(result.items).toHaveLength(1)
      expect(result.items[0].productName).toBe("Chocolate")
      expect(result.items[0].quantity).toBe(2)
      expect(result.items[0].unitPrice).toBe(100)
      expect(result.items[0].subtotal).toBe(200)
      expect(cartRepo.save).toHaveBeenCalled()
    })

    it("should increment quantity if product already in cart", async () => {
      const existingItem = {
        id: "item-1",
        productId: "prod-1",
        productName: "Chocolate",
        unitPrice: 100,
        quantity: 1,
        subtotal: 100,
      }
      const cart = makeCart({ items: [existingItem] })
      const sp = makeStoreProduct()

      cartRepo.findByToken.mockResolvedValue(cart)
      storeProductRepo.findByStoreAndProductId.mockResolvedValue(sp)

      const result = await service.addItem("token-1", "prod-1", 2)

      expect(result.items).toHaveLength(1)
      expect(existingItem.quantity).toBe(3)
      expect(existingItem.subtotal).toBe(300)
    })

    it("should throw if product not found", async () => {
      const cart = makeCart()
      cartRepo.findByToken.mockResolvedValue(cart)
      storeProductRepo.findByStoreAndProductId.mockResolvedValue(null)

      await expect(service.addItem("token-1", "invalid", 1)).rejects.toThrow(
        "Product not found"
      )
    })

    it("should throw if product is inactive", async () => {
      const cart = makeCart()
      const sp = makeStoreProduct({ product: { id: "prod-1", name: "Chocolate", active: false, photos: [] } })

      cartRepo.findByToken.mockResolvedValue(cart)
      storeProductRepo.findByStoreAndProductId.mockResolvedValue(sp)

      await expect(service.addItem("token-1", "prod-1", 1)).rejects.toThrow(
        "Product is not active"
      )
    })
  })

  describe("updateItemQuantity", () => {
    it("should update quantity and subtotal", async () => {
      const item = {
        id: "item-1",
        productId: "prod-1",
        unitPrice: 100,
        quantity: 1,
        subtotal: 100,
      }
      const cart = makeCart({ items: [item] })

      cartRepo.findByToken.mockResolvedValue(cart)
      cartRepo.findByToken.mockResolvedValueOnce(cart)
      cartRepo.findByToken.mockResolvedValueOnce({ ...cart, items: [{ ...item, quantity: 3, subtotal: 300 }] })

      await service.updateItemQuantity("token-1", "item-1", 3)

      expect(item.quantity).toBe(3)
      expect(item.subtotal).toBe(300)
      expect(cartRepo.saveItem).toHaveBeenCalledWith(item)
    })

    it("should throw if item not in cart", async () => {
      const cart = makeCart()
      cartRepo.findByToken.mockResolvedValue(cart)

      await expect(
        service.updateItemQuantity("token-1", "nonexistent", 2)
      ).rejects.toThrow("Item not found in cart")
    })
  })

  describe("removeItem", () => {
    it("should remove item from cart", async () => {
      const cart = makeCart()
      cartRepo.findByToken.mockResolvedValue(cart)
      cartRepo.findByToken.mockResolvedValueOnce(cart)
      cartRepo.findByToken.mockResolvedValueOnce(cart)

      await service.removeItem("token-1", "item-1")

      expect(cartRepo.deleteItem).toHaveBeenCalledWith("item-1")
    })

    it("should throw if cart not found", async () => {
      cartRepo.findByToken.mockResolvedValue(null)

      await expect(service.removeItem("invalid", "item-1")).rejects.toThrow(
        "Cart not found"
      )
    })
  })

  describe("clearCart", () => {
    it("should clear all items", async () => {
      const cart = makeCart()
      cartRepo.findByToken.mockResolvedValue(cart)

      await service.clearCart("token-1")

      expect(cartRepo.clearItems).toHaveBeenCalledWith("cart-1")
    })
  })
})
