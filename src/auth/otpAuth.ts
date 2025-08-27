// src/services/otpAuth.ts

import axios from 'axios';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '@/services/api';
// import { OtpVerifyResponse } from '@services/api';
// import { useState } from 'react';
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

    const response = await api.post(
      '/auth/request-otp',
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
  email: string,
  otp: string,
  name?: string,
  age?: string,
  sex?: string
) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('otp', otp);

  if (name) formData.append('name', name);
  if (age) formData.append('age', age);
  if (sex) formData.append('sex', sex);

  const response = await axios.post(
    'http://3.6.142.117/api/auth/verify-otp',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};
//////////////////////////////////////////////////////////////////////////////////////////////
export const getLoginOtp = async (
  email: string,
  navigation: AuthNavigation
) => {

  // const [loading, setLoading] = useState(false);
  if (!email) {
    Alert.alert('Required', 'Please enter your email.');
    return;
  }

  try {
    // setLoading(true);
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
        name: '',
        age: '',
        sex: '',
      });
    } else {
      Alert.alert('Error', response.data?.message || 'Something went wrong.');
    }
  } catch (error: any) {
    console.error('GET OTP ERROR:', error);
    Alert.alert('Error', error?.response?.data?.message || 'Failed to send OTP.');
  } finally {
    // setLoading(false);
  }
};
