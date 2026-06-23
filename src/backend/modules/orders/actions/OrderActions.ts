"use server"

import { OrderService, CreateOrderInput } from "../services/OrderService"
import { OrderStatus } from "../models/Order.entity"

const service = new OrderService()

export async function getOrdersByStore(storeId: string) {
  return service.listByStore(storeId)
}

export async function getOrder(id: string) {
  return service.getById(id)
}

export async function getOrdersByClient(clientId: string) {
  return service.getByClient(clientId)
}

export async function createOrder(input: CreateOrderInput) {
  return service.create(input)
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  return service.updateStatus(id, status)
}
