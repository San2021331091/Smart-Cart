import React from 'react';
import useProducts from '../view-models/hooks/useProducts';
import ProductList from './ProductList';
import {todaySalesColor} from '../colors/Colors';

const TodaySales:React.FC = ():React.JSX.Element => {
  const { products, loading, error } = useProducts('todays-sales');

  return (
    <ProductList
      title="Today's Best Sales"
      products={products}
      loading={loading}
      error={error}
      gradientColors={todaySalesColor}
    />
  );
};

export default TodaySales;
