import { Product } from '../../domain/entities/Product';
import { ProductDAO } from '../../domain/ports/ProductDAO';

export class GetAllProductsUseCase {
  constructor(private productDAO: ProductDAO) {}

  async execute(): Promise<Product[]> {
    const products = await this.productDAO.findAll();
    
    return products;
  }
}
