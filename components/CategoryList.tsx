import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import { Category } from '../models/category/Category';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item?.imgurl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text className="text-xl text-center mt-1 capitalize text-white font-extrabold">
        {item?.name?.replace(/-/g, ' ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="p-4">
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
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
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CategoryList;
