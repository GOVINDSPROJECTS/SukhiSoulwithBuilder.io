// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { useAuthStore } from '../store/authStore';

// const ProfileScreen = () => {
//   const name = useAuthStore((state) => state.name);
//   const logout = useAuthStore((state) => state.logout);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
//       <Text style={styles.name}>Hello, {name}!</Text>
//       <Button title="Logout" onPress={logout} />
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   name: { fontSize: 20, marginBottom: 20 },
// });


import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { fetchUserInfo } from '../services/auth';

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      {user ? (
        <>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading user info...</Text>
      )}
      <Button title="Logout" onPress={logout} color="#FF3B30" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 10 },
});

export default ProfileScreen;
