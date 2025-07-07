export interface PaymentRecord {
  id: number;
  username?: string;
  email?: string;
  amount: number;
  card_type: 'visa' | 'mastercard';
  status: 'pending' | 'success' | 'failed';
  created_at: string;
}