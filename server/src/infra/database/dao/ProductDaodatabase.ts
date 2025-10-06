import DatabaseConnection from "../../../contract/database/Connection";
import { Product } from "../../../domain/entities/Product";
import { ProductDAO } from "../../../domain/ports/ProductDAO";

export class ProductDaoDatabase implements ProductDAO {
  constructor (private readonly connection: DatabaseConnection) {}

  async findAll(): Promise<Product[]> {
    const products = await this.connection.query<Product[]>("SELECT * FROM products");
    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.connection.query<Product[]>("SELECT * FROM products WHERE id = $1", [id]);
    return product[0];
  }
}