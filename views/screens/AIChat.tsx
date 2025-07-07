import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import useAIChat from '../../view-models/hooks/useAIChat.ts';
import {aiScreenColor, messageSendColor} from '../../colors/Colors.ts';
import {EXPO_AVATAR_BASE_URL, EXPO_FLAT_ICON_BASE_URL} from '@env';

const TAB_BAR_HEIGHT = 75;

const AIChat: React.FC = (): React.JSX.Element => {
  const {
    messages,
    inputText,
    setInputText,
    loading,
    handleSend,
    scrollRef,
  } = useAIChat();

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={aiScreenColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 pt-14"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View className="flex-1">
          <ScrollView
            className="flex-1 px-4"
            contentContainerStyle={{
              paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 80,
            }}
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View className="py-4 border-b-2 border-white/20">
              <Text className="text-white text-2xl font-bold text-center">Smart Cart AI</Text>
            </View>

            {/* Messages */}
            {messages.map(msg => (
              <View
                key={msg?.id}
                className={`flex-row max-w-[80%] my-2 ${msg.isUser ? 'self-end' : 'self-start'}`}
                style={{ alignItems: 'center' }}
              >
                {/* AI avatar */}
                {!msg.isUser && (
                  <Image
                    source={{ uri: `${EXPO_FLAT_ICON_BASE_URL}/512/4712/4712109.png` }}
                    style={{
                      width: 49,
                      height: 49,
                      borderRadius: 20,
                      marginRight: 10,
                      borderWidth: 2,
                      borderColor: 'white',
                      backgroundColor: '#444',
                      resizeMode: 'contain',
                    }}
                  />
                )}

                {/* Message bubble */}
                <View
                  className={`px-4 py-3 rounded-2xl ${
                    msg.isUser ? 'bg-white/30 rounded-br-sm' : 'bg-white/30 rounded-bl-sm'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  <Text className="text-white text-xl font-medium">{msg.text}</Text>

                  {/* Products (if any) */}
                  {msg.products && (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className="mt-2"
                      style={{ maxHeight: 180 }}
                    >
                      {msg.products.map((product) => (
                        <View
                          key={product.id}
                          className="rounded-lg p-2 mr-3"
                          style={{ width: 320 }}
                        >
                          <TouchableOpacity onPress={() => {
                            navigation.navigate('SingleProduct', { id: product?.id });
                          }}>
                            <Image
                              source={{ uri: product?.thumbnail }}
                              style={{ width: 120, height: 120, borderRadius: 8 }}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                          <Text className="text-white font-semibold text-xl mt-1" numberOfLines={2}>
                            {product?.title}
                          </Text>
                          <Text className="text-white mt-0.5 text-lg">${product?.price}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>

                {/* User avatar */}
                {msg.isUser && (
                  <Image
                    source={{ uri: `${EXPO_FLAT_ICON_BASE_URL}/512/2922/2922510.png` }}
                    style={{
                      width: 49,
                      height: 49,
                      borderRadius: 20,
                      marginLeft: 10,
                      borderWidth: 2,
                      borderColor: 'white',
                      backgroundColor: '#444',
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </View>
            ))}

            {/* Typing/loading */}
            {loading && (
              <View className="self-start bg-white/10 px-4 py-3 rounded-2xl my-2 max-w-[80%] flex-row items-center">
                <Image
                  source={{ uri: `${EXPO_AVATAR_BASE_URL}/api/pixel-art/username.png` }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    marginRight: 10,
                    borderWidth: 2,
                    borderColor: 'white',
                    backgroundColor: '#444',
                    resizeMode: 'contain',
                  }}
                />
                <Text className="text-white text-lg font-medium">Typing...</Text>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View
            style={{
              position: 'absolute',
              bottom: TAB_BAR_HEIGHT + insets.bottom,
              left: 0,
              right: 0,
              paddingHorizontal: 16,
              paddingTop: 8,
              backgroundColor: 'transparent',
            }}
          >
            <View className="flex-row items-center bg-black/20 p-3 rounded-2xl">
              <LinearGradient
                colors={messageSendColor}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 rounded-full mr-3 px-4 py-2 justify-center"
              >
                <TextInput
                  className="text-white text-lg"
                  placeholder="Ask something..."
                  placeholderTextColor="#eee"
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={handleSend}
                  multiline
                  style={{ maxHeight: 100 }}
                />
              </LinearGradient>

              <TouchableOpacity
                className="bg-violet-600 rounded-full px-4 py-2 justify-center items-center"
                onPress={handleSend}
                disabled={loading}
              >
                <Text className="text-white font-bold">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AIChat;
