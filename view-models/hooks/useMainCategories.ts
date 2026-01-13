import { useEffect, useState } from 'react';
import { MainCategoryView } from '../../models/category/MainCategoryView';
import { MainCategoryService } from '../../models/api/mainCategoryApi';


export const useMainCategories = () => {
  const [mainCategories, setMainCategories] = useState<MainCategoryView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = new MainCategoryService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getAllMainCategories();

        // ✅ Properly typed reduce
        const unique = Object.values(
          data.reduce<Record<number, MainCategoryView>>((acc, item) => {
            acc[item.maincategory_id] = item;
            return acc;
          }, {})
        );

        setMainCategories(unique);
      } catch (err) {
        setError('Failed to fetch main categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { mainCategories, loading, error };
};
