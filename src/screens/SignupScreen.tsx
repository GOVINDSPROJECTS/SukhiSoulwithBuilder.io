import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import DividerWithText from '../components/DividerWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/navigation';
import SocialLoginButton from '../components/SocialLoginButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;


// ✅ Define your custom type
interface MyGoogleUser {
  idToken?: string;
  user: {
    email?: string;
    name?: string;
    photo?: string;
    id?: string;
  };
  accessToken?: string;
}

const SignupScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '618676745098-tupjtgn3d7lg07t1flkfnd9fpoh176lp.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['openid', 'email', 'profile',],
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      // ✅ Cast the result so TS knows about idToken
      const userInfo = await GoogleSignin.signIn() as MyGoogleUser;

      console.log('Google user info:', JSON.stringify(userInfo, null, 2));

     

      const idToken = userInfo.data?.idToken;
      console.log('Google id_token:', idToken);

      const payload = new FormData();
payload.append('id_token', idToken);

const response = await axios.post(
  "http://3.6.142.117/api/auth/login-google",
  payload,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);


      console.log('Laravel API response:', response.data);

      if (response.data.token) {
        // Save the token if needed (e.g. AsyncStorage, SecureStore, etc.)
        //Alert.alert('Login Successful');
        navigation.navigate('AppTabs', { screen: 'Home' });
      } else {
        Alert.alert('Error', 'Google login failed on server.');
      }
    } catch (error: any) {
      console.log('GOOGLE LOGIN ERROR:', JSON.stringify(error, null, 2));
      Alert.alert('Error', error.message || 'Google login error.');
    }
  };

  const handleGetOtp = () => {
    console.log({ name, age, sex, email });
    // navigate or call API
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Sukhi</Text>
        <Text style={styles.heading1}>Soul</Text>

        <Text style={styles.subHeading}>Create your account</Text>

        <CustomTextInput placeholder="Name" value={name} onChangeText={setName} />
        <CustomTextInput placeholder="Age" value={age} onChangeText={setAge} />
        <CustomTextInput placeholder="Sex" value={sex} onChangeText={setSex} />
        <CustomTextInput placeholder="Mail" value={email} onChangeText={setEmail} />

        <PrimaryButton
          title="Get OTP"
          //onPress={() => navigation.navigate('OtpVerification')}
          onPress={()=> navigation.navigate('AuthStack', { screen: 'OtpVerification' })}
          style={{ width: '40%', alignSelf: 'center' }}
        />

        <DividerWithText />

        <View style={styles.socialContainer}>
          <SocialLoginButton
            icon={require('../assets/icons/google.png')}
            onPress={handleGoogleLogin}
          />
          <SocialLoginButton
            icon={require('../assets/icons/apple.png')}
            onPress={() => {}}
          />
        </View>

        <Text style={styles.termsText}>
          By signing up you agree to our <Text style={styles.link}>Terms</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 24,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 38,
    color: '#000',
    marginBottom: 15,
    marginTop: 50,
  },
  heading1: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 38,
    color: '#000',
    marginBottom: 40,
  },
  subHeading: {
    fontSize: 21,
    color: '#333',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
