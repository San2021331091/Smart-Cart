import { useEffect, useState } from 'react';
import {PaymentService} from '../../models/api/getPaymentsApi.ts';
import {PaymentRecord} from '../../models/payment/PaymentRecord.ts';

export const usePayments = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const paymentService = new PaymentService();

  useEffect(():void => {
    const fetchPayments = async () => {
      try {
        const data = await paymentService.getPaymentsForUser();
        const latestPayment = data.length > 0 ? [data[0]] : [];

        setPayments(latestPayment);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments().then();
  }, []);

  return { payments, loading, error };
};

