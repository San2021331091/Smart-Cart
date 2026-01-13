import { NavigationProp, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { giftScreenColor } from '../colors/Colors.ts';
import { RootStackParamList } from '../navigation_types/NavigationTypes.ts';

const Gift: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Main', { screen: 'Home' });
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={giftScreenColor}
      className="flex-1 justify-center items-center"
    >
      {/* 🎁 Gift Lottie Animation */}
      <LottieView
        source={require('../assets/gift-box.json')}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
      />

      <Text className="text-4xl font-extrabold text-white m-9">🎉 Thank You!</Text>
      <Text className="text-xl text-white m-4">Here’s a little surprise 🎁</Text>
    </LinearGradient>
  );
};

export default Gift;
