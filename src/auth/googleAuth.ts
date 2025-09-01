import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuthStore } from '../store/authStore';
import api from '@/services/api';

type MyGoogleUser = {
  data?: {
    idToken: string;
  };
};
export const handleGoogleSignin = async (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = (await GoogleSignin.signIn()) as MyGoogleUser;
    const idToken = userInfo.data?.idToken;

    if (!idToken) {
      throw new Error('No id_token received from Google');
    }

    const payload = new FormData();
    payload.append('id_token', idToken);

    const response = await api.post('/auth/login-google', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { token, user } = response.data;

    if (token && user) {
      // ✅ Save token
      await useAuthStore.getState().setToken(token);

      // ✅ Save user (id, name, email, gender if provided)
      await useAuthStore.getState().setUser({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        age: null,
        gender: null,
        display_photo: user?.display_photo,
        mobile_no: null,
        google_id: null,
        apple_id: null,
        remember_token: null,
        current_team_id: null,
        expo_token: null,
        api_token: null,
        device_token: null,
        profile_status: null,
        is_paid: user?.is_paid,
        created_at: user?.created_at,
      });

      // ✅ Navigate to home screen
      navigation.navigate('AppTabs', { screen: 'Home' });
    } else {
      Alert.alert('Error', 'Google login failed on server.');
    }
  } catch (error: any) {
    console.log('GOOGLE LOGIN ERROR:', JSON.stringify(error, null, 2));
    // Alert.alert('Error', error.message || 'Google login error.');
  }
};
