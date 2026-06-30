import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity("product_photos")
export class ProductPhoto {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "uuid", name: "store_id" })
  storeId!: string

  @Column({ type: "uuid", name: "product_id" })
  productId!: string

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
