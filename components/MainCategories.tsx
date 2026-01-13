import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useMainCategories } from '../view-models/hooks/useMainCategories';
import { useCategories } from '../view-models/hooks/useCategories';
import { Category } from '../models/category/Category';
import CategoryList from './CategoryList';
import ProgressBar from './ProgressBar';
import { MainCategoryView } from '../models/category/MainCategoryView';


const MainCategories: React.FC = (): React.JSX.Element => {
  const { mainCategories, loading, error } = useMainCategories();
  const { categories } = useCategories();

  const [activeMainCategory, setActiveMainCategory] =
    useState<MainCategoryView | null>(null);

  const filteredCategories: Category[] = useMemo(() => {
    if (!activeMainCategory) return [];

    const categoryMap = new Map(
      categories.map(cat => [cat.name, cat])
    );

    const unique = new Map<string, Category>();

    activeMainCategory.subcategories.forEach(sub => {
      const match = categoryMap.get(sub?.slug);
      if (match) {
        unique.set(match.id, match);
      }
    });

    return Array.from(unique.values());
  }, [activeMainCategory, categories]);

  if (loading) return <ProgressBar />;
  if (error) return <Text className="text-red-500 text-center">{error}</Text>;

  return (
    <View className="mt-4">
      {/* MAIN CATEGORIES */}
      <FlatList
        data={mainCategories}
        horizontal
        keyExtractor={(item) => item.maincategory_id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveMainCategory(item)}
            className="items-center mx-3"
          >
            <Image
              source={{ uri: item.imgURL }}
              className="w-24 h-24"
              resizeMode="contain"
            />
            <Text className="text-white font-bold mt-2">
              {item.maincategory_name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* SUB CATEGORIES WITH IMGURL */}
      {filteredCategories.length > 0 && (
        <CategoryList categories={filteredCategories} />
      )}
    </View>
  );
};

export default MainCategories;
