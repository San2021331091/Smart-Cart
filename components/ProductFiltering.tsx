import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../view-models/hooks/useCategories';
import useProducts from '../view-models/hooks/useProducts';
import ProductList from './ProductList';
import {productFilterColor} from '../colors/Colors';
import ProgressBar from './ProgressBar';

const ProductFiltering: React.FC = (): React.JSX.Element => {
  const { categories, loading: categoryLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const {
    products,
    loading: productLoading,
    error: productError,
  } = useProducts(
    selectedCategory ? `products?category=${selectedCategory}` : ''
  );

  const formatCategory = (cat: string):string => {
    return cat
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <>
      <View className="rounded-xl mx-4 mt-5 mb-4 border border-gray-300">
        {categoryLoading ? (
          <ProgressBar/>
        ) : (
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              backgroundColor: '#000428',
            }}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Select Category" value="" enabled={false} />
            {categories.map((category) => (
              <Picker.Item
                key={category.name}
                label={formatCategory(category.name)}
                value={category.name}
              />
            ))}
          </Picker>
        )}
      </View>

      {productError && (
        <Text className="text-white text-center">{productError}</Text>
      )}

      {selectedCategory && (
        <ProductList
          title={formatCategory(selectedCategory)}
          products={products}
          loading={productLoading}
          error={productError}
          gradientColors={productFilterColor}
        />
      )}
    </>
  );
};

export default ProductFiltering;
