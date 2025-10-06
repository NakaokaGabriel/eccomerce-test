import { Cart } from '../../../domain/entities/Cart';
import { Product } from '../../../domain/entities/Product';
import { CartDAO } from '../../../domain/ports/CartDAO';
import { GetCartUseCase } from '../../../applications/use-cases/GetCartUseCase';

describe('GetCartUseCase', () => {
  let mockCartDAO: jest.Mocked<CartDAO>;
  let useCase: GetCartUseCase;

  beforeEach(() => {
    mockCartDAO = {
      listAll: jest.fn(),
      save: jest.fn(),
    };
    useCase = new GetCartUseCase(mockCartDAO);
  });

  describe('execute', () => {
    it('should return existing cart when found', async () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      const existingCartItem = new Cart(product, 2);
      const existingCart = [existingCartItem];

      mockCartDAO.listAll.mockResolvedValue(existingCart);

      const result = await useCase.execute();

      expect(result.items).toHaveLength(1);
      expect(result.items[0].product.id).toBe('1');
      expect(result.items[0].quantity).toBe(2);
      expect(mockCartDAO.listAll).toHaveBeenCalled();
    });

    it('should return empty cart when no cart exists', async () => {
      mockCartDAO.listAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result.isEmpty).toBe(true);
      expect(result.items).toHaveLength(0);
      expect(mockCartDAO.listAll).toHaveBeenCalled();
    });
  });
});
