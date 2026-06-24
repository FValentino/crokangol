import "reflect-metadata"
import { DataSource } from "typeorm"
import { Store } from "@/backend/domain/store/Store.entity"
import { Category } from "@/backend/domain/category/Category.entity"
import { Product } from "@/backend/domain/product/Product.entity"
import { ProductPhoto } from "@/backend/domain/product/ProductPhoto.entity"
import { StoreProduct } from "@/backend/domain/store-product/StoreProduct.entity"
import { Client } from "@/backend/domain/client/Client.entity"
import { Cart } from "@/backend/domain/cart/Cart.entity"
import { CartItem } from "@/backend/domain/cart/CartItem.entity"
import { Order } from "@/backend/domain/order/Order.entity"
import { OrderItem } from "@/backend/domain/order/OrderItem.entity"

const entities = [
  Store,
  Category,
  Product,
  ProductPhoto,
  StoreProduct,
  Client,
  Cart,
  CartItem,
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
