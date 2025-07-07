import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase/SupabaseClient.ts';
import useCartSummary from '../../view-models/hooks/useCartSummary.ts';
import { useCreatePaymentIntent } from '../../view-models/hooks/useCreatePaymentIntent.ts';
import type { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {paymentScreenColor} from '../../colors/Colors.ts';

type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentNavigateProp = NativeStackNavigationProp<RootStackParamList>;

const Payment: React.FC = ():React.JSX.Element => {
  const navigation = useNavigation<PaymentNavigateProp>();
  const { params } = useRoute<PaymentRouteProp>();
  const { paymentMethod } = params;

  const cartSummary = useCartSummary();
  const { makePayment, loading, error: paymentError } = useCreatePaymentIntent();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const cardType: 'visa' | 'mastercard' = paymentMethod;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) return;
      setUserEmail(data.user.email ?? null);
      setUsername(data.user.user_metadata?.full_name ?? data.user.email ?? 'Unknown');
    };
    fetchUser().then();
  }, []);

  const handlePay = async () => {
    if (!cardNumber || !expiry || !cvv) {
      Alert.alert('Missing Info', 'Please fill in all card details');
      return;
    }

    const amount = Math.round((cartSummary?.subtotal ?? 0) * 100);
    const success = await makePayment(amount, {
      cardType,
      cardNumber,
      expiry,
      cvv,
      email: userEmail ?? undefined,
      username: username ?? undefined,
    });

    if (success) {
      Alert.alert('Payment Successful', 'Your payment has been completed.');
      navigation.navigate('PlaceOrder',{})
    } else {
      Alert.alert('Payment Failed', paymentError ?? 'Something went wrong.');
    }
  };

  if (!cartSummary) return <Text className="text-white text-center mt-10">Loading cart...</Text>;

  return (
    <LinearGradient colors={paymentScreenColor} className="flex-1 p-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mb-4 w-12 h-12 justify-center items-center rounded-full bg-white/30"
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Text className="text-white text-lg font-bold">{'<'} </Text>
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold mb-4">Payment</Text>
        <Text className="text-white text-lg mb-2">Subtotal: ${cartSummary.subtotal.toFixed(2)}</Text>
        <Text className="text-white text-lg mb-6">Payment Method: {paymentMethod.toUpperCase()}</Text>

        {/* Disabled Card Type Display */}
        <View className="flex-row space-x-4 mb-6">
          <View
            className={`px-5 py-2 rounded-full ${
              cardType === 'visa' ? 'bg-blue-800' : 'bg-gray-400'
            }`}
          >
            <Text
              className={`font-semibold ${
                cardType === 'visa' ? 'text-white' : 'text-gray-300'
              }`}
            >
              Visa
            </Text>
          </View>
          <View
            className={`px-5 py-2 rounded-full ${
              cardType === 'mastercard' ? 'bg-red-700' : 'bg-gray-400'
            }`}
          >
            <Text
              className={`font-semibold ${
                cardType === 'mastercard' ? 'text-white' : 'text-gray-300'
              }`}
            >
              Mastercard
            </Text>
          </View>
        </View>

        {/* Card UI */}
        <LinearGradient
          colors={cardType === 'visa' ? ['#1A2980', '#26D0CE'] : ['#C04848', '#480048']}
          className="rounded-xl p-5 mb-8"
        >
          <TextInput
            placeholder="Card Number"
            placeholderTextColor="#FFFFFFAA"
            keyboardType="numeric"
            value={cardNumber}
            secureTextEntry
            onChangeText={setCardNumber}
            className="border-b border-white text-white text-lg mb-6 pb-1"
          />
          <View className="flex-row justify-between">
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#FFFFFFAA"
              value={expiry}
              onChangeText={setExpiry}
              className="border-b border-white text-white text-lg pb-1 w-5/12"
            />
            <TextInput
              placeholder="CVV"
              placeholderTextColor="#FFFFFFAA"
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
              className="border-b border-white text-white text-lg pb-1 w-5/12"
            />
          </View>
        </LinearGradient>

        {paymentError && <Text className="text-red-400 mb-4">{paymentError}</Text>}

        <TouchableOpacity
          className={`rounded-xl py-4 ${loading ? 'bg-green-400' : 'bg-green-600'}`}
          onPress={handlePay}
          disabled={loading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {loading ? 'Processing...' : 'Pay Now'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Payment;
