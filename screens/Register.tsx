import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { registerScreenColor } from '../colors/Colors';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import { useRegister } from '../view-models/hooks/useRegister';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

const Register: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
 
  const {
    name,
    email,
    password,
    confirmPassword,
    loading,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
   handleRegister,
  } = useRegister({
    onSuccess: () => navigation.navigate({ name: 'Login', params: '' }),
  });


  return (
    <LinearGradient
      colors={registerScreenColor}
      className="flex-1 justify-center items-center"
    >
      <KeyboardAvoidingView className="w-full px-6">
        <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
          <Animated.View
            entering={FadeInUp.delay(200).duration(600)}
            className="items-center mb-8"
          >
            <Text className="text-white text-4xl font-bold">Create Account</Text>
            <Text className="text-white text-lg mt-2">Register to continue</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).duration(600)}>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#fff"
              className="border border-white text-white rounded-xl px-4 py-3 mb-4 font-semibold"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)}>
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#fff"
              keyboardType="email-address"
              className="border border-white text-white rounded-xl px-4 py-3 mb-4 font-semibold"
              autoCapitalize="none"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(600)}>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#fff"
              secureTextEntry
              className="border border-white text-white rounded-xl px-4 py-3 mb-4 font-semibold"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600).duration(600)}>
            <TextInput
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#fff"
              secureTextEntry
              className="border border-white text-white rounded-xl px-4 py-3 mb-6 font-semibold"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(700).duration(600)}>
            <TouchableOpacity
              className="bg-violet-800 rounded-xl py-3 items-center"
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text className="text-white font-semibold text-lg">
                {loading ? 'Registering...' : 'Register'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(800).duration(600)}
            className="flex-row justify-center mt-6 items-center gap-4"
          >
            <Text className="text-white text-lg font-medium">Already have an account?</Text>
            <TouchableOpacity
              onPress={(): void => navigation.navigate({ name: 'Login', params: '' })}
            >
              <Text className="text-white underline text-lg font-extrabold">Go to login</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Register;
