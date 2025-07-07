import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_FASTIFY_BASE_URL } from '@env';
import { supabase } from '../../supabase/SupabaseClient';
import { PaymentRecord } from '../payment/PaymentRecord';
import { CardInfo } from '../card/CardInfo';

export class PaymentService extends DefaultApiService {
  constructor() {
    super(EXPO_FASTIFY_BASE_URL);
  }

  private async getToken(): Promise<string> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.access_token) {
      throw new Error('No active session or failed to retrieve token');
    }

    return session.access_token;
  }

  public async getPaymentsForUser(): Promise<PaymentRecord[]> {
    const token = await this.getToken();
    const response = await this.get<{ data: PaymentRecord[] }>('/payments/user', token);
    return response.data;
  }


  public async createPaymentIntent(amount: number, cardData: CardInfo): Promise<any> {
    const payload = {
      amount,
      card_type: cardData.cardType,
      card_number: cardData.cardNumber,
      expiry: cardData.expiry,
      cvv: cardData.cvv,
      email: cardData.email,
      username: cardData.username,
    };

    return this.post('/create-payment-intent', payload);
  }
}
