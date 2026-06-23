import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { Store } from "@/backend/modules/stores/models/Store.entity"
import { Category } from "@/backend/modules/categories/models/Category.entity"
import { ProductPhoto } from "./ProductPhoto.entity"

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store!: Store

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: "category_id" })
  category!: Category | null

  @Column({ type: "varchar", length: 255 })
  name!: string

  @Column({ type: "varchar", length: 255 })
  slug!: string

  @Column({ type: "decimal", precision: 10, scale: 2, name: "price_per_box" })
  pricePerBox!: number

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

  @Column({ type: "boolean", default: true })
  active!: boolean

  @OneToMany(() => ProductPhoto, (photo) => photo.product, { cascade: true })
  photos!: ProductPhoto[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
