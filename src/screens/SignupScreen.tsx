// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import Toast from 'react-native-toast-message';
// import { RootStackParamList } from '../navigation/AuthStack';
// import api from '../services/api'; // Uncomment when API is ready

// type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

// const SignupScreen = ({ navigation }: Props) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

// const handleSignup = async () => {
//   if (!name || !email || !password || !confirmPassword) {
//     Alert.alert('Error', 'Please fill all fields');
//     return;
//   }

//   if (password !== confirmPassword) {
//     Alert.alert('Error', 'Passwords do not match');
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await api.post('/register', {
//       name,
//       email,
//       password,
//       c_password: confirmPassword,
//     });

//     if (response.data.success) {
//       Toast.show({
//   type: 'success',
//   text1: 'Registered Successfully!',
// });
// navigation.replace('Login');

//     } else {
//       Toast.show({
//   type: 'error',
//   text1: 'Registration Failed',
//   text2: 'Please check your details.',
// });

//     }
//   } catch (err) {
//     Alert.alert('Error', 'Server error occurred.');
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : (
//         <Button title="Register" onPress={handleSignup} />
//       )}

//       <View style={{ marginTop: 20 }}>
//         <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
//       </View>
//     </View>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import DividerWithText from '../components/DividerWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/types/navigation';
import SocialLoginButton from '../components/SocialLoginButton';


type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');

  const handleGetOtp = () => {
    console.log({ name, age, sex, email });
    // Navigate or trigger API once backend is ready
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
        // onPress={handleGetOtp} 
        onPress={() => navigation.navigate('OtpVerification')}
        style={{ width: '40%', alignSelf: 'center' }}
        />

        <DividerWithText />

        <View style={styles.socialContainer}>
          <SocialLoginButton icon={require('../assets/icons/google.png')} onPress={() => {}} />
          <SocialLoginButton icon={require('../assets/icons/apple.png')} onPress={() => {}} />
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
    marginTop:50, 
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
