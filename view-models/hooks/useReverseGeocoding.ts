import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseReverseGeocodingResult } from '../../models/useReverseGeocoding/UseReverseGeocodingResult.ts';
import { EXPO_NOMINATIM_BASE_URL } from '@env';

const useReverseGeocoding = (): UseReverseGeocodingResult => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Load saved address on first mount
  useEffect(() => {
    const loadSavedAddress = async () => {
      try {
        const saved = await AsyncStorage.getItem('saved_address');
        if (saved) {
          setAddress(saved);
        }
      } catch (e) {
        console.error('Failed to load saved address:', e);
      }
    };

    loadSavedAddress();
  }, []);

  const fetchAddress = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${EXPO_NOMINATIM_BASE_URL}/reverse`, {
        params: {
          format: 'json',
          lat,
          lon,
          'accept-language': 'en',
        },
        headers: {
          'User-Agent': 'SMARTCART/1.0 (smartcart@aol.com)',
        },
      });

      const data = response.data;
      let resolvedAddress = 'Address not found';

      if (data && data.display_name) {
        resolvedAddress = data.display_name;
      }

      setAddress(resolvedAddress);


      await AsyncStorage.setItem('saved_address', resolvedAddress);
    } catch (err) {
      console.error('Nominatim reverse geocoding error:', err);
      setError('Failed to fetch address');
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return { address, loading, error, fetchAddress };
};

export default useReverseGeocoding;
