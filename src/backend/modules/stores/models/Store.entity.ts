import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity("stores")
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar", length: 255 })
  name!: string

  @Column({ type: "varchar", length: 255, unique: true })
  domain!: string

  @Column({ type: "uuid", unique: true })
  uuid!: string

  @Column({ type: "text", nullable: true })
  address!: string | null

  @Column({ type: "varchar", length: 50, nullable: true })
  phone!: string | null

  @Column({ type: "varchar", length: 255, nullable: true })
  email!: string | null

  @Column({ type: "jsonb", nullable: true, default: [] })
  socialLinks!: { platform: string; url: string }[] | null

  @Column({ type: "boolean", default: true })
  active!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
