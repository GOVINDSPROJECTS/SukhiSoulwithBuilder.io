import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PrimaryButton from '../components/PrimaryButton';
import { getLoginOtp, verifyOtp } from '../auth/otpAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import AppText from '../components/AppText';
import GradientWrapper from '../components/GradientWrapper';


type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const OtpVerificationScreen = () => {

  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);
  const otpInput = useRef<OTPTextInput>(null);
  const [otpError, setOtpError] = useState('');


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const otpnavigation = useNavigation<AuthNavigationProp>();
  const route = useRoute<RouteProp<AuthStackParamList, 'OtpVerification'>>();

  const { email, name, age, sex } = route.params;
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setOtpError(''); // clear previous error

    try {
      const res = await verifyOtp(email, otp, name, age, sex);

      if (res?.token && res?.user) {
        await setToken(res.token);
        await setUser({
          name: res.user.name,
          email: res.user.email,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' }],
        });
      } else {
        setOtpError('OTP verification failed. Please try again.');
        // Alert.alert('Failed', 'Invalid response from server');
      }
    } catch (error: any) {
      // console.error('OTP verification failed:', error);
      setOtpError('OTP verification failed. Please try again.');
      // Alert.alert('Error', error?.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResendOtp = () => {
    getLoginOtp(email, otpnavigation); // THEN call OTP logic
  };

  return (
    <GradientWrapper >
      {/* <View style={styles.container}> */}
      <View style={styles.card}>
        <AppText variant="h1" style={styles.brand}>Sukhi Soul</AppText>
        <Text style={styles.subHeading}>We have sent the verification code to your email address.</Text>

        <View>
          <Text style={styles.changeEmail}>{email}</Text>
        </View>

        <Text style={styles.subHeading}>OTP</Text>
        <OTPTextInput
          ref={otpInput}
          inputCount={6}
          tintColor="#fff"
          offTintColor="#555"
          handleTextChange={setOtp}
          textInputStyle={styles.otpBox}
          containerStyle={styles.otpContainer}
        />

        {otpError ? (
          <Text style={{ color: 'red', marginBottom: 10, marginLeft: 4 }}>
            {otpError}
          </Text>
        ) : null}

        <PrimaryButton
          title="Verify"
          onPress={handleVerify}
          style={{ width: '40%', alignSelf: 'center' }}
        />

        <TouchableOpacity onPress={handleResendOtp} disabled={counter !== 0}>
          <Text style={styles.resendText}>
            {counter > 0 ? `Resend OTP in 00:${counter < 10 ? '0' + counter : counter}` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </GradientWrapper>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    elevation: 6,
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
  },
  subHeading: {
    color: '#000',
    fontSize: 18,
    marginBottom: 6,
  },
  changeEmail: {
    color: '#999',
    fontSize: 13,
    marginBottom: '30%',
  },
  otpContainer: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#104256',
    borderColor: '#666',
    color: '#fff',
    fontSize: 16,
  },
  resendText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
  },
  brand: {
    marginTop: 4,
  },
});
