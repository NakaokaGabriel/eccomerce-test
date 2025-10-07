import { Product } from './Product';

export class Cart {
  constructor(
    public readonly product: Product,
    public readonly id: string,
    public readonly quantity: number
  ) {
    if (quantity <= 0) {
      throw new Error('Cart item quantity must be greater than 0');
    }
    if (!product.hasStock(quantity)) {
      throw new Error('Insufficient stock for the requested quantity');
    }
  }

  public getTotalItems(items: Cart[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  public getTotalPrice(): number {
    return this.product.price * this.quantity;
  }

  public updateQuantity(newQuantity: number): Cart {
    return new Cart(this.product, this.id, newQuantity);
  }
}
