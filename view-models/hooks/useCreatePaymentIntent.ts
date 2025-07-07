import { useState } from 'react';
import { CardInfo } from '../../models/card/CardInfo.ts';
import { PaymentService } from '../../models/api/getPaymentsApi.ts';

export const useCreatePaymentIntent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const paymentService = new PaymentService();

  const makePayment = async (amount: number, cardData: CardInfo) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await paymentService.createPaymentIntent(amount, cardData);

      if (response?.message?.toLowerCase()?.includes('success')) {
        setSuccess(true);
        return true;
      } else {
        setError(response?.error || 'Payment failed');
        return false;
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.response?.data?.error || err.message || 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    makePayment,
    loading,
    error,
    success,
  };
};
