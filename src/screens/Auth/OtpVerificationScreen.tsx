import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PrimaryButton from '../../components/PrimaryButton';
import { getLoginOtp, verifyOtp } from '../../auth/otpAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import AppText from '../../components/AppText';
import GradientWrapper from '../../components/GradientWrapper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



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
      }
    } catch (error: any) {
      setOtpError('OTP verification failed. Please try again.');
    }
  };

  const handleResendOtp = () => {
    getLoginOtp(email, otpnavigation); // THEN call OTP logic
  };

  return (
    <GradientWrapper >
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
          <Text style={{ color: 'red', marginBottom: hp('1%'), marginLeft: wp('1%') }}>
            {otpError}
          </Text>
        ) : null}

        <PrimaryButton
          title="Verify"
          onPress={handleVerify}
          style={{ width: wp('40%'), alignSelf: 'center' }}

        />

        <TouchableOpacity onPress={handleResendOtp} disabled={counter !== 0}>
          <Text style={styles.resendText}>
            {counter > 0 ? `Resend OTP in 00:${counter < 10 ? '0' + counter : counter}` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: wp('6%'),
    width: wp('90%'),
    elevation: 6,
  },
  heading: {
    color: '#fff',
    fontSize: wp('7%'),
    fontWeight: '700',
    marginBottom: hp('5%'),
  },
  subHeading: {
    color: '#000',
    fontSize: wp('4.5%'),
    marginBottom: hp('1.5%'),
  },
  changeEmail: {
    color: '#999',
    fontSize: wp('3.5%'),
    marginBottom: hp('6%'),
  },
  otpContainer: {
    justifyContent: 'space-between',
    marginBottom: hp('2.5%'),
  },
  otpBox: {
    width: wp('11.5%'),
    height: wp('11.5%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    backgroundColor: '#104256',
    borderColor: '#666',
    color: '#fff',
    fontSize: wp('4%'),
  },
  resendText: {
    color: '#888',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  brand: {
    marginTop: hp('1%'),
  },
});
