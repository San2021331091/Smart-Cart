import { useState } from 'react';
import { CartService } from '../../models/api/cartApi';
import { AddToCart } from '../../models/cart/AddToCart';

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const cart = new CartService();

  const addToCart = async ({
                             user_uid,
                             product_id,
                             img_url,
                             quantity = 1,
                             price,
                           }: AddToCart) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await cart.addCart({ user_uid, product_id, img_url, quantity, price });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error, success };
};

export default useAddToCart;
