import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm"

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar", length: 255 })
  name!: string

  @Column({ type: "varchar", length: 255, unique: true })
  slug!: string

  @Column({ type: "decimal", precision: 8, scale: 3, name: "weight_kg" })
  weightKg!: number

  @Column({ type: "decimal", precision: 8, scale: 2, name: "length_cm" })
  lengthCm!: number

  @Column({ type: "decimal", precision: 8, scale: 2, name: "height_cm" })
  heightCm!: number

  @Column({ type: "decimal", precision: 8, scale: 2, name: "width_cm" })
  widthCm!: number

  @Column({ type: "int" })
  quantity!: number

  @Column({ type: "text", nullable: true })
  description!: string | null

  @OneToMany(() => ProductPhoto, (photo) => photo.product)
  photos!: ProductPhoto[]

  @Column({ type: "boolean", default: true })
  active!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

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
