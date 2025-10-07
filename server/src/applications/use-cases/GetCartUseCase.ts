import { Cart } from '../../domain/entities/Cart';
import { CartDAO } from '../../domain/ports/CartDAO';

export class GetCartUseCase {
  constructor(private cartDAO: CartDAO) {}

  async execute(): Promise<Output> {
    const cart = await this.cartDAO.listAllWithProducts();
    
    if (!cart) {
      return {
        isEmpty: true,
        totalPrice: 0,
        items: [],
      }; 
    }

    const items = cart.map((item: Cart) => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        stock: item.product.stock,
      },
      quantity: item.quantity,
      totalPrice: item.getTotalPrice(),
    }));

    return {
      items,
      totalPrice: items.reduce((total, item) => total + item.totalPrice, 0),
      isEmpty: items.length === 0,
    };
  }
}

type Output = {
  items: {
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      stock: number;
    };
    quantity: number;
    totalPrice: number;
  }[];
  totalPrice: number;
  isEmpty: boolean;
}
