import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Order } from "./Order.entity"

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Order

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId!: string | null

  @Column({ type: "varchar", length: 255, name: "product_name" })
  productName!: string

  @Column({ type: "decimal", precision: 10, scale: 2, name: "unit_price" })
  unitPrice!: number

  @Column({ type: "int" })
  quantity!: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal!: number

  @CreateDateColumn()
  createdAt!: Date
}
