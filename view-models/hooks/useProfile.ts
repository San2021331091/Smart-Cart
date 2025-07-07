import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/SupabaseClient.ts';
import { ProfileService } from '../../models/api/profileApi.ts';

export const useProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const profileService = new ProfileService();
  const loadProfile = async ():Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session || !session.access_token)
        throw new Error('No session or access token');


      const profileData = await profileService.fetchProfile(session.access_token);
      setUser(profileData.user);
    } catch (err: any) {
      console.error('Profile load failed:', err.message);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(():void => {
    loadProfile().then();
  }, []);

  return { user, loading, error };
};
