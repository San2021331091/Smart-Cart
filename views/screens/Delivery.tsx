import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';

const Delivery: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedMethod, setSelectedMethod] = useState<null | 'visa' | 'mastercard'>(null);

  return (
    <LinearGradient colors={['#40826D', '#40B5AD']} className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-6">
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text className="text-white text-lg ml-2">Back</Text>
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-6">Select Payment Method</Text>

        {/* Visa Option */}
        <TouchableOpacity className="flex-row items-center mb-4" onPress={() => setSelectedMethod('visa')}>
          <View
            className={`w-6 h-6 rounded-full border-2 ${
              selectedMethod === 'visa' ? 'border-white bg-white' : 'border-white'
            } mr-3 items-center justify-center`}
          >
            {selectedMethod === 'visa' && <View className="w-3 h-3 bg-blue-800 rounded-full" />}
          </View>
          <Text className="text-white text-lg font-semibold">Visa</Text>
        </TouchableOpacity>

        {/* Mastercard Option */}
        <TouchableOpacity className="flex-row items-center mb-8" onPress={() => setSelectedMethod('mastercard')}>
          <View
            className={`w-6 h-6 rounded-full border-2 ${
              selectedMethod === 'mastercard' ? 'border-white bg-white' : 'border-white'
            } mr-3 items-center justify-center`}
          >
            {selectedMethod === 'mastercard' && <View className="w-3 h-3 bg-red-600 rounded-full" />}
          </View>
          <Text className="text-white text-lg font-semibold">Mastercard</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          className={`py-4 px-6 rounded-xl flex-row items-center justify-center ${
            selectedMethod ? 'bg-green-600' : 'bg-green-300'
          }`}
          disabled={!selectedMethod}
          onPress={() => {
            if (selectedMethod !== null) {
              navigation.navigate('Payment', {
                paymentMethod: selectedMethod,
              });
            }
          }}
        >
          <Text className="text-white font-bold text-lg mr-2">Continue</Text>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default Delivery;
