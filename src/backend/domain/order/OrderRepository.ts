import { Repository } from "typeorm"
import { Order, OrderStatus } from "./Order.entity"
import { OrderItem } from "./OrderItem.entity"
import { getDataSource } from "@/backend/lib/database"

export class OrderRepository {
  private repo: Repository<Order>
  private itemRepo: Repository<OrderItem>

  constructor() {
    this.repo = {} as Repository<Order>
    this.itemRepo = {} as Repository<OrderItem>
  }

  private async getRepo(): Promise<Repository<Order>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Order)
      this.itemRepo = ds.getRepository(OrderItem)
    }
    return this.repo
  }

  async findByStore(storeId: string): Promise<Order[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { store: { id: storeId } },
      relations: { client: true },
      order: { createdAt: "DESC" },
    })
  }

  async findById(id: string): Promise<Order | null> {
    const repo = await this.getRepo()
    return repo.findOne({
      where: { id },
      relations: { client: true },
    })
  }

  async findByClient(clientId: string): Promise<Order[]> {
    const repo = await this.getRepo()
    return repo.find({
      where: { client: { id: clientId } },
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
      relations: { client: true },
      order: { createdAt: "DESC" },
    })
  }

  async findItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    await this.getRepo()
    return this.itemRepo.find({ where: { order: { id: orderId } } })
  }

  async save(order: Order): Promise<Order> {
    const repo = await this.getRepo()
    return repo.save(order)
  }

  async saveItem(item: OrderItem): Promise<OrderItem> {
    await this.getRepo()
    return this.itemRepo.save(item)
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
