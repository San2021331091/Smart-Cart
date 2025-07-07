import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {CartSummary} from '../../models/cartSummary/CartSummary.ts';

const useCartSummary = (): CartSummary | null => {
  const [summary, setSummary] = useState<CartSummary | null>(null);

  useEffect(():void => {
    const fetchSummary = async () => {
      const data = await AsyncStorage.getItem('cart_summary');
      if (data) {
        setSummary(JSON.parse(data));
      }
    };
    fetchSummary().then( );
  }, []);

  return summary;
};

export default useCartSummary;
