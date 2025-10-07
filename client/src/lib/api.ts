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

class ApiClient {
  private baseURL: string;
  private userId: string;

  constructor() {
    this.baseURL = "http://localhost:8080/api";
    // For demo purposes, using a fixed user ID
    // In a real app, this would come from authentication
    this.userId = 'user-123';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': this.userId,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
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
    return this.request<{ cart: Cart }>('/cart');
  }

  async addToCart(data: AddToCartRequest): Promise<{ message: string; cart: Cart }> {
    return this.request<{ message: string; cart: Cart }>('/cart/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
