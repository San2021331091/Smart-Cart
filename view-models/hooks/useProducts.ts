import { useEffect, useState } from 'react';
import { ProductService } from '../../models/api/productsApi.ts';
import { Product } from '../../models/product/Product.ts';

const useProducts = (endpoint: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getProductsByType(endpoint)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(`Failed to fetch ${endpoint} products.`);
        setLoading(false);
      });
  }, [endpoint]);

  return { products, loading, error };
};

export default useProducts;
