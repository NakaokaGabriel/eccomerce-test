import { Response } from 'express';
import { GetProductByIdUseCase } from '../../applications/use-cases/GetProductByIdUseCase';
import { HttpServer } from '../../contract/http/HttpServer';
import { Product } from '../../domain/entities/Product';

export class ProductController {
  constructor(
    private httpServer: HttpServer,
    private getProductByIdUseCase: GetProductByIdUseCase
  ) {
    this.httpServer.register(
      'get',
      '/products/:id',
      async ({ id }: { id: string }) => {
        const output = await this.getProductByIdUseCase.execute(id);
        const product = new Product(output.id, output.name, output.description, output.price, output.stock);

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          available: product.isAvailable(),
        }
      }
    );
  }
}
