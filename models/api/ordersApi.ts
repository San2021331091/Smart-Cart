import axios, {AxiosInstance} from 'axios';
import {OrderItem, OrderPayload} from '../order/OrderPayload';
import {EXPO_FASTIFY_BASE_URL,EXPO_DOT_NET_BASE_URL} from '@env';
import {DefaultApiService} from '../services/DefaultApiService';

export class OrderService extends DefaultApiService {
  private readonly dotnetApi: AxiosInstance;

  constructor() {
    super(EXPO_FASTIFY_BASE_URL);
    this.dotnetApi = axios.create({ baseURL: EXPO_DOT_NET_BASE_URL });
  }


  public override async get<T>(url: string): Promise<T> {
    const res = await this.dotnetApi.get<T>(url);
    return res.data;
  }

  public async postOrder(order: OrderPayload, token: string) {
    return this.post('/orders', order, token);
  }

  public async getOrders(uid: string) {
    return this.get<OrderItem[]>(`/orders/${uid}`);
  }
}
