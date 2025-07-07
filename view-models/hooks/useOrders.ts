import { useEffect, useState } from 'react';
import {OrderService } from '../../models/api/ordersApi.ts';
import { OrderItem } from '../../models/order/OrderPayload.ts';

export const useOrders = (uid: string) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ordersService = new OrderService();

  useEffect(() => {
    if (!uid) return;

    const fetchOrders = async () => {
      try {
        const data = await ordersService.getOrders(uid);
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders().then();
  }, [uid]);

  return { orders, loading, error };
};
