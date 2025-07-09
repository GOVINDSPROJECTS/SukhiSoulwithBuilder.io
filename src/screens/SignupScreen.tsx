import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
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
import GenderSelector from '../components/GenderSelector';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
const SignupScreen = () => {

  const otpnavigation = useNavigation<AuthNavigationProp>();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSignupOtp = () => {
    console.log({ name, email, age, sex });

    const newErrors: { [key: string]: string } = {};

  if (!name) newErrors.name = 'Name is required';
  if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter valid email';
  if (!age || isNaN(Number(age))) newErrors.age = 'Enter valid age';
  if (!sex) newErrors.sex = 'Please select gender';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);

    return;
  }
    // ✅ All fields valid
    getOtp(email, name, age, sex, otpnavigation);
  };


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

          <AppText
            variant='h2'
            style={{ marginTop: '10%', marginBottom: '4%' }}
          >Create your account</AppText>

          {/* <CustomTextInput placeholder="Name" value={name} onChangeText={setName} type="text" />
        <CustomTextInput placeholder="Age" value={age} onChangeText={setAge} type="age"/> */}
          {/* <CustomTextInput placeholder="Sex" value={sex} onChangeText={setSex} type="sex"/> */}
          {/* <GenderSelector value={sex} onSelect={setSex} />
        <CustomTextInput placeholder="Mail" value={email} onChangeText={setEmail} type="email"/> */}

          <CustomTextInput
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            type="text"
            error={errors.name}
          />

          <CustomTextInput
            placeholder="Age"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
            }}
            type="age"
            error={errors.age}
          />

          <GenderSelector value={sex} onSelect={setSex} error={errors.sex} />


          <CustomTextInput
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            type="email"
            error={errors.email}
          />


          <PrimaryButton
            title="Get OTP"
            onPress={handleSignupOtp}
            // onPress={()=> navigation.navigate('AuthStack', { screen: 'OtpVerification' })}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: '40%', alignSelf: 'center', marginTop: '5%' }}
          />

          <DividerWithText />

          <View style={styles.socialContainer}>
            <SocialLoginButton
              icon={require('../assets/icons/google.png')}
              onPress={() => handleGoogleSignin(navigation)}
            />
            {/* <SocialLoginButton
            icon={require('../assets/icons/apple.png')}
            onPress={() => {}}
          /> */}
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
    paddingTop: '20%'
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },

});
