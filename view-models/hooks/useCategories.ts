import { useEffect, useState } from 'react';
import { CategoryService } from '../../models/api/categoryApi';

import { Category } from '../../models/category/Category';
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const categoryService = new CategoryService();

  useEffect(():void => {
    const fetchData = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err: any) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then();
  }, []);

  return { categories, loading, error };
};
