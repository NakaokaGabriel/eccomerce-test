import { Cart } from '../entities/Cart';

export interface CartDAO {
  listAll(): Promise<Cart[]>;
  save({ productId, quantity }: { productId: string, quantity: number }): Promise<void>;
}
