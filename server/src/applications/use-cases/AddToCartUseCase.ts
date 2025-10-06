import { Cart } from '../../domain/entities/Cart';
import { CartDAO } from '../../domain/ports/CartDAO';
import { ProductDAO } from '../../domain/ports/ProductDAO';

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export class AddToCartUseCase {
  constructor(
    private cartDAO: CartDAO,
    private productDAO: ProductDAO
  ) {}

  async execute(request: AddToCartRequest): Promise<Cart[]> {
    if (!request.productId || request.productId.trim() === '') {
      throw new Error('Product ID is required');
    }
    if (request.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const product = await this.productDAO.findById(request.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    let cart = await this.cartDAO.listAll();

    await this.cartDAO.save(request);
  
    return cart;
  }
}
