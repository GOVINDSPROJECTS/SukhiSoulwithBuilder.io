import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import DividerWithText from '../components/DividerWithText';
import { AuthStackParamList, RootStackParamList } from 'src/types/navigation';
import SocialLoginButton from '../components/SocialLoginButton';
import GradientWrapper from '../components/GradientWrapper';
import AppText from '../components/AppText';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { handleGoogleSignin } from '../auth/googleAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getOtp } from '../auth/otpAuth';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
const SignupScreen = () => {

const otpnavigation = useNavigation<AuthNavigationProp>();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


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

  return (
    <KeyboardAvoidingView
    style={styles.wrapper}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <GradientWrapper>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AppText variant='h1'>Sukhi</AppText>
        <AppText variant='h1'>Soul</AppText>

        <AppText variant='h2'>Create your account</AppText>

        <CustomTextInput placeholder="Name" value={name} onChangeText={setName} />
        <CustomTextInput placeholder="Age" value={age} onChangeText={setAge} />
        <CustomTextInput placeholder="Sex" value={sex} onChangeText={setSex} />
        <CustomTextInput placeholder="Mail" value={email} onChangeText={setEmail} />

        <PrimaryButton
          title="Get OTP"
          onPress={() => getOtp(email, name, age, sex, otpnavigation)}
          // onPress={()=> navigation.navigate('AuthStack', { screen: 'OtpVerification' })}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: '40%', alignSelf: 'center' }}
        />

        <DividerWithText />

        <View style={styles.socialContainer}>
          <SocialLoginButton
            icon={require('../assets/icons/google.png')}
            onPress={() => handleGoogleSignin(navigation)}
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
      </GradientWrapper>
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
