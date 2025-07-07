import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import StepIndicator from 'react-native-step-indicator';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { confirmationScreenColor } from '../../colors/Colors.ts';

const labels: string[] = ['Address', 'Delivery', 'Payment', 'Place Order'];

const customStyles = {
  stepIndicatorSize: 39,
  currentStepIndicatorSize: 39,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#FFFFFF',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#FFFFFF',
  stepStrokeUnFinishedColor: '#FFFFFF',
  separatorFinishedColor: '#FFFFFF',
  separatorUnFinishedColor: '#FFFFFF',
  stepIndicatorFinishedColor: '#FFFFFF',
  stepIndicatorUnFinishedColor: '#FFFFFF',
  stepIndicatorCurrentColor: '#FFFFFF',
  stepIndicatorLabelFontSize: 18,
  currentStepIndicatorLabelFontSize: 18,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#000000',
  stepIndicatorLabelUnFinishedColor: '#000000',
  labelColor: '#FFFFFF',
  labelSize: 16,
  currentStepLabelColor: '#FFFFFF',
};

const Confirmation: React.FC = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList, 'Confirmation'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { subtotal, itemCount } = route.params as {
    subtotal: number;
    itemCount: number;
  };

  const [currentPosition] = useState(1); // Step index: "Delivery"

  // Save to AsyncStorage when subtotal/itemCount change
  useEffect(() => {
    const saveCartSummary = async () => {
      try {
        const summary = JSON.stringify({ subtotal, itemCount });
        await AsyncStorage.setItem('cart_summary', summary);
        console.log('Cart summary saved to AsyncStorage');
      } catch (error) {
        console.error('Error saving cart summary:', error);
      }
    };

    saveCartSummary().then();
  }, [subtotal, itemCount]);

  return (
    <LinearGradient colors={confirmationScreenColor} className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* Back Button */}
        <TouchableOpacity
          className="flex-row items-center mb-5"
          onPress={(): void => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text className="text-white text-lg ml-2">Back</Text>
        </TouchableOpacity>

        {/* Step Indicator */}
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
        />

        {/* Delivery Options */}
        <View className="mt-10">
          <Text className="text-[20px] font-bold text-white mb-5 tracking-wide">
            Choose your delivery options
          </Text>

          <View className="flex-row items-start mb-5">
            <View className="w-5 h-5 border-[2px] border-white rounded-full mt-[5px] mr-3 bg-white" />
            <View>
              <Text className="text-white font-bold text-[16px]">Tomorrow by 10pm</Text>
              <Text className="text-white text-2xl font-bold mb-2">
                FREE delivery with your Prime membership
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-red-400 rounded-full py-3 px-5 items-center shadow-md shadow-black/20"
            onPress={(): void => navigation.navigate('Address', {})}
          >
            <Text className="text-white font-bold text-[16px]">Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Subtotal Summary */}
        <View className="mt-10 items-center">
          <Text className="text-[16px] text-white my-1 font-extrabold">
            Subtotal: ${subtotal.toFixed(2)}
          </Text>
          <Text className="text-[16px] text-white my-1 font-bold">
            Items: {itemCount}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Confirmation;
