import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CartService } from '../../models/api/cartApi.ts';

const cartService = new CartService();

export const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const isFocused = useIsFocused();

  const fetchCart = async () => {
    try {
      const res = await cartService.getCartItems();
      const items = res.map((item: any) => ({
        ...item,
        quantity: parseInt(item.quantity),
      }));
      setCartItems(items);
      calculateSubtotal(items);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateSubtotal = (items: any[]) => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
      0
    );
    setSubtotal(total);
  };

  const deleteItem = async (id: string) => {
    try {
      await cartService.deleteCartItem(id);
      await fetchCart();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item.');
    }
  };

  const updateQuantity = async (id: string, change: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity + change;
    if (newQty < 1) return;

    const updatedItems = cartItems.map((i) =>
      i.id === id ? { ...i, quantity: newQty } : i
    );
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);

    try {
      await cartService.updateCartItem(id, { quantity: newQty });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update quantity.');
      await fetchCart(); // fallback
    }
  };

  const updateCartItem = async (
    id: string,
    data: { quantity?: number; price?: number }
  ) => {
    try {
      const res = await cartService.updateCartItem(id, data);
      await fetchCart();
      return res;
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update item.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchCart().then();
    }
  }, [isFocused]);

  return {
    cartItems,
    subtotal,
    deleteItem,
    updateQuantity,
    updateCartItem,
  };
};
