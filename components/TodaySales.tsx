import React from 'react';
import useProducts from '../view-models/hooks/useProducts.ts';
import ProductList from './ProductList.tsx';
import {todaySalesColor} from '../colors/Colors.ts';

const TodaySales = () => {
  const { products, loading, error } = useProducts('todays-sales');

  return (
    <ProductList
      title="Today’s Best Sales"
      products={products}
      loading={loading}
      error={error}
      gradientColors={todaySalesColor}
    />
  );
};

export default TodaySales;
