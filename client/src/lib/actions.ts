'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  isEmpty: boolean;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

class ServerApiClient {
  private baseURL: string;
  private userId: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    // For demo purposes, using a fixed user ID
    // In a real app, this would come from authentication
    this.userId = 'user-123';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    console.log("🚀 ~ ServerApiClient ~ request ~ url:", url)
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': this.userId,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, {
        ...config,
        // Enable caching for GET requests
        next: { revalidate: 60 } // Cache for 60 seconds
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Product API
  async getAllProducts(): Promise<Product[]> {
    return this.request<Product[]>('/api/products');
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`);
  }

  // Cart API
  async getCart(): Promise<{ cart: Cart }> {
    return this.request<{ cart: Cart }>('/api/cart');
  }

  async addToCart(data: AddToCartRequest): Promise<{ message: string; cart: Cart }> {
    console.log("🚀 ~ ServerApiClient ~ addToCart ~ data:", data)
    return this.request<{ message: string; cart: Cart }>('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

const serverApiClient = new ServerApiClient();

// Server Actions
export async function getAllProductsAction(): Promise<Product[]> {
  try {
    return await serverApiClient.getAllProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProductAction(id: string): Promise<Product> {
  try {
    return await serverApiClient.getProduct(id);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function getCartAction(): Promise<{ cart: Cart }> {
  try {
    return await serverApiClient.getCart();
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    throw new Error('Failed to fetch cart');
  }
}

export async function addToCartAction(productId: string, quantity: number = 1): Promise<{ message: string; cart: Cart }> {
  try {
    const result = await serverApiClient.addToCart({
      productId,
      quantity
    });
    
    // Revalidate cart-related pages
    revalidatePath('/');
    revalidatePath('/products');
    
    return result;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    throw new Error('Failed to add item to cart');
  }
}

// Form actions
export async function addToCartFormAction(formData: FormData) {
  const productId = formData.get('productId') as string;
  const quantity = parseInt(formData.get('quantity') as string) || 1;

  if (!productId) {
    throw new Error('Product ID is required');
  }

  try {
    await addToCartAction(productId, quantity);
  } catch (error) {
    throw error;
  }
}
