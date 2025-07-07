import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_SLIM_BASE_URL } from '@env';
import { Product } from '../product/Product';
import {Review} from '../review/Review';

export class ProductService extends DefaultApiService {
  constructor() {
    super(EXPO_SLIM_BASE_URL);
  }

  public async getProductsByType(endpoint: string): Promise<Product[]> {
    return this.get<Product[]>(`/${endpoint}`);
  }

  public async getProductById(id: string): Promise<Product> {
    return this.get<Product>(`/product/${id}`);
  }
  public async getReviewsByProductId(productId: number): Promise<any> {
    return this.get<Review[]>(
      `${EXPO_SLIM_BASE_URL}/reviews/product/${productId}`);
  }


  public async searchProducts(query: string): Promise<Product[]> {
    return this.get<Product[]>(`/products?search=${encodeURIComponent(query)}`);
  }
}
