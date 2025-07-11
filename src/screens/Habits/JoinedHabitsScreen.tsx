import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JoinedHabitsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits You're Doing Together</Text>
    </View>
  );
};

export default JoinedHabitsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
