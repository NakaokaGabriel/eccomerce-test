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

    const product = await this.productDAO.findById(request.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const findCartByProduct = await this.cartDAO.findByProductId({
      productId: request.productId
    });

    const cart = await this.cartDAO.listAll();

    if (request.quantity <= 0) {
      await this.cartDAO.delete({
        id: findCartByProduct.id
      });
      return cart;
    }

    if (findCartByProduct) {
      await this.cartDAO.update(request);

      return cart;
    }

    await this.cartDAO.save(request);
  
    return cart;
  }
}
