import { describe, it, expect, vi, beforeEach } from "vitest"
import { CheckoutService } from "./CheckoutService"

function createMockCartRepo() {
  return {
    findByToken: vi.fn(),
    findItemsByCartId: vi.fn(),
    save: vi.fn((cart: unknown) => Promise.resolve(cart)),
  }
}

function createMockClientService() {
  return {
    create: vi.fn(),
  }
}

function createMockOrderService() {
  return {
    create: vi.fn(),
  }
}

const baseInput = {
  token: "token-1",
  storePhone: "5491122334455",
  storeName: "Crokangol",
  client: {
    type: "individual" as const,
    firstName: "Juan",
    lastName: "Perez",
    phone: "1122334455",
  },
}

const mockCartItems = [
  {
    id: "ci-1",
    productId: "prod-1",
    productName: "Chocolate",
    unitPrice: 100,
    quantity: 2,
    subtotal: 200,
  },
]

function makeCart(overrides: Record<string, unknown> = {}) {
  return {
    id: "cart-1",
    token: "token-1",
    store: { id: "store-1" },
    status: "active",
    ...overrides,
  }
}

function makeClient(overrides: Record<string, unknown> = {}) {
  return {
    id: "client-1",
    store: { id: "store-1" },
    type: "individual",
    firstName: "Juan",
    lastName: "Perez",
    businessName: null,
    legalName: null,
    phone: "1122334455",
    email: null,
    ...overrides,
  }
}

function makeOrder(overrides: Record<string, unknown> = {}) {
  return {
    id: "order-1",
    store: { id: "store-1" },
    client: { id: "client-1" },
    total: 200,
    status: "pending",
    notes: null,
    ...overrides,
  }
}

describe("CheckoutService", () => {
  let service: CheckoutService
  let cartRepo: ReturnType<typeof createMockCartRepo>
  let clientService: ReturnType<typeof createMockClientService>
  let orderService: ReturnType<typeof createMockOrderService>

  beforeEach(() => {
    vi.clearAllMocks()
    cartRepo = createMockCartRepo()
    clientService = createMockClientService()
    orderService = createMockOrderService()
    service = new CheckoutService(cartRepo, clientService, orderService)
  })

  it("should complete checkout successfully", async () => {
    const cart = makeCart()
    const client = makeClient()
    const order = makeOrder()

    cartRepo.findByToken.mockResolvedValue(cart)
    cartRepo.findItemsByCartId.mockResolvedValue(mockCartItems)
    clientService.create.mockResolvedValue(client)
    orderService.create.mockResolvedValue(order)

    const result = await service.checkout(baseInput)

    expect(result.orderId).toBe("order-1")
    expect(result.total).toBe(200)
    expect(result.whatsappLink).toContain("wa.me/5491122334455")
    expect(result.whatsappLink).toContain("Crokangol")
    expect(cart.status).toBe("checked_out")
  })

  it("should throw if cart not found", async () => {
    cartRepo.findByToken.mockResolvedValue(null)

    await expect(service.checkout(baseInput)).rejects.toThrow("Cart not found")
  })

  it("should throw if cart is empty", async () => {
    cartRepo.findByToken.mockResolvedValue(makeCart())
    cartRepo.findItemsByCartId.mockResolvedValue([])

    await expect(service.checkout(baseInput)).rejects.toThrow("Cart is empty")
  })

  it("should throw if cart already checked out", async () => {
    cartRepo.findByToken.mockResolvedValue(makeCart({ status: "checked_out" }))
    cartRepo.findItemsByCartId.mockResolvedValue(mockCartItems)

    await expect(service.checkout(baseInput)).rejects.toThrow(
      "Cart already checked out"
    )
  })

  it("should create client and order with correct data", async () => {
    const cart = makeCart()
    const client = makeClient()
    const order = makeOrder()

    cartRepo.findByToken.mockResolvedValue(cart)
    cartRepo.findItemsByCartId.mockResolvedValue(mockCartItems)
    clientService.create.mockResolvedValue(client)
    orderService.create.mockResolvedValue(order)

    await service.checkout(baseInput)

    expect(clientService.create).toHaveBeenCalledWith({
      storeId: "store-1",
      type: "individual",
      firstName: "Juan",
      lastName: "Perez",
      businessName: undefined,
      legalName: undefined,
      phone: "1122334455",
      email: undefined,
    })

    expect(orderService.create).toHaveBeenCalledWith({
      storeId: "store-1",
      clientId: "client-1",
      notes: undefined,
      items: [
        {
          productId: "prod-1",
          productName: "Chocolate",
          unitPrice: 100,
          quantity: 2,
        },
      ],
    })
  })

  it("should build whatsapp link with store phone", async () => {
    const cart = makeCart()
    const client = makeClient()
    const order = makeOrder()

    cartRepo.findByToken.mockResolvedValue(cart)
    cartRepo.findItemsByCartId.mockResolvedValue(mockCartItems)
    clientService.create.mockResolvedValue(client)
    orderService.create.mockResolvedValue(order)

    const result = await service.checkout(baseInput)

    expect(result.whatsappLink).toContain("wa.me/5491122334455")
    expect(result.whatsappLink).toContain("Chocolate")
    expect(result.whatsappLink).toContain("200.00")
  })
})
