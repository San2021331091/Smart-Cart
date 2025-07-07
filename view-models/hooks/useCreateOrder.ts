import { useState } from 'react';
import { supabase } from '../../supabase/SupabaseClient.ts';
import { OrderService } from '../../models/api/ordersApi.ts';
import { OrderPayload } from '../../models/order/OrderPayload.ts';
import { useCart } from './useCart.ts';

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, subtotal } = useCart();
  const orderService = new OrderService();

  const createOrder = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Get user session token
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.access_token) {
      setError('User session not found');
      setLoading(false);
      return;
    }

    try {

      const order: OrderPayload = {
        items: cartItems.map((item) => ({
          productId: item.product_id || item.id,
          quantity: item.quantity,
          price: item.price,
          img_url: item.img_url,
        })),
        total: subtotal,
      };


      const data = await orderService.postOrder(order, session.access_token);
      setSuccess(true);
      return data;
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, success, error };
};