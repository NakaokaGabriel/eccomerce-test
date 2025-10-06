import { apiClient, Product } from './api';

export interface ProductWithImage extends Product {
  image: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  inStock?: boolean;
}

// Mock data for products that don't exist in the database yet
const mockProductData: Record<string, Partial<ProductWithImage>> = {
  '1': {
    image: 'https://m.media-amazon.com/images/I/41RpmPYWXLL._UF1000,1000_QL80_.jpg',
    originalPrice: 1599.99,
    rating: 4.8,
    reviews: 1247,
    badge: 'Novo',
    inStock: true
  },
  '2': {
    image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg',
    originalPrice: 2999.99,
    rating: 4.6,
    reviews: 892,
    badge: 'Oferta',
    inStock: true
  },
  '3': {
    image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg',
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 2156,
    badge: 'Popular',
    inStock: true
  },
  '4': {
    image: 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg',
    originalPrice: 699.99,
    rating: 4.5,
    reviews: 1834,
    badge: 'Mais Vendido',
    inStock: false
  },
  '5': {
    image: 'https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SX679_.jpg',
    originalPrice: 2199.99,
    rating: 4.9,
    reviews: 567,
    badge: 'Premium',
    inStock: true
  },
  '6': {
    image: 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg',
    originalPrice: 3999.99,
    rating: 4.8,
    reviews: 423,
    badge: 'Profissional',
    inStock: true
  }
};

export class ProductsService {
  async getAllProducts(): Promise<ProductWithImage[]> {
    try {
      const products = await apiClient.getAllProducts();
      return products.map(product => ({
        ...product,
        ...mockProductData[product.id],
        inStock: product.available && (mockProductData[product.id]?.inStock ?? true)
      }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Return mock data if API fails
      return this.getMockProducts();
    }
  }

  async getProduct(id: string): Promise<ProductWithImage | null> {
    try {
      const product = await apiClient.getProduct(id);
      return {
        ...product,
        ...mockProductData[product.id],
        inStock: product.available && (mockProductData[product.id]?.inStock ?? true)
      };
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  }

  private getMockProducts(): ProductWithImage[] {
    return [
      {
        id: '1',
        name: 'Smartphone Premium',
        description: 'Um smartphone de última geração com tecnologia avançada, câmera profissional de 108MP, tela OLED de 6.7 polegadas e processador de alta performance. Ideal para quem busca qualidade e inovação.',
        price: 1299.99,
        stock: 10,
        available: true,
        image: 'https://m.media-amazon.com/images/I/41RpmPYWXLL._UF1000,1000_QL80_.jpg',
        originalPrice: 1599.99,
        rating: 4.8,
        reviews: 1247,
        badge: 'Novo',
        inStock: true
      },
      {
        id: '2',
        name: 'Notebook Gamer Pro',
        description: 'Notebook gamer com RTX 4060, Intel i7 e tela 144Hz.',
        price: 2499.99,
        stock: 5,
        available: true,
        image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg',
        originalPrice: 2999.99,
        rating: 4.6,
        reviews: 892,
        badge: 'Oferta',
        inStock: true
      },
      {
        id: '3',
        name: 'Fone Bluetooth Premium',
        description: 'Fone sem fio com cancelamento de ruído e 30h de bateria.',
        price: 299.99,
        stock: 20,
        available: true,
        image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg',
        originalPrice: 399.99,
        rating: 4.7,
        reviews: 2156,
        badge: 'Popular',
        inStock: true
      },
      {
        id: '4',
        name: 'Smartwatch Fitness',
        description: 'Relógio inteligente com GPS e monitoramento de saúde.',
        price: 599.99,
        stock: 0,
        available: false,
        image: 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg',
        originalPrice: 699.99,
        rating: 4.5,
        reviews: 1834,
        badge: 'Mais Vendido',
        inStock: false
      },
      {
        id: '5',
        name: 'Tablet Pro 12.9"',
        description: 'Tablet profissional com processador M2 e tela 12.9".',
        price: 1899.99,
        stock: 8,
        available: true,
        image: 'https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SX679_.jpg',
        originalPrice: 2199.99,
        rating: 4.9,
        reviews: 567,
        badge: 'Premium',
        inStock: true
      },
      {
        id: '6',
        name: 'Câmera DSLR Profissional',
        description: 'Câmera DSLR full-frame com 4K video e lente kit.',
        price: 3299.99,
        stock: 3,
        available: true,
        image: 'https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SX679_.jpg',
        originalPrice: 3999.99,
        rating: 4.8,
        reviews: 423,
        badge: 'Profissional',
        inStock: true
      }
    ];
  }
}

export const productsService = new ProductsService();
