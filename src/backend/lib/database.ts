import "reflect-metadata"
import { DataSource } from "typeorm"
import { Store } from "@/backend/modules/stores/models/Store.entity"
import { Category } from "@/backend/modules/categories/models/Category.entity"
import { Product } from "@/backend/modules/products/models/Product.entity"
import { ProductPhoto } from "@/backend/modules/products/models/ProductPhoto.entity"
import { Client } from "@/backend/modules/clients/models/Client.entity"
import { Order } from "@/backend/modules/orders/models/Order.entity"
import { OrderItem } from "@/backend/modules/orders/models/OrderItem.entity"

const entities = [
  Store,
  Category,
  Product,
  ProductPhoto,
  Client,
  Order,
  OrderItem,
]

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  entities,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
})

let initialized = false

export async function getDataSource(): Promise<DataSource> {
  if (initialized) return AppDataSource
  await AppDataSource.initialize()
  initialized = true
  return AppDataSource
}
