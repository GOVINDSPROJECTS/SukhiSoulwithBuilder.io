import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../navigation/AuthStack';
import api from '../services/api'; // Uncomment when API is ready

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleSignup = async () => {
  if (!name || !email || !password || !confirmPassword) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  setLoading(true);

  try {
    const response = await api.post('/register', {
      name,
      email,
      password,
      c_password: confirmPassword,
    });

    if (response.data.success) {
      Toast.show({
  type: 'success',
  text1: 'Registered Successfully!',
});
navigation.replace('Login');

    } else {
      Toast.show({
  type: 'error',
  text1: 'Registration Failed',
  text2: 'Please check your details.',
});

    }
  } catch (err) {
    Alert.alert('Error', 'Server error occurred.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Register" onPress={handleSignup} />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
});
