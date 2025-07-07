import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useProductSearch } from '../../view-models/hooks/useProductSearch.ts';
import { NativeStackNavigationProp } from  '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import { Product } from '../../models/product/Product.ts';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar.tsx';

import { startSpeechToText } from 'react-native-voice-to-text';
import {searchResultsColor, searchScreenColor} from '../../colors/Colors.ts';
import ProgressBar from '../components/ProgressBar.tsx';

const Search: React.FC = (): React.JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const [listening, setListening] = useState<boolean>(false);

  const { results, loading, error } = useProductSearch(query);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone for voice search.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleMicPress = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) return;

    try {
      setListening(true);
      const text = await startSpeechToText();
      if (typeof text === 'string' && text.trim()) setQuery(text);
    } catch (error) {
      console.error('Voice recognition error:', error);
    } finally {
      setListening(false);
    }
  };

  return (
    <LinearGradient
      colors={searchScreenColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-4 pt-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-3 self-start">
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => {}}
          onFocus={() => {}}
          onMicPress={handleMicPress}
        />

        {listening && (
          <Text className="text-white mt-2 text-center italic">Listening...</Text>
        )}

        {loading && <ProgressBar />}
        {error && <Text className="text-red-300 mt-2">{error}</Text>}

        <FlatList
          className="mt-4"
          data={results}
          keyExtractor={(item: Product) => item.id}
          renderItem={({ item }) => (
            <LinearGradient
              colors={searchResultsColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-2xl mb-3 shadow-lg"
              style={{ padding: 12 }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('SingleProduct', { id: item.id })}
                className="flex-row items-center"
              >
                <Image
                  source={{ uri: item?.thumbnail }}
                  className="w-24 h-24 rounded-lg mr-3"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-white" numberOfLines={1}>
                    {item?.title}
                  </Text>
                  <Text className="text-white text-lg font-bold mt-1">${item?.price}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
          ListEmptyComponent={
            !loading && query.trim() !== '' ? (
              <Text className="text-center text-white mt-6 text-lg">
                No products found.
              </Text>
            ) : null
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
