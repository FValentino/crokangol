import { Repository } from "typeorm"
import { Order, OrderStatus } from "../models/Order.entity"
import { getDataSource } from "@/backend/lib/database"

export class OrderRepository {
  private repo: Repository<Order>

  constructor() {
    this.repo = {} as Repository<Order>
  }

  private async getRepo(): Promise<Repository<Order>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Order)
    }
    return this.repo
  }

  async findByStore(storeId: string): Promise<Order[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { store: { id: storeId } },
      relations: { items: true, client: true },
      order: { createdAt: "DESC" },
    })
  }

  async findById(id: string): Promise<Order | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { id },
      relations: { items: true, client: true },
    })
  }

  async findByClient(clientId: string): Promise<Order[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { client: { id: clientId } },
      relations: { items: true },
      order: { createdAt: "DESC" },
    })
  }

  async findByStatus(
    storeId: string,
    status: OrderStatus
  ): Promise<Order[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { store: { id: storeId }, status },
      relations: { items: true, client: true },
      order: { createdAt: "DESC" },
    })
  }

  async save(order: Order): Promise<Order> {
    const repo = await this.getRepo()
    return repo.save(order)
  }

  async update(
    id: string,
    data: Partial<Order>
  ): Promise<Order | null> {
    const repo = await this.getRepo()
    await repo.update(id, data)
    return this.findById(id)
  }
}
