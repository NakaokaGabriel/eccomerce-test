import DatabaseConnection from "../../../contract/database/Connection";
import { Cart } from "../../../domain/entities/Cart";
import { CartDAO } from "../../../domain/ports/CartDAO";

export class CartDaoDatabase implements CartDAO {
  constructor (private readonly connection: DatabaseConnection) {}

  async listAll(): Promise<Cart[]> {
    const cart = await this.connection.query<Cart[]>("SELECT * FROM cart");
    return cart;
  }

  async save({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }): Promise<void> {
    await this.connection.query<void>("INSERT INTO cart (product_id, quantity) VALUES ($1, $2)", [productId, quantity]);
  }
}