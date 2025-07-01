// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { useAuthStore } from '../store/authStore';

// const HomeScreen = () => {
//   const logout = useAuthStore((state) => state.logout);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to SukhiSoul 🌿</Text>
//       <Button title="Logout" onPress={logout} />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
// });

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { lightTheme, darkTheme } from '../theme/colors';

const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome to SukhiSoul</Text>
      <Button title="Logout" onPress={logout} color={theme.primary} />
      <View style={{ marginTop: 20 }}>
        <Button title="Toggle Theme" onPress={toggleTheme} color={theme.primary} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
