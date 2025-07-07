import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ListRenderItem, StyleSheet} from 'react-native';
import { useCategories } from '../../view-models/hooks/useCategories.ts';
import {Category} from '../../models/category/Category.ts';
import ProgressBar from './ProgressBar.tsx';

const CategoryList: React.FC = (): React.JSX.Element => {
  const { categories, loading, error } = useCategories();

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imgurl }}
          style={styles.image}
          resizeMode="contain"

        />
      </View>
      <Text className="text-xl text-center mt-1 capitalize text-white font-extrabold ">
        {item.name.replace(/-/g, ' ')}
      </Text>
    </TouchableOpacity>
  );

  if (loading) return <ProgressBar/>;
  if (error) return <Text className="text-red-500 text-center">{error}</Text>;

  return (
    <View className="p-4">
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CategoryList;
