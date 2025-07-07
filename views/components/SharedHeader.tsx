import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SearchBar from './SearchBar.tsx';
import NotificationIcon from './NotificationIcon.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import { supabase } from '../../supabase/SupabaseClient.ts';
import { getAvatarUrl } from '../../utils/avatar.ts';

const SharedHeader: React.FC = (): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadAvatar = async () => {
      const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
      if (user) {
        const url = getAvatarUrl(user?.email || user?.id);
        setAvatarUrl(url);
      }
    };
    loadAvatar().then();
  }, []);

  return (
    <View className="flex-row items-center gap-3 mb-4 mt-2 ">
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
      {avatarUrl && (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', {})}>
          <Image
            source={{ uri: avatarUrl }}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SharedHeader;
