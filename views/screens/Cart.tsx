import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { cartScreenColor } from '../../colors/Colors.ts';
import SharedHeader from '../components/SharedHeader.tsx';
import { useCart } from '../../view-models/hooks/useCart.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';

const Cart: React.FC = (): React.JSX.Element => {
  const { cartItems, subtotal, deleteItem, updateQuantity } = useCart(); // Updated here
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient colors={cartScreenColor} className="flex-1 p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <SafeAreaView className="m-3">
          <SharedHeader />
        </SafeAreaView>
        <Text className="text-2xl font-bold text-white mb-4">My Cart</Text>

        {cartItems.map((item, index) => (
          <View
            key={index}
            className="bg-white/10 rounded-2xl p-3 mb-4 flex-row items-center justify-between shadow-lg"
          >
            <Image
              source={{ uri: item?.img_url }}
              className="w-40 h-40 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-white font-bold text-lg">{item?.name}</Text>
              <Text className="text-white text-xl mb-1">${item?.price}</Text>

              <View className="flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}  // Updated here
                  className="bg-white/20 px-2 py-1 rounded-full"
                >
                  <Icon name="remove" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-medium"> {item?.quantity} </Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}   // Updated here
                  className="bg-white/20 px-2 py-1 rounded-full"
                >
                  <Icon name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => deleteItem(item?.id)}
              className="bg-green-900 p-3 rounded-xl"
            >
              <Text className="text-white text-xl">Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View className="mt-4 p-4 rounded-2xl bg-white/10">
          <Text className="text-white text-xl font-bold mb-1">
            Subtotal: ${subtotal.toFixed(2)}
          </Text>
          <TouchableOpacity
            className="bg-green-900 py-3 rounded-2xl"
            onPress={(): void =>
              navigation.navigate('Confirmation', {
                subtotal: subtotal,
                itemCount: cartItems.length,
              })
            }
          >
            <Text className="text-center text-white font-bold text-lg">
              Proceed to Buy ({cartItems.length} items)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Cart;
