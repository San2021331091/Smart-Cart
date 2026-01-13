import React from 'react';
import useProducts from '../view-models/hooks/useProducts.ts';
import ProductList from './ProductList.tsx';
import {trendingColor} from '../colors/Colors.ts';

const TrendingProducts = () => {
  const { products, loading, error } = useProducts('trending');

  return (
    <ProductList
      title="Trending Products of this week"
      products={products}
      loading={loading}
      error={error}
      gradientColors={trendingColor}
    />
  );
};

export default TrendingProducts;
