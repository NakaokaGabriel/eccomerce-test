"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { apiClient } from '@/lib/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      }

      const newItem = { ...action.payload, quantity: 1 };
      const newItems = [...state.items, newItem];
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }

      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0)
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    loading: false
  });

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.getCart();

      // Convert backend cart items to frontend format
      const cartItems: CartItem[] = response.cart.items.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: getProductImage(item.product.id), // Get image from mock data
        quantity: item.quantity
      }));

      dispatch({ type: 'SET_CART', payload: cartItems });
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Helper function to get product image from mock data
  const getProductImage = (productId: string): string => {
    const mockImages: Record<string, string> = {
      '1': 'https://m.media-amazon.com/images/I/41RpmPYWXLL._UF1000,1000_QL80_.jpg',
      '2': 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg',
      '3': 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg',
      '4': 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg',
      '5': 'https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SX679_.jpg',
      '6': 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg'
    };
    return mockImages[productId] || '/product-placeholder.jpg';
  };

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiClient.addToCart({
        productId: item.id,
        quantity: 1
      });

      // Reload cart to get updated state
      await loadCart();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // Fallback to local state update
      dispatch({ type: 'ADD_ITEM', payload: item });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeItem = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // For now, we'll use local state update since there's no remove endpoint
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // For now, we'll use local state update since there's no update endpoint
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // For now, we'll use local state update since there's no clear endpoint
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
