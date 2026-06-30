import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Product } from "@/backend/domain/product/Product.entity"

@Entity("product_photos")
export class ProductPhoto {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "uuid", name: "store_id" })
  storeId!: string

  @ManyToOne(() => Product, (product) => product.photos)
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
