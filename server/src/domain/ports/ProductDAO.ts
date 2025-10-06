import { Product } from '../entities/Product';

export interface ProductDAO {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
