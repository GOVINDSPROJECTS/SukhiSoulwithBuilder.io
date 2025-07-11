import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateHabitScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Habit</Text>
    </View>
  );
};

export default CreateHabitScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
