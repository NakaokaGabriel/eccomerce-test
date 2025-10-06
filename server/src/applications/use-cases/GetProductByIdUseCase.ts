import { Product } from '../../domain/entities/Product';
import { ProductDAO } from '../../domain/ports/ProductDAO';

export class GetProductByIdUseCase {
  constructor(private productDAO: ProductDAO) {}

  async execute(productId: string): Promise<Product> {
    if (!productId || productId.trim() === '') {
      throw new Error('Product ID is required');
    }

    const product = await this.productDAO.findById(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
