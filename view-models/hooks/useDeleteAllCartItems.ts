import { useState } from 'react';
import { CartService } from '../../models/api/cartApi.ts';

const useDeleteAllCartItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const cartService = new CartService();

  const deleteAll = async () => {
    setLoading(true);
    setError( null);
    setSuccess(false);

    try {
      await cartService.deleteAllCartItems();
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to delete cart items');
    } finally {
      setLoading(false);
    }
  };

  return { deleteAll, loading, error, success };
};

export default useDeleteAllCartItems;
