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

export type CartStatus = "active" | "checked_out" | "abandoned"

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store!: Store

  @Column({ type: "uuid", unique: true })
  token!: string

  @Column({ type: "varchar", length: 20, default: "active" })
  status!: CartStatus

  @Column({ type: "timestamp", nullable: true, name: "expires_at" })
  expiresAt!: Date | null

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
