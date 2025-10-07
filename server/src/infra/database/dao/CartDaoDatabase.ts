import DatabaseConnection from '../../../contract/database/Connection';
import { Cart } from '../../../domain/entities/Cart';
import { Product } from '../../../domain/entities/Product';
import { CartDAO } from '../../../domain/ports/CartDAO';

export class CartDaoDatabase implements CartDAO {
  constructor(private readonly connection: DatabaseConnection) {}

  async listAll(): Promise<Cart[]> {
    const cart = await this.connection.query<Cart[]>('SELECT * FROM cart');
    return cart;
  }

  async listAllWithProducts(): Promise<Cart[]> {
    const cart = await this.connection.query<Cart[]>(
      'SELECT c.*, to_json(product) as product FROM cart c LEFT JOIN products product ON c.product_id = product.id'
    );
    return cart.map(
      item =>
        new Cart(
          new Product(
            item.product.id,
            item.product.name,
            item.product.description,
            item.product.price,
            item.product.stock
          ),
          item.id,
          item.quantity
        )
    );
  }

  async findByProductId({ productId }: { productId: string }): Promise<Cart> {
    const cart = await this.connection.query<Cart[]>(
      'SELECT * FROM cart WHERE product_id = $1',
      [productId]
    );
    return cart[0];
  }

  async save({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }): Promise<void> {
    await this.connection.query<void>(
      'INSERT INTO cart (product_id, quantity) VALUES ($1, $2)',
      [productId, quantity]
    );
  }

  async update({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }): Promise<void> {
    await this.connection.query<void>(
      'UPDATE cart SET quantity = $1 WHERE product_id = $2',
      [quantity, productId]
    );
  }

  async delete({
    id
  }: {
    id: string;
  }): Promise<void> {
    await this.connection.query<void>(
      'DELETE FROM cart WHERE id = $1',
      [id]
    );
  }
}
