import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ordersListScreenColor } from '../colors/Colors.ts';
import { useProfile } from '../view-models/hooks/useProfile.ts';
import OrderedItems from '../components/OrderedItems.tsx';
import ProgressBar from '../components/ProgressBar.tsx';

const YourOrders: React.FC = (): React.JSX.Element => {
  const { user, loading, error } = useProfile();
  const navigation = useNavigation();

  if (loading) {
    return (
      <SafeAreaView className="bg-blue-900 flex-1 justify-center items-center">
        <ProgressBar />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-red-900">
        <Text className="text-red-100 font-semibold text-lg">⚠️ Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient colors={ordersListScreenColor} className="flex-1 px-6 pt-6">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-4">
        <Icon name="arrow-back" size={24} color="white" />
        <Text className="text-white text-lg font-semibold ml-2">Back</Text>
      </TouchableOpacity>

      <Text className="text-4xl font-extrabold text-white mb-4">Your Orders</Text>

      {user ? (
        <View className="flex-1">
          <OrderedItems uid={user?.sub} />
        </View>
      ) : (
        <Text className="text-red-200">User not found.</Text>
      )}
    </LinearGradient>
  );
};

export default YourOrders;
