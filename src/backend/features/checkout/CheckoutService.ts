import { CartRepository } from "@/backend/domain/cart/CartRepository"
import { ClientService } from "@/backend/features/client/ClientService"
import { OrderService } from "@/backend/features/order/OrderService"
import { generateWhatsAppLink, buildOrderMessage } from "@/backend/lib/whatsapp"
import { ClientType } from "@/backend/domain/client/Client.entity"

export interface CheckoutInput {
  token: string
  storePhone: string
  storeName: string
  client: {
    type: ClientType
    firstName?: string
    lastName?: string
    businessName?: string
    legalName?: string
    phone: string
    email?: string
  }
}

export interface CheckoutResult {
  orderId: string
  whatsappLink: string
  total: number
}

export class CheckoutService {
  private cartRepo: CartRepository
  private clientService: ClientService
  private orderService: OrderService

  constructor(
    cartRepo?: CartRepository,
    clientService?: ClientService,
    orderService?: OrderService
  ) {
    this.cartRepo = cartRepo ?? new CartRepository()
    this.clientService = clientService ?? new ClientService()
    this.orderService = orderService ?? new OrderService()
  }

  async checkout(input: CheckoutInput): Promise<CheckoutResult> {
    const cart = await this.cartRepo.findByToken(input.token)
    if (!cart) throw new Error("Cart not found")

    const items = await this.cartRepo.findItemsByCartId(cart.id)
    if (items.length === 0) throw new Error("Cart is empty")
    if (cart.status !== "active") throw new Error("Cart already checked out")

    const storeId = cart.store.id

    const client = await this.clientService.create({
      storeId,
      type: input.client.type,
      firstName: input.client.firstName,
      lastName: input.client.lastName,
      businessName: input.client.businessName,
      legalName: input.client.legalName,
      phone: input.client.phone,
      email: input.client.email,
    })

    const order = await this.orderService.create({
      storeId,
      clientId: client.id,
      notes: undefined,
      items: items.map((item) => ({
        productId: item.productId ?? undefined,
        productName: item.productName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      })),
    })

    cart.status = "checked_out"
    await this.cartRepo.save(cart)
    await this.cartRepo.clearItems(cart.id)

    const clientName =
      client.firstName && client.lastName
        ? `${client.firstName} ${client.lastName}`
        : client.businessName ?? client.phone

    const message = buildOrderMessage(
      input.storeName,
      clientName,
      items.map((i) => ({
        productName: i.productName,
        quantity: i.quantity,
        subtotal: Number(i.subtotal),
      })),
      Number(order.total)
    )

    const whatsappLink = generateWhatsAppLink(input.storePhone, message)

    return {
      orderId: order.id,
      whatsappLink,
      total: Number(order.total),
    }
  }
}
