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
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useProductSearch } from '../../view-models/hooks/useProductSearch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes';
import { Product } from '../../models/product/Product';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../../components/SearchBar';
import { NativeModules } from 'react-native';
import { searchResultsColor, searchScreenColor } from '../../colors/Colors';
import ProgressBar from '../../components/ProgressBar';

const Search: React.FC = (): React.JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const { SpeechModule } = NativeModules;
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
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Microphone access is required for voice search.');
      return;
    }

    if (!SpeechModule || !SpeechModule.startSpeechRecognition) {
      Alert.alert('Error', 'Speech module is not available.');
      return;
    }

    try {
      console.log('🎤 Starting speech recognition...');

      const speechPromise = SpeechModule.startSpeechRecognition();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout: No speech input detected')), 10000)
      );

      const result = await Promise.race([speechPromise, timeoutPromise]);

      console.log('✅ Speech recognition result:', result);

      if (typeof result === 'string' && result.trim()) {
        setQuery(result);
      } else {
        Alert.alert('No Input', 'No speech was recognized.');
      }
    } catch (err: any) {
      console.error('❌ Speech recognition error:', err);
      Alert.alert('Speech Error', err?.message || 'Something went wrong.');
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

        {/* Removed: Listening to text */}

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
