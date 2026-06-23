import { Order, OrderStatus } from "@/backend/domain/order/Order.entity"
import { OrderItem } from "@/backend/domain/order/OrderItem.entity"
import { OrderRepository } from "@/backend/domain/order/OrderRepository"
import { Store } from "@/backend/domain/store/Store.entity"
import { Client } from "@/backend/domain/client/Client.entity"

export interface CreateOrderInput {
  storeId: string
  clientId: string
  notes?: string
  items: {
    productId?: string
    productName: string
    unitPrice: number
    quantity: number
  }[]
}

export class OrderService {
  private repository: OrderRepository

  constructor() {
    this.repository = new OrderRepository()
  }

  async listByStore(storeId: string): Promise<Order[]> {
    return this.repository.findByStore(storeId)
  }

  async getById(id: string): Promise<Order | null> {
    return this.repository.findById(id)
  }

  async getByClient(clientId: string): Promise<Order[]> {
    return this.repository.findByClient(clientId)
  }

  async create(input: CreateOrderInput): Promise<Order> {
    const order = new Order()
    order.store = { id: input.storeId } as Store
    order.client = { id: input.clientId } as Client
    order.notes = input.notes ?? null
    order.status = "pending"

    let total = 0
    order.items = input.items.map((item) => {
      const orderItem = new OrderItem()
      orderItem.productId = item.productId ?? null
      orderItem.productName = item.productName
      orderItem.unitPrice = item.unitPrice
      orderItem.quantity = item.quantity
      orderItem.subtotal = item.unitPrice * item.quantity
      total += orderItem.subtotal
      return orderItem
    })

    order.total = total
    return this.repository.save(order)
  }

  async updateStatus(
    id: string,
    status: OrderStatus
  ): Promise<Order | null> {
    return this.repository.update(id, { status })
  }
}
