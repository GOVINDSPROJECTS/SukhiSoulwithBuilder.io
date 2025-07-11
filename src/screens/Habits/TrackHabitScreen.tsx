import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrackHabitScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Habit Progress</Text>
    </View>
  );
};

export default TrackHabitScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
