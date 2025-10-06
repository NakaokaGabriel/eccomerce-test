import { Product } from '../../../domain/entities/Product';
import { ProductDAO } from '../../../domain/ports/ProductDAO';
import { GetProductByIdUseCase } from '../../../applications/use-cases/GetProductByIdUseCase';

describe('GetProductByIdUseCase', () => {
  let mockProductDao: jest.Mocked<ProductDAO>;
  let useCase: GetProductByIdUseCase;

  beforeEach(() => {
    mockProductDao = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new GetProductByIdUseCase(mockProductDao);
  });

  describe('execute', () => {
    it('should return product when found', async () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      mockProductDao.findById.mockResolvedValue(product);

      const result = await useCase.execute('1');

      expect(result).toBe(product);
      expect(mockProductDao.findById).toHaveBeenCalledWith('1');
    });

    it('should throw error when product ID is empty', async () => {
      await expect(useCase.execute('')).rejects.toThrow('Product ID is required');
      await expect(useCase.execute('   ')).rejects.toThrow('Product ID is required');
    });

    it('should throw error when product is not found', async () => {
      mockProductDao.findById.mockResolvedValue(null);

      await expect(useCase.execute('999')).rejects.toThrow('Product not found');
      expect(mockProductDao.findById).toHaveBeenCalledWith('999');
    });
  });
});
