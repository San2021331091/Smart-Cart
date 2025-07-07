import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { usePayments } from '../../view-models/hooks/usePayments.ts';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { addressCardColor, orderCardColor, orderScreenColor } from '../../colors/Colors.ts';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import useDeleteAllCartItems from '../../view-models/hooks/useDeleteAllCartItems.ts';

// Import your createOrder hook
import {useCreateOrder} from '../../view-models/hooks/useCreateOrder.ts';
import ProgressBar from '../components/ProgressBar.tsx';

const screenWidth = Dimensions.get('window').width;

const PlaceOrder: React.FC = (): React.JSX.Element => {
  const { payments, loading: paymentsLoading, error: paymentsError } = usePayments();
  const [address, setAddress] = useState<string | null>(null);
  const { deleteAll } = useDeleteAllCartItems();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // useCreateOrder hook for order creation
  const { createOrder, loading: orderLoading, error: orderError } = useCreateOrder();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem('saved_address');
        setAddress(storedAddress);
      } catch (err) {
        console.error('Failed to load address:', err);
      }
    };

    fetchAddress().then();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const data = await createOrder();
      if (data) {
        await deleteAll();
        navigation.navigate('Gift', {});
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to place order.');
      console.error('❌ Failed to place order:', e);
    }
  };

  return (
    <LinearGradient
      colors={orderScreenColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 p-4"
    >
      <Text className="text-white text-4xl font-extrabold m-4 text-center mt-16 shadow-lg">
        Confirm your Order
      </Text>

      {address && (
        <Animated.View
          entering={FadeInUp.springify()}
          style={{
            borderRadius: 20,
            marginBottom: 20,
            width: screenWidth - 40,
            alignSelf: 'center',
            elevation: 6,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={addressCardColor}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20, borderRadius: 20 }}
          >
            <Text className="text-white text-2xl font-bold mb-2">📦 Shipping Address</Text>
            <Text className="text-white text-xl font-extrabold">{address}</Text>
          </LinearGradient>
        </Animated.View>
      )}

      {(paymentsLoading || orderLoading) && <ProgressBar/>}
      {(paymentsError || orderError) && (
        <Text className="text-white text-center">{paymentsError || orderError}</Text>
      )}

      {!paymentsLoading && !paymentsError && (
        <FlatList
          data={payments}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInUp.delay(index * 100).springify()}
              style={{
                borderRadius: 20,
                marginBottom: 20,
                width: screenWidth - 40,
                alignSelf: 'center',
                elevation: 6,
                overflow: 'hidden',
              }}
            >
              <LinearGradient
                colors={orderCardColor}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 20, borderRadius: 20 }}
              >
                <Text className="text-white text-2xl font-bold mb-1">
                  Name: {item?.username || 'Anonymous'}
                </Text>
                <Text className="text-white text-2xl font-bold">
                  Amount: ${(item?.amount / 100).toFixed(2)}
                </Text>
                <Text className="text-white text-2xl font-bold">
                  Payment Method: {item?.card_type}
                </Text>
                <Text
                  className={`text-2xl mt-2 font-semibold ${
                    item?.status === 'success'
                      ? 'text-white font-extrabold'
                      : item?.status === 'failed'
                        ? 'text-red-300'
                        : 'text-white font-bold'
                  }`}
                >
                  Status: {item?.status}
                </Text>
              </LinearGradient>
            </Animated.View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={handlePlaceOrder}
        disabled={orderLoading}
        style={{
          backgroundColor: orderLoading ? '#9ca3af' : '#2563eb',
          paddingVertical: 16,
          borderRadius: 30,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text className="text-white text-lg font-bold">
          {orderLoading ? 'Placing Order...' : 'Place Order'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PlaceOrder;
