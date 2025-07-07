import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useOrders } from '../../view-models/hooks/useOrders.ts';
import { orderItemColor } from '../../colors/Colors.ts';
import ProgressBar from './ProgressBar.tsx';
import {OrderedItemsProps} from '../../models/order/OrderPayload.ts';

const OrderedItems: React.FC<OrderedItemsProps> = ({ uid }) => {
  const { orders, loading, error } = useOrders(uid);

  if (loading) return <ProgressBar />;

  if (error) {
    return (
      <View className="flex-1 items-center justify-center mt-10">
        <Text className="text-red-500 text-lg font-semibold">{error}</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View className="flex-1 items-center justify-center mt-10">
        <Text className="text-white text-lg font-bold">No orders found.</Text>
      </View>
    );
  }

  // ✅ Split based on status
  const currentOrders = orders.filter(order => order.status.toLowerCase() === 'pending');
  const previousOrders = orders.filter(order => order.status.toLowerCase() === 'approved');

  const renderOrderCard = (order: any) => (
    <LinearGradient
      key={order?.id}
      colors={orderItemColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl p-4 mb-4 shadow-md"
    >
      <Image
        source={{ uri: order?.imgUrl }}
        className="w-full h-36 rounded-xl"
        resizeMode="contain"
      />
      <View className="mt-4 space-y-1">
        <Text className="text-white text-xl font-bold">🛍 Quantity: {order?.quantity}</Text>
        <Text className="text-white text-xl font-bold">💰 Price: ${order?.price?.toFixed(2)}</Text>
        <Text className="text-white text-xl font-semibold">
          📅 Date: {new Date(order?.orderedAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })}
        </Text>

        <Text
          className={`text-center mt-2 font-bold ${
            order?.status === 'pending' ? 'text-gray-200' : 'text-white'
          }`}
        >
          {order?.status?.toUpperCase()}
        </Text>
      </View>
    </LinearGradient>
  );

  return (
    <ScrollView className="space-y-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}>
      {/* ✅ Current Orders */}
      {currentOrders.length > 0 && (
        <View className="px-4">
          <Text className="text-white text-2xl font-bold mb-2"> Current Orders</Text>
          {currentOrders.map(renderOrderCard)}
        </View>
      )}

      {/* ✅ Previous Orders */}
      {previousOrders.length > 0 && (
        <View className="px-4">
          <Text className="text-white text-2xl font-bold mb-2"> Previous Orders</Text>
          {previousOrders.map(renderOrderCard)}
        </View>
      )}
    </ScrollView>
  );
};

export default OrderedItems;
