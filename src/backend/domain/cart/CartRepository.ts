import { Repository } from "typeorm"
import { Cart } from "./Cart.entity"
import { CartItem } from "./CartItem.entity"
import { getDataSource } from "@/backend/lib/database"

export class CartRepository {
  private repo: Repository<Cart>
  private itemRepo: Repository<CartItem>

  constructor() {
    this.repo = {} as Repository<Cart>
    this.itemRepo = {} as Repository<CartItem>
  }

  private async getRepo(): Promise<Repository<Cart>> {
    if (!this.repo.manager) {
      const ds = await getDataSource()
      this.repo = ds.getRepository(Cart)
      this.itemRepo = ds.getRepository(CartItem)
    }
    return this.repo
  }

  async findByToken(token: string): Promise<Cart | null> {
    const repo = await this.getRepo()
    return repo.findOne({ where: { token } })
  }

  async findById(id: string): Promise<Cart | null> {
    const repo = await this.getRepo()
    return repo.findOne({ where: { id } })
  }

  async findItemsByCartId(cartId: string): Promise<CartItem[]> {
    await this.getRepo()
    return this.itemRepo.find({ where: { cart: { id: cartId } } })
  }

  async save(cart: Cart): Promise<Cart> {
    const repo = await this.getRepo()
    return repo.save(cart)
  }

  async saveItem(item: CartItem): Promise<CartItem> {
    return this.itemRepo.save(item)
  }

  async deleteItem(itemId: string): Promise<void> {
    await this.itemRepo.delete(itemId)
  }

  async clearItems(cartId: string): Promise<void> {
    await this.itemRepo.delete({ cart: { id: cartId } })
  }
}
