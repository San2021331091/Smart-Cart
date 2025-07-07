import { useEffect, useState } from 'react';
import { ProductService } from '../../models/api/productsApi.ts';
import { Product } from '../../models/product/Product.ts';

const useProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productService = new ProductService();

  useEffect(():void => {
    if (!id) return;

    setLoading(true);
    productService.getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
};

export default useProductById;
