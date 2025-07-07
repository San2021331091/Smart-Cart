import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import { supabase } from '../../supabase/SupabaseClient.ts';
import ProgressBar from '../components/ProgressBar.tsx';
import {StatusBar, View} from 'react-native';

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
       <StatusBar backgroundColor="#40B5AD" barStyle="light-content" />
      <View className="bg-[#40B5AD] flex-1 items-center justify-center">
    <ProgressBar/>
    </View>
      </>
  );
};

export default AuthLoading;
