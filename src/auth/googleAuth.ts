import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuthStore } from '../store/authStore';

type MyGoogleUser = {
  data?: {
    idToken: string;
  };
};
export const handleGoogleSignin = async (
  navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn() as MyGoogleUser;
    const idToken = userInfo.data?.idToken;

    if (!idToken) {
  throw new Error('No id_token received from Google');
}

const payload = new FormData();
payload.append('id_token', idToken);

const response = await axios.post(
  'http://3.6.142.117/api/auth/login-google',
  payload,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
);

const { token, user } = response.data;

if (token && user) {
  // ✅ Save token
  await useAuthStore.getState().setToken(token);

  // ✅ Save user (id, name, email, gender if provided)
  await useAuthStore.getState().setUser({
    id: user.id,              // <-- added
    name: user.name,
    email: user.email,
    gender: user.gender || "", // fallback if API doesn’t send gender
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
