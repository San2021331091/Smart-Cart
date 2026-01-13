import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import { supabase } from '../supabase/SupabaseClient';
import ProgressBar from '../components/ProgressBar';

type AuthLoadingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const AuthLoading: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<AuthLoadingNavigationProp>();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error fetching session:', error.message);
          navigation.replace('Login',{});
          return;
        }

        if (session) {
          navigation.navigate('Main', { screen: 'Home' });

        } else {
          navigation.replace('Login',{});
        }
      } catch (err) {
        console.error('Unexpected error checking session:', err);
        navigation.replace('Login',{});
      }
    };

    checkSession().then();
  }, [navigation]);

  return (
     <>
       <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View className="bg-[#035d5d] flex-1 items-center justify-center">
    <ProgressBar/>
    </View>
      </>
  );
};

export default AuthLoading;
