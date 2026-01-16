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
    let isMounted = true; // Track if component is still mounted

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (!isMounted) return; // Avoid setting state or navigation if unmounted

        if (error) {
          console.error('Error fetching session:', error.message);
          navigation.replace('Login', {});
          return;
        }

        if (session?.user) {
          // Session exists → go to Main/Home
          navigation.replace('Main', { screen: 'Home' });
        } else {
          // No session → go to Login
          navigation.replace('Login', {});
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Unexpected error checking session:', err);
        navigation.replace('Login', {});
      }
    };

    checkSession();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View className="bg-[#035d5d] flex-1 items-center justify-center">
        <ProgressBar />
      </View>
    </>
  );
};

export default AuthLoading;
