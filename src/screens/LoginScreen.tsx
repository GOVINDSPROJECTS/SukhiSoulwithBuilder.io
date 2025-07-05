import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';
import axios from 'axios';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const LoginScreen = () => {
  const handleEmailOtp = () => {
    console.log('Navigate to email OTP screen');
  };

  const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();
    
    // ✅ Get the ID token correctly
    const { idToken } = await GoogleSignin.getTokens();

    // 🔥 Send it to Laravel backend
    const res = await axios.post('https://sukhisoul.com/api/login/google', {
      idToken,
    });

    // ✅ Save token (Zustand or AsyncStorage etc.)
    console.log('Login Success:', res.data.token);

  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.warn('User cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.warn('In progress');
    } else {
      console.error('Google Sign-in error:', error);
    }
  }
};
  const handleAppleLogin = () => {
    console.log('Apple login triggered');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
<Text style={styles.heading}>Sukhi</Text>
        <Text style={styles.heading1}>Soul</Text>
        <IconButton
          icon={require('../assets/icons/mail.png')}
          label="Get Email OTP"
          onPress={handleEmailOtp}
        />
        <IconButton
          icon={require('../assets/icons/google.png')}
          label="Continue with Google"
          onPress={handleGoogleLogin}
        />
        <IconButton
          icon={require('../assets/icons/apple.png')}
          label="Continue with Apple"
          onPress={handleAppleLogin}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    elevation: 6,
  },
  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 38,
    color: '#fff',
    marginBottom: 15,
    marginTop:20, 
  },
  heading1: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 38,
    color: '#fff',
    marginBottom: 100,
  },
});
