import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';
import { handleGoogleSignin } from '../auth/googleAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/navigation';
const LoginScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  

  const handleEmailOtp = () => {
    console.log('Navigate to email OTP screen');
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
          onPress={() => handleGoogleSignin(navigation)}
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
