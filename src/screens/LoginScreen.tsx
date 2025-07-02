// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/AuthStack';
// import { useAuthStore } from '../store/authStore';

// type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// const LoginScreen = ({ navigation }: Props) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const login = useAuthStore((state) => state.login);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter email and password');
//       return;
//     }

//     setLoading(true);
//     const success = await login(email, password);
//     setLoading(false);

//     if (success) {
//   Toast.show({
//     type: 'success',
//     text1: 'Login Successful!',
//   });
//   navigation.replace('Home');
// } else {
//   Toast.show({
//     type: 'error',
//     text1: 'Login Failed',
//     text2: 'Check your credentials and try again.',
//   });
// }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login to SukhiSoul</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
//       ) : (
//         <Button title="Login" onPress={handleLogin} />
//       )}

//       <View style={{ marginTop: 20 }}>
//         <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 15,
//   },
// });


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';

const LoginScreen = () => {
  const handleEmailOtp = () => {
    console.log('Navigate to email OTP screen');
  };

  const handleGoogleLogin = () => {
    console.log('Google login triggered');
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
