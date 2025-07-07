import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import useNotifications from '../../view-models/hooks/useNotifications.ts';

const NotificationIcon:React.FC = ():React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { notifications } = useNotifications();
  const [hasRead, setHasRead] = useState<boolean>(false);

  const count = notifications.length;

  const handlePress = ():void => {
    setHasRead(true);
    navigation.navigate('Notification', {});
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="p-2 rounded-full bg-white/20 relative"
    >
      <MaterialIcons name="notifications" size={24} color="#fff" />

      {!hasRead && (
        <View className="absolute -top-1 -right-1 bg-red-600 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
          <Text className="text-white text-[12px] font-bold">
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NotificationIcon;
