import { useEffect, useState } from 'react';
import {ProductService} from '../../models/api/productsApi.ts';
import { Review } from '../../models/review/Review.ts';

const useReviewsByProductId = (productId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await productService.getReviewsByProductId(productId);
        setReviews(response);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchReviews().then();
  }, [productId]);

  return { reviews, loading, error };
};

export default useReviewsByProductId;
