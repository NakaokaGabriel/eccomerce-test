import { Cart } from '../entities/Cart';

export interface CartDAO {
  listAll(): Promise<Cart[]>;
  listAllWithProducts(): Promise<Cart[]>;
  findByProductId({ productId }: { productId: string }): Promise<Cart>;
  save({ productId, quantity }: { productId: string, quantity: number }): Promise<void>;
  update({ productId, quantity }: { productId: string, quantity: number }): Promise<void>;
  delete({ id }: { id: string }): Promise<void>;
}
