import { Request, Response } from 'express';
import { AddToCartUseCase } from '../../applications/use-cases/AddToCartUseCase';
import { GetCartUseCase } from '../../applications/use-cases/GetCartUseCase';
import { HttpServer } from '../../contract/http/HttpServer';

export class CartController {
  constructor(
    private httpServer: HttpServer,
    private addToCartUseCase: AddToCartUseCase,
    private getCartUseCase: GetCartUseCase
  ) {
    this.httpServer.register(
      'get',
      '/cart',
      async () => {
        const output = await this.getCartUseCase.execute();

        return {
          cart: output,
        };
      }
    );

    this.httpServer.register(
      "post",
      "/cart/add",
      async (_: null, { productId, quantity }: { productId: string, quantity: number }) => {
        const output = await this.addToCartUseCase.execute({
          productId,
          quantity,
        });
        
        return {
          message: 'Product added to cart successfully',
          cart: output,
        };
      }
    )
  }   
}
