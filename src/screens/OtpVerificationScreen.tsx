// import React, { useRef, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import OTPTextInput from 'react-native-otp-textinput';
// import PrimaryButton from '../components/PrimaryButton';
// import { verifyOtp } from '../auth/otpAuth';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { AuthStackParamList, RootStackParamList } from '../types/navigation';

// type OtpNavProp = NativeStackNavigationProp<RootStackParamList>;
// type OtpRouteProp = RouteProp<AuthStackParamList, 'OtpVerification'>;

// const OtpVerificationScreen = () => {
//   const [otp, setOtp] = useState('');
//   const [counter, setCounter] = useState(30);
//   const otpInput = useRef<OTPTextInput>(null);

//   const navigation = useNavigation<OtpNavProp>();
//   const route = useRoute<OtpRouteProp>();

//   const { email, name, age, sex } = route.params;

//   useEffect(() => {
//     if (counter > 0) {
//       const timer = setTimeout(() => setCounter(counter - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [counter]);

//   const handleVerify = async () => {
//     if (otp.length < 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
//       return;
//     }

//     try {
//       const payload = {
//         otp,
//         email,
//         name,
//         age,
//         sex,
//         navigation,
//       };

//       const res = await verifyOtp(payload);

//       if (res?.data?.token) {
//         // Save token and go to Home
//         await AsyncStorage.setItem('token', res.data.token);
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'AppTabs' }],
//         });
//       } else {
//         Alert.alert('Failed', res?.data?.message || 'OTP Verification failed');
//       }
//     } catch (err: any) {
//       console.error('OTP VERIFY ERROR:', err);
//       Alert.alert('Error', 'OTP verification failed.');
//     }
//   };

//   const handleResendOtp = () => {
//     // Optional: Call resend API and reset counter
//     setCounter(30);
//     Alert.alert('Info', 'OTP resent to your email.');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.heading}>Sukhi Soul</Text>
//         <Text style={styles.subHeading}>We’ve sent a code to your email.</Text>

//         <TouchableOpacity>
//           <Text style={styles.changeEmail}>Change Email Address?</Text>
//         </TouchableOpacity>

//         <Text style={styles.subHeading}>Enter OTP</Text>
//         <OTPTextInput
//           ref={otpInput}
//           inputCount={6}
//           tintColor="#fff"
//           offTintColor="#555"
//           handleTextChange={setOtp}
//           textInputStyle={styles.otpBox}
//           containerStyle={styles.otpContainer}
//         />

//         <PrimaryButton
//           title="Verify"
//           onPress={handleVerify}
//           style={{ width: '40%', alignSelf: 'center' }}
//         />

//         <TouchableOpacity onPress={handleResendOtp} disabled={counter !== 0}>
//           <Text style={styles.resendText}>
//             {counter > 0
//               ? `Resend OTP in 00:${counter < 10 ? '0' + counter : counter}`
//               : 'Resend OTP'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OtpVerificationScreen;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 24,
//     width: '90%',
//     elevation: 6,
//   },
//   heading: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 40,
//   },
//   subHeading: {
//     color: '#ccc',
//     fontSize: 21,
//     marginBottom: 6,
//   },
//   changeEmail: {
//     color: '#aaa',
//     textDecorationLine: 'underline',
//     fontSize: 13,
//     marginBottom: 70,
//   },
//   otpContainer: {
//     justifyContent: 'space-between',
//     marginBottom:20
//   },
//   otpBox: {
//     width:40,
//     height:40,
//     borderRadius: 8,
//     borderWidth: 1,
//     backgroundColor: '#333',
//     borderColor: '#666',
//     color: '#fff',
//     fontSize: 18,
//   },
//   resendText: {
//     color: '#888',
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 14,
//   },
// });


import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PrimaryButton from '../components/PrimaryButton';
import { verifyOtp } from '../auth/otpAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);
  const otpInput = useRef<OTPTextInput>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, 'OtpVerification'>>();

  const { email, name, age, sex } = route.params;

  // const login = useAuthStore(state => state.login);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      const res = await verifyOtp(otp, email, name, age, sex);

      if (res?.data?.token) {
        navigation.replace('AppTabs', { screen: 'Home' });
      } else {
        Alert.alert('Verification Failed', 'Server did not return a token.');
      }
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      Alert.alert('Error', error.response?.data?.message || 'Verification failed.');
    }
  };

  const handleResendOtp = () => {
    // Optionally implement resend logic here
    setCounter(30);
    Alert.alert('OTP Sent', 'A new OTP has been sent to your email.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Sukhi Soul</Text>
        <Text style={styles.subHeading}>We have sent the verification code to your email address.</Text>

        <TouchableOpacity>
          <Text style={styles.changeEmail}>Change Email Address?</Text>
        </TouchableOpacity>

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
    marginBottom: 20,
  },
  otpBox: {
    width: 40,
    height: 40,
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
