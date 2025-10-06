import { Product } from '../../../domain/entities/Product';
import { Cart } from '../../../domain/entities/Cart';
import { AddToCartUseCase, AddToCartRequest } from '../../../applications/use-cases/AddToCartUseCase';
import { CartDAO } from '../../../domain/ports/CartDAO';
import { ProductDAO } from '../../../domain/ports/ProductDAO';

describe('AddToCartUseCase', () => {
  let mockCartDAO: jest.Mocked<CartDAO>;
  let mockProductDAO: jest.Mocked<ProductDAO>;
  let useCase: AddToCartUseCase;

  beforeEach(() => {
    mockCartDAO = {
      listAll: jest.fn(),
      save: jest.fn(),
    };
    mockProductDAO = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new AddToCartUseCase(mockCartDAO, mockProductDAO);
  });

  describe('execute', () => {
    const validRequest: AddToCartRequest = {
      productId: '1',
      quantity: 2,
    };

    it('should add product to new cart', async () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      mockProductDAO.findById.mockResolvedValue(product);
      mockCartDAO.listAll.mockResolvedValue([]);

      const result = await useCase.execute(validRequest);

      expect(result).toEqual([]);
      expect(mockCartDAO.save).toHaveBeenCalledWith({ productId: '1', quantity: 2 });
    });

    it('should add product to existing cart', async () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      const existingCartItem = new Cart(product, 1);
      const existingCart = [existingCartItem];

      mockProductDAO.findById.mockResolvedValue(product);
      mockCartDAO.listAll.mockResolvedValue(existingCart);

      const result = await useCase.execute(validRequest);

      expect(result).toEqual(existingCart);
      expect(mockCartDAO.save).toHaveBeenCalledWith({ productId: '1', quantity: 2 });
    });


    it('should throw error when product ID is empty', async () => {
      const request = { ...validRequest, productId: '' };
      await expect(useCase.execute(request)).rejects.toThrow('Product ID is required');
    });

    it('should throw error when quantity is 0 or negative', async () => {
      const request = { ...validRequest, quantity: 0 };
      await expect(useCase.execute(request)).rejects.toThrow('Quantity must be greater than 0');

      const request2 = { ...validRequest, quantity: -1 };
      await expect(useCase.execute(request2)).rejects.toThrow('Quantity must be greater than 0');
    });

    it('should throw error when product is not found', async () => {
      mockProductDAO.findById.mockResolvedValue(null);

      await expect(useCase.execute(validRequest)).rejects.toThrow('Product not found');
    });
  });
});
