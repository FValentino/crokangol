import { describe, it, expect, vi, beforeEach } from "vitest"
import { CatalogService } from "./CatalogService"
import { StoreProductRepository } from "@/backend/domain/store-product/StoreProductRepository"
import { CategoryRepository } from "@/backend/domain/category/CategoryRepository"

function createMockStoreProductRepo() {
  return {
    findByStoreWithFilters: vi.fn(),
    findByStore: vi.fn(),
    findByStoreAndCategory: vi.fn(),
    findByStoreAndSlug: vi.fn(),
  } as unknown as StoreProductRepository
}

function createMockCategoryRepo() {
  return {
    findByStore: vi.fn(),
  } as unknown as CategoryRepository
}

const mockProduct = (overrides: Record<string, unknown> = {}) => ({
  id: "1",
  name: "Chocolate",
  slug: "chocolate",
  weightKg: 1,
  lengthCm: 10,
  heightCm: 5,
  widthCm: 5,
  quantity: 12,
  description: null,
  active: true,
  photos: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

const mockStoreProduct = (overrides: Record<string, unknown> = {}) => ({
  id: "sp-1",
  store: { id: "store-1" },
  product: mockProduct(),
  category: null,
  priceType: "per_box",
  price: 100,
  minQuantity: 1,
  offerPrice: null,
  offerUntil: null,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

const mockCategory = (overrides: Record<string, unknown> = {}) => ({
  id: "cat-1",
  name: "Chocolates",
  slug: "chocolates",
  store: { id: "store-1" },
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

describe("CatalogService", () => {
  let service: CatalogService
  let storeProductRepo: ReturnType<typeof createMockStoreProductRepo>
  let categoryRepo: ReturnType<typeof createMockCategoryRepo>

  beforeEach(() => {
    storeProductRepo = createMockStoreProductRepo()
    categoryRepo = createMockCategoryRepo()
    service = new CatalogService(storeProductRepo, categoryRepo)
  })

  describe("listProducts", () => {
    it("should return all active store products for a store", async () => {
      const products = [
        mockStoreProduct(),
        mockStoreProduct({ id: "sp-2", product: mockProduct({ id: "2", name: "Caramelo" }) }),
      ]
      storeProductRepo.findByStoreWithFilters.mockResolvedValue(products)

      const result = await service.listProducts("store-1")

      expect(result).toHaveLength(2)
      expect(storeProductRepo.findByStoreWithFilters).toHaveBeenCalledWith("store-1", undefined)
    })

    it("should filter products by category", async () => {
      const products = [mockStoreProduct()]
      storeProductRepo.findByStoreWithFilters.mockResolvedValue(products)

      const result = await service.listProducts("store-1", { categoryId: "cat-1" })

      expect(result).toHaveLength(1)
      expect(storeProductRepo.findByStoreWithFilters).toHaveBeenCalledWith("store-1", { categoryId: "cat-1" })
    })

    it("should filter products by search term", async () => {
      const products = [
        mockStoreProduct({ product: mockProduct({ name: "Chocolate Blanco" }) }),
      ]
      storeProductRepo.findByStoreWithFilters.mockResolvedValue(products)

      const result = await service.listProducts("store-1", { search: "chocolate" })

      expect(result).toHaveLength(1)
      expect(result[0].product.name).toBe("Chocolate Blanco")
      expect(storeProductRepo.findByStoreWithFilters).toHaveBeenCalledWith("store-1", { search: "chocolate" })
    })
  })

  describe("getProductBySlug", () => {
    it("should return a store product by slug", async () => {
      const sp = mockStoreProduct()
      storeProductRepo.findByStoreAndSlug.mockResolvedValue(sp)

      const result = await service.getProductBySlug("store-1", "chocolate")

      expect(result).toEqual(sp)
      expect(storeProductRepo.findByStoreAndSlug).toHaveBeenCalledWith("store-1", "chocolate")
    })
  })

  describe("listCategories", () => {
    it("should return categories for a store", async () => {
      const categories = [mockCategory(), mockCategory({ id: "cat-2", name: "Snacks" })]
      categoryRepo.findByStore.mockResolvedValue(categories)

      const result = await service.listCategories("store-1")

      expect(result).toHaveLength(2)
      expect(categoryRepo.findByStore).toHaveBeenCalledWith("store-1")
    })
  })
})
