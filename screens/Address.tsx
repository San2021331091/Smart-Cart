import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    PermissionsAndroid,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addressScreenColor } from '../colors/Colors';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import useReverseGeocoding from '../view-models/hooks/useReverseGeocoding.ts';
import ProgressBar from '../components/ProgressBar';

const { width, height } = Dimensions.get('window');

const Address: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { address, loading, error, fetchAddress } = useReverseGeocoding();

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(():void => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setErrorMsg('Permission denied');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude);
        },
        error => {
          setErrorMsg(error.message);
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
      );
    };

    getLocation().then();
  }, []);

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-base font-bold">Error: {errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
     <View className='bg-[#025215] flex-1 justify-center items-center' >
       <ProgressBar/>
     </View>
    );
  }

  return (
    <View className="flex-1">
      <MapView
        style={{ width, height: height * 0.6 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
          zIndex={-1}
        />
        <Marker coordinate={location} title="You are here" />
      </MapView>

      <LinearGradient colors={addressScreenColor} className="flex-1">
        <ScrollView style={{ padding: 20 }} contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            className="mb-4"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          {/* Location data */}
          <Text className="text-white font-bold text-3xl">Your Location Coordinates:</Text>
          <Text className="text-white font-bold text-2xl">
            Latitude: {location.latitude.toFixed(6)}
          </Text>
          <Text className="text-white font-bold text-2xl">
            Longitude: {location.longitude.toFixed(6)}
          </Text>

          {/* Address info */}
          <Text className="mt-5 text-white font-bold text-4xl">Address:</Text>
          {loading ? (
            <Text className="text-white font-bold">Fetching address...</Text>
          ) : error ? (
            <Text className="text-red-200 font-bold">{error}</Text>
          ) : (
            <Text className="text-white font-bold text-xl">{address}</Text>
          )}

          <TouchableOpacity
            className="mt-8 bg-green-700 py-4 px-6 rounded-xl flex-row items-center justify-center"
            onPress={(): void => {
              navigation.navigate('Delivery',{})
            }}
          >
            <Text className="text-white font-bold text-lg mr-2">
              Go to Delivery Option
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Address;
