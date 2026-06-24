import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Store } from "@/backend/domain/store/Store.entity"
import { Product } from "@/backend/domain/product/Product.entity"
import { Category } from "@/backend/domain/category/Category.entity"

export type PriceType = "per_box" | "per_unit" | "both"

@Entity("store_products")
export class StoreProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store!: Store

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: "category_id" })
  category!: Category | null

  @Column({ type: "varchar", length: 20, name: "price_type" })
  priceType!: PriceType

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number

  @Column({ type: "int", default: 1, name: "min_quantity" })
  minQuantity!: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, name: "offer_price" })
  offerPrice!: number | null

  @Column({ type: "timestamp", nullable: true, name: "offer_until" })
  offerUntil!: Date | null

  @Column({ type: "boolean", default: true })
  active!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
