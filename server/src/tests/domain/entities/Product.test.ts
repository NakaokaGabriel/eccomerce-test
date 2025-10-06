import { Product } from '../../../domain/entities/Product';

describe('Product', () => {
  describe('constructor', () => {
    it('should create a product with valid data', () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      
      expect(product.id).toBe('1');
      expect(product.name).toBe('Test Product');
      expect(product.description).toBe('Test Description');
      expect(product.price).toBe(10.99);
      expect(product.stock).toBe(5);
    });

    it('should throw error when id is empty', () => {
      expect(() => {
        new Product('', 'Test Product', 'Test Description', 10.99, 5);
      }).toThrow('Product ID cannot be empty');
    });

    it('should throw error when name is empty', () => {
      expect(() => {
        new Product('1', '', 'Test Description', 10.99, 5);
      }).toThrow('Product name cannot be empty');
    });

    it('should throw error when price is negative', () => {
      expect(() => {
        new Product('1', 'Test Product', 'Test Description', -10.99, 5);
      }).toThrow('Product price cannot be negative');
    });

    it('should throw error when stock is negative', () => {
      expect(() => {
        new Product('1', 'Test Product', 'Test Description', 10.99, -5);
      }).toThrow('Product stock cannot be negative');
    });
  });

  describe('isAvailable', () => {
    it('should return true when stock is greater than 0', () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      expect(product.isAvailable()).toBe(true);
    });

    it('should return false when stock is 0', () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 0);
      expect(product.isAvailable()).toBe(false);
    });
  });

  describe('hasStock', () => {
    it('should return true when requested quantity is available', () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      expect(product.hasStock(3)).toBe(true);
    });

    it('should return true when requested quantity equals stock', () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      expect(product.hasStock(5)).toBe(true);
    });

    it('should return false when requested quantity exceeds stock', () => {
      const product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
      expect(product.hasStock(6)).toBe(false);
    });
  });
});
