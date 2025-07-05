// src/services/otpAuth.ts

import axios from 'axios';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OtpVerifyResponse } from '@services/api';
// import { NavigationProp } from '@react-navigation/native';

type AuthNavigation = NativeStackNavigationProp<AuthStackParamList>;



export const getOtp = async (
  email: string,
  name: string,
  age: string,
  sex: string,
  navigation: AuthNavigation
) => {
  if (!email) {
    Alert.alert('Required', 'Please enter your email.');
    return;
  }

  try {
    const payload = new FormData();
    payload.append('email', email);

    const response = await axios.post(
      'http://3.6.142.117/api/auth/request-otp',
      payload,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    if (response?.data?.message?.includes('OTP sent')) {
      // ✅ Navigate to OTP Screen with required data
      navigation.navigate('OtpVerification', {
        email,
        name,
        age,
        sex,
      });
    } else {
      Alert.alert('Error', response.data?.message || 'Something went wrong.');
    }
  } catch (error: any) {
    console.error('GET OTP ERROR:', error);
    Alert.alert('Error', error?.response?.data?.message || 'Failed to send OTP.');
  }
};
//////////////////////////////////////////////////////////////////////////////////////////

export const verifyOtp = async (
  otp: string,
  email: string,
  name: string,
  age: string,
  sex: string
): Promise<{ data: OtpVerifyResponse }> => {
  return await axios.post('http://3.6.142.117/api/auth/verify-otp', {
    otp,
    email,
    name,
    age,
    sex,
  });
};