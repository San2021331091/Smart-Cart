import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useProfile } from '../../view-models/hooks/useProfile.ts';
import { profileScreenColor } from '../../colors/Colors.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import useLogout from '../../view-models/hooks/useLogout.ts';
import ProgressBar from '../components/ProgressBar.tsx';

const Profile: React.FC = (): React.JSX.Element => {
  const { user, loading, error } = useProfile();
  const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const logout = useLogout();

  if (loading) {
    return (
      <SafeAreaView className="bg-[#40B5AD] flex-1 justify-center items-center">
        <ProgressBar />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 text-green-900 justify-center items-center">
        <Text className="text-red-100 font-semibold text-lg">⚠️ Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient colors={profileScreenColor} className="flex-1 px-6 pt-6">
      <Text className="text-4xl font-extrabold text-white m-4">Welcome to your Profile</Text>

      {user ? (
        <View className="space-y-4 mb-8">
          <Text className="text-lg text-white font-bold">Your Name: {user?.user_metadata?.full_name}</Text>
          <Text className="text-lg text-white font-bold">Your Email: {user?.email}</Text>
        </View>
      ) : (
        <Text className="text-red-200">No user data found.</Text>
      )}

      {/* Buttons Grid */}
      <View className="flex-row flex-wrap justify-start -mx-2">
        <TouchableOpacity
          style={{ flexBasis: '48%', maxWidth: '48%' }}
          className="bg-green-600 mx-2 mb-4 rounded-xl px-4 py-3 items-center"
          onPress={() => navigation2.navigate('YourOrders', {})}
        >
          <Text className="font-semibold text-white text-lg">Your Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexBasis: '48%', maxWidth: '48%' }}
          className="bg-blue-600 mx-2 mb-4 rounded-xl px-4 py-3 items-center"
          onPress={() => navigation.navigate('Products')}
        >
          <Text className="font-semibold text-white text-lg">Buy Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexBasis: '48%', maxWidth: '48%' }}
          className="bg-red-600 mx-2 mb-4 rounded-xl px-4 py-3 items-center"
          onPress={logout}
        >
          <Text className="font-semibold text-white text-lg">Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexBasis: '48%', maxWidth: '48%' }}
          className="bg-purple-800 mx-2 mb-4 rounded-xl px-4 py-3 items-center"
          onPress={() => navigation.navigate('Cart')}
        >
          <Text className="font-semibold text-white text-lg">See your cart items</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Profile;
