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
import { Client } from "@/backend/modules/clients/models/Client.entity"
import { OrderItem } from "./OrderItem.entity"

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled"

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store!: Store

  @ManyToOne(() => Client)
  @JoinColumn({ name: "client_id" })
  client!: Client

  @Column({ type: "decimal", precision: 12, scale: 2 })
  total!: number

  @Column({ type: "varchar", length: 50, default: "pending" })
  status!: OrderStatus

  @Column({ type: "text", nullable: true })
  notes!: string | null

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
