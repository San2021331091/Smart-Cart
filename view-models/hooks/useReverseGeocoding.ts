import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseReverseGeocodingResult } from '../../models/useReverseGeocoding/UseReverseGeocodingResult';
import { EXPO_LOCATIONIQ_API_KEY, EXPO_LOCATIONIQ_BASE_URL } from '@env';

const useReverseGeocoding = (): UseReverseGeocodingResult => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Load saved address on mount
  useEffect(() => {
    const loadSavedAddress = async () => {
      try {
        const saved = await AsyncStorage.getItem('saved_address');
        if (saved) setAddress(saved);
      } catch (e) {
        console.error('Failed to load saved address:', e);
      }
    };

    loadSavedAddress();
  }, []);

  const fetchAddress = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    // Validate env variables
    if (!EXPO_LOCATIONIQ_API_KEY || !EXPO_LOCATIONIQ_BASE_URL) {
      console.error('Missing LocationIQ API key or base URL. Check .env file.');
      setError('Location service not configured');
      setLoading(false);
      return;
    }

    try {
      const url = `${EXPO_LOCATIONIQ_BASE_URL}/reverse.php?key=${EXPO_LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`;
      console.log('Fetching address from URL:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Reverse geocode response:', data);

      const resolvedAddress = data.display_name || 'Address not found';
      setAddress(resolvedAddress);

      try {
        await AsyncStorage.setItem('saved_address', resolvedAddress);
      } catch (storageErr) {
        console.error('Failed to save address to AsyncStorage:', storageErr);
      }
    } catch (err: any) {
      console.error('Failed to fetch address:', err);
      setError('Failed to fetch address');
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return { address, loading, error, fetchAddress };
};

export default useReverseGeocoding;
