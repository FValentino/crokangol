import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"
import { ProductPhoto } from "./ProductPhoto.entity"

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

  @Column({ type: "boolean", default: true })
  active!: boolean

  @OneToMany(() => ProductPhoto, (photo) => photo.product, { cascade: true })
  photos!: ProductPhoto[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
