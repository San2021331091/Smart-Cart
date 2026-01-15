import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../supabase/SupabaseClient';
import {AuthService } from '../../models/api/authApi';

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const authService = new AuthService();

  const login = async (email: string, password: string, onSuccess: () => void) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data.session) {
        Alert.alert('Login Failed', error?.message || 'Unknown error');
        return;
      }

      const accessToken = data.session.access_token;
      const user = data.session.user;

      if (!user.email) {
        Alert.alert('Login Failed', 'User email is missing');
        return;
      }

      const userInfo = {
        uid: user?.id,
        email: user?.email,
        name: user?.user_metadata?.full_name || 'Unknown',
        role: 'user' as const,
      };

      await authService.loginToBackend(userInfo, accessToken);
      onSuccess();

    } catch (err: any) {
      console.error('❌ Backend error:', err);
      Alert.alert('Server Error', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
