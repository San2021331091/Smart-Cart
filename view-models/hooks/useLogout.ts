import {supabase} from '../../supabase/SupabaseClient.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation_types/NavigationTypes.ts';

const useLogout = () => {
  const navigation =  useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return async () => {
    try {
      const {error} = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
        return {error};
      }

      navigation.navigate('Login',{});

      return {error: null};
    } catch (err) {
      console.error('Unexpected logout error:', err);
      return {error: err};
    }
  };
};

export default useLogout;
