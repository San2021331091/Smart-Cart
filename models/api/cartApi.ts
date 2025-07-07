import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_SLIM_BASE_URL, EXPO_FASTIFY_BASE_URL } from '@env';
import { AddToCart } from '../cart/AddToCart';
import { supabase } from '../../supabase/SupabaseClient';
import axios, { AxiosInstance } from 'axios';

export class CartService extends DefaultApiService {
  private fastifyApi: AxiosInstance;

  constructor() {
    super(EXPO_SLIM_BASE_URL);

    this.fastifyApi = axios.create({ baseURL: EXPO_FASTIFY_BASE_URL });
  }

  private async getToken(): Promise<string> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.access_token) {
      throw new Error('No valid session or token found');
    }
    return session.access_token;
  }

  public async getCartItems(): Promise<any[]> {
    return this.get('/cart_items');
  }

  public async updateCartItem(id: string, data: { quantity?: number; price?: number }) {
    return this.put(`/cart_items/${id}/update`, data);
  }

  public async deleteCartItem(id: string) {
    return this.delete(`/cart_items/${id}/delete`);
  }

  public async addCart(data: AddToCart): Promise<any> {
    const token:string = await this.getToken();
    const response = await this.fastifyApi.post('/add_cart', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  public async deleteAllCartItems(): Promise<any> {
    const token = await this.getToken();
    const response = await this.fastifyApi.delete('/cart_items', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}
