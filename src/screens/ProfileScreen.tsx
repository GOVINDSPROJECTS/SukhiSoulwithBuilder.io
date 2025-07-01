import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuthStore } from '../store/authStore';

const ProfileScreen = () => {
  const name = useAuthStore((state) => state.name);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.name}>Hello, {name}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  name: { fontSize: 20, marginBottom: 20 },
});
