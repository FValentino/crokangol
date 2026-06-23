import { describe, it, expect, vi, beforeEach } from "vitest"
import { CatalogService } from "./CatalogService"
import { ProductRepository } from "@/backend/domain/product/ProductRepository"
import { CategoryRepository } from "@/backend/domain/category/CategoryRepository"

function createMockProductRepo() {
  return {
    findByStore: vi.fn(),
    findByCategory: vi.fn(),
    findBySlug: vi.fn(),
  } as unknown as ProductRepository
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
  pricePerBox: 100,
  weightKg: 1,
  lengthCm: 10,
  heightCm: 5,
  widthCm: 5,
  quantity: 12,
  description: null,
  active: true,
  store: { id: "store-1" },
  category: null,
  photos: [],
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
  let productRepo: ReturnType<typeof createMockProductRepo>
  let categoryRepo: ReturnType<typeof createMockCategoryRepo>

  beforeEach(() => {
    productRepo = createMockProductRepo()
    categoryRepo = createMockCategoryRepo()
    service = new CatalogService(productRepo, categoryRepo)
  })

  describe("listProducts", () => {
    it("should return all active products for a store", async () => {
      const products = [mockProduct(), mockProduct({ id: "2", name: "Caramelo" })]
      productRepo.findByStore.mockResolvedValue(products)

      const result = await service.listProducts("store-1")

      expect(result).toHaveLength(2)
      expect(productRepo.findByStore).toHaveBeenCalledWith("store-1")
    })

    it("should filter products by category", async () => {
      const products = [mockProduct()]
      productRepo.findByCategory.mockResolvedValue(products)

      const result = await service.listProducts("store-1", { categoryId: "cat-1" })

      expect(result).toHaveLength(1)
      expect(productRepo.findByCategory).toHaveBeenCalledWith("store-1", "cat-1")
    })

    it("should filter products by search term", async () => {
      const products = [
        mockProduct({ name: "Chocolate Blanco" }),
        mockProduct({ name: "Caramelo" }),
      ]
      productRepo.findByStore.mockResolvedValue(products)

      const result = await service.listProducts("store-1", { search: "chocolate" })

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Chocolate Blanco")
    })
  })

  describe("getProductBySlug", () => {
    it("should return a product by slug", async () => {
      const product = mockProduct()
      productRepo.findBySlug.mockResolvedValue(product)

      const result = await service.getProductBySlug("store-1", "chocolate")

      expect(result).toEqual(product)
      expect(productRepo.findBySlug).toHaveBeenCalledWith("store-1", "chocolate")
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
