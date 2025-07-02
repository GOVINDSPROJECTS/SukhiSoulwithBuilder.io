import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PrimaryButton from '../components/PrimaryButton';

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);
  const otpInput = useRef<OTPTextInput>(null);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleVerify = () => {
    console.log('OTP Entered:', otp);
    // Add verification logic or navigation
  };

  const handleResendOtp = () => {
    console.log('Resend OTP');
    setCounter(30); // Reset timer
    otpInput.current?.clear(); // Clear existing input
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Sukhi Soul</Text>
        <Text style={styles.subHeading}>We have sent the verification code to your email address.</Text>
        <TouchableOpacity>
          <Text style={styles.changeEmail}>Change Email Address?</Text>
        </TouchableOpacity>

        <Text style={styles.subHeading} >OTP</Text>
        <OTPTextInput
          ref={otpInput}
          inputCount={6}
          tintColor="#fff"
          offTintColor="#555"
          handleTextChange={setOtp}
          textInputStyle={styles.otpBox}
          containerStyle={styles.otpContainer}
        />

        <PrimaryButton title="Sign In" onPress={handleVerify} style={{ width: '40%', alignSelf: 'center' }}
 />

        <TouchableOpacity onPress={handleResendOtp} disabled={counter !== 0}>
          <Text style={styles.resendText}>
            {counter > 0 ? `Resend OTP in 00:${counter < 10 ? '0' + counter : counter}` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#1a1a1a',
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
    color: '#ccc',
    fontSize: 21,
    marginBottom: 6,
  },
  changeEmail: {
    color: '#aaa',
    textDecorationLine: 'underline',
    fontSize: 13,
    marginBottom: 70,
  },
  otpContainer: {
    justifyContent: 'space-between',
    marginBottom:20
  },
  otpBox: {
    width:40,
    height:40,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#333',
    borderColor: '#666',
    color: '#fff',
    fontSize: 18,
  },
  resendText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
  },
});
