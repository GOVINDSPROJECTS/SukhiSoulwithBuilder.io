import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PrimaryButton from '../components/PrimaryButton';
import { getLoginOtp, verifyOtp } from '../auth/otpAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import AppText from '../components/AppText';
import GradientWrapper from '../components/GradientWrapper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '@/theme/colors';

const UpdateEmailOtp = () => {
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);
  const [otpError, setOtpError] = useState('');
  const otpInput = useRef<OTPTextInput>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'UpdateEmailOtp'>>();

  const { email, name, age, sex } = route.params;

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleChanges = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setOtpError('');
    try {
      const res = await verifyOtp(email, otp, name, age, sex);
      if (res?.token && res?.user) {
        // await setToken(res.token);
        // await setUser({ name: res.user.name, email: res.user.email });
        navigation.reset({ index: 0, routes: [{ name: 'AppTabs' }] });
      } else {
        setOtpError('OTP verification failed. Please try again.');
      }
    } catch {
      setOtpError('OTP verification failed. Please try again.');
    }
  };

  const handleResendOtp = () => {
    // getLoginOtp(email); // removed otpnavigation
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <GradientWrapper>
        <AppText variant='h1' style={styles.brand}>Sukhi{'\n'}Soul</AppText>
        <AppText variant='h2' style={{ marginVertical: hp('4%'), marginBottom: hp('4%') ,colors:'#2D2D2D'}}>
          Verification Code
        </AppText>

        <View style={styles.card}>
          <Text style={styles.subHeading}>We have sent the verification code to your email address.</Text>
          <Text style={styles.changeEmail}>Change Email Address?</Text>

          <Text style={styles.subHeading}>OTP</Text>
          <OTPTextInput
            ref={otpInput}
            inputCount={6}
            handleTextChange={setOtp}
            textInputStyle={styles.otpBox}
            containerStyle={styles.otpContainer}
          />

          {otpError && <Text style={styles.errorText}>{otpError}</Text>}

          <PrimaryButton
            title="Save Changes"
            onPress={handleChanges}
            style={{ width: wp('43'), alignSelf: 'center' }}
          />

          <TouchableOpacity onPress={handleResendOtp} disabled={counter !== 0}>
            <Text style={styles.resendText}>
              {counter > 0 ? `Resend OTP in 00:${counter < 10 ? '0' + counter : counter}` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </GradientWrapper>
    </KeyboardAvoidingView>
  );
};

export default UpdateEmailOtp;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: hp('8%'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp('6%'),
    width: wp('90%'),
    elevation: 6,
  },
  subHeading: {
    color: '#2D2D2D',
    fontSize: wp('4.5%'),
    marginBottom: hp('1%'),
  },
  changeEmail: {
    color: '#666666',
    fontSize: wp('3%'),
    marginBottom: hp('6%'),
    fontWeight:400,
  },
  otpContainer: {
    justifyContent: 'space-between',
    marginBottom: hp('2.5%'),
  },
  otpBox: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    backgroundColor: colors.secondary,
    borderColor: '#666',
    color: '#fff',
    fontSize: wp('4%'),
  },
  resendText: {
    color: '#2D2D2D',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('2%'),
    fontWeight:400
  },
  brand: {
    fontSize: wp('12%'),
    color: colors.primary,
  },
  errorText: {
    color: 'red',
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
    textAlign: 'center',
  },
});
