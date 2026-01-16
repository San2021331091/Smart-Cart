import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { notificationHeadingColor, notificationItemColor, notificationScreenColor } from '../colors/Colors';
import useNotifications from '../view-models/hooks/useNotifications';
import ProgressBar from '../components/ProgressBar';

const Notification:React.FC = ():React.JSX.Element => {
  const { notifications, loading, error } = useNotifications();
  const navigation = useNavigation();

  if (loading) {
    return (

      <SafeAreaView className="bg-[#01696d] flex-1 justify-center items-center">
      <ProgressBar/>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center px-4"
      >
        <Text className="text-white text-center text-lg mb-4">{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="text-white text-lg ml-2">Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={notificationScreenColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 px-4 pt-6"
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={():void => navigation.goBack()}
        className="mb-4 flex-row items-center"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text className="text-white text-lg ml-2">Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {notifications.map((item, index) => (
          <LinearGradient
            key={index}
            colors={notificationItemColor}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-xl p-4 mb-4"
          >
            <LinearGradient
              colors={notificationHeadingColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-md px-3 py-2 mb-2"
            >
              <Text className="text-white font-bold text-center text-lg">
                {item.title}
              </Text>
            </LinearGradient>
            <Text className="text-white text-lg mb-1">{item.message}</Text>
            <Text className="text-white text-lg font-bold">
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </LinearGradient>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Notification;
