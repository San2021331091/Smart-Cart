import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SearchBar from './SearchBar';
import NotificationIcon from './NotificationIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import { getAvatarUrl } from '../utils/avatar';
import { getUser } from '../supabase/SupabaseClient';

const SharedHeader: React.FC = (): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadAvatar = async () => {
      try {
       
        const { data, error } = await getUser();

        if (error) {
          console.log('Error fetching user:', error.message);
          return;
        }

        const user = data?.user;

        if (user) {
          // Generate DiceBear avatar URL using email or user ID
          const url = getAvatarUrl(user?.email || user?.id);
          setAvatarUrl(url);
        }
      } catch (err) {
        console.log('Unexpected error fetching avatar:', err);
      }
    };

    loadAvatar();
  }, []);

  return (
    <View className="flex-row items-center gap-3 mb-4 mt-2">
      {/* Search Bar */}
      <View className="flex-1">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={() => {}}
          onFocus={() => navigation.navigate('Search', {})}
          onMicPress={() => {}}
        />
      </View>

      {/* Notification */}
      <NotificationIcon />

      {/* Avatar */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile', {})}>
        <Image
          source={{
            uri: avatarUrl || 'https://avatars.dicebear.com/api/micah/placeholder.png?size=96',
          }}
          className="w-12 h-12 rounded-full bg-gray-200"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SharedHeader;
