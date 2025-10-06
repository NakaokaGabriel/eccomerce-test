export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number
  ) {
    if (!id || id.trim() === '') {
      throw new Error('Product ID cannot be empty');
    }
    if (!name || name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }
    if (price < 0) {
      throw new Error('Product price cannot be negative');
    }
    if (stock < 0) {
      throw new Error('Product stock cannot be negative');
    }
  }

  public isAvailable(): boolean {
    return this.stock > 0;
  }

  public hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }
}
