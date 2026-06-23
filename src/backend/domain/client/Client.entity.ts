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

export enum ClientType {
  INDIVIDUAL = "individual",
  BUSINESS = "business",
}

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store!: Store

  @Column({ type: "enum", enum: ClientType })
  type!: ClientType

  @Column({ type: "varchar", length: 255, nullable: true, name: "first_name" })
  firstName!: string | null

  @Column({ type: "varchar", length: 255, nullable: true, name: "last_name" })
  lastName!: string | null

  @Column({ type: "varchar", length: 255, nullable: true, name: "business_name" })
  businessName!: string | null

  @Column({ type: "varchar", length: 255, nullable: true, name: "legal_name" })
  legalName!: string | null

  @Column({ type: "varchar", length: 50 })
  phone!: string

  @Column({ type: "varchar", length: 255, nullable: true })
  email!: string | null

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
