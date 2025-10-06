import { Product } from '../../../domain/entities/Product';
import { Cart } from '../../../domain/entities/Cart';

describe('Cart (CartItem)', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product('1', 'Test Product', 'Test Description', 10.99, 5);
  });

  describe('constructor', () => {
    it('should create a cart item with valid data', () => {
      const cartItem = new Cart(product, 2);
      
      expect(cartItem.product).toBe(product);
      expect(cartItem.quantity).toBe(2);
    });

    it('should throw error when quantity is 0', () => {
      expect(() => {
        new Cart(product, 0);
      }).toThrow('Cart item quantity must be greater than 0');
    });

    it('should throw error when quantity is negative', () => {
      expect(() => {
        new Cart(product, -1);
      }).toThrow('Cart item quantity must be greater than 0');
    });

    it('should throw error when quantity exceeds product stock', () => {
      expect(() => {
        new Cart(product, 6);
      }).toThrow('Insufficient stock for the requested quantity');
    });
  });

  describe('getTotalPrice', () => {
    it('should calculate total price correctly', () => {
      const cartItem = new Cart(product, 3);
      expect(cartItem.getTotalPrice()).toBe(32.97);
    });
  });

  describe('updateQuantity', () => {
    it('should create new cart item with updated quantity', () => {
      const cartItem = new Cart(product, 2);
      const updatedItem = cartItem.updateQuantity(4);
      
      expect(updatedItem.quantity).toBe(4);
      expect(updatedItem.product).toBe(product);
      expect(cartItem.quantity).toBe(2); // Original should remain unchanged
    });
  });
});
