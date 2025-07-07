export interface UseReverseGeocodingResult {
  address: string | null;
  loading: boolean;
  error: string | null;
  fetchAddress: (lat: number, lon: number) => Promise<void>;
}