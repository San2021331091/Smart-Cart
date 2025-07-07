import { useState, useEffect } from 'react';
import { ProductService } from '../../models/api/productsApi.ts';
import { Product } from '../../models/product/Product.ts';

export const useProductSearch = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

  useEffect(():() => void => {
    const delay = setTimeout(() => {
      if (query.trim()) fetchResults(query).then();
      else setResults([]);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchResults = async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.searchProducts(q); // Product[]
      setResults(data);
    } catch (err) {
      setError('Failed to fetch products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error };
};
