import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Cart } from "./Cart.entity"

@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Cart, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart!: Cart

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId!: string | null

  @Column({ type: "varchar", length: 255, name: "product_name" })
  productName!: string

  @Column({ type: "varchar", length: 500, nullable: true, name: "product_image" })
  productImage!: string | null

  @Column({ type: "decimal", precision: 10, scale: 2, name: "unit_price" })
  unitPrice!: number

  @Column({ type: "int" })
  quantity!: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal!: number

  @CreateDateColumn()
  createdAt!: Date
}
