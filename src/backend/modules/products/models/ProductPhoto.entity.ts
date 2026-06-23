import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Store } from "@/backend/modules/stores/models/Store.entity"
import { Product } from "./Product.entity"

@Entity("product_photos")
export class ProductPhoto {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store!: Store

  @ManyToOne(() => Product, (product) => product.photos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product!: Product

  @Column({ type: "varchar", length: 500 })
  url!: string

  @Column({ type: "boolean", default: false, name: "is_primary" })
  isPrimary!: boolean

  @Column({ type: "int", default: 0, name: "sort_order" })
  sortOrder!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
