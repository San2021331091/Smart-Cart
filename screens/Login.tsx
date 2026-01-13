import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { loginScreenColor } from '../colors/Colors';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import { useLogin } from '../view-models/hooks/useLogin';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useLogin();

  const handleLogin = () => {
    login(email, password, () => {
      navigation.navigate('Main', {screen: 'Home'});
    }).then();
  };

  return (
    <LinearGradient
      colors={loginScreenColor}
      className="flex-1 justify-center items-center"
    >
      <KeyboardAvoidingView className="w-full px-6">
        <Animated.View entering={FadeInUp.delay(200).duration(600)} className="mb-10 items-center">
          <Text className="text-white text-4xl font-bold">Welcome Back</Text>
          <Text className="text-white text-lg mt-2">Login to your account</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(600)}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-white text-white rounded-xl px-4 py-3 mb-4 font-bold"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#fff"
            secureTextEntry
            className="border border-white text-white rounded-xl px-4 py-3 mb-2 font-bold"
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`rounded-xl py-3 items-center ${loading ? 'bg-blue-900' : 'bg-blue-600'}`}
          >
            <Text className="text-white font-semibold text-lg">{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4 items-center gap-4">
            <Text className="text-white text-lg font-bold">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup', '')}>
              <Text className="text-white font-extrabold underline text-lg">Go to signup</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;
