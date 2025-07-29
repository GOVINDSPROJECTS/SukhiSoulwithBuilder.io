// src/screens/FriendDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type FriendDetailRouteProp = RouteProp<RootStackParamList, 'FriendDetail'>;

const FriendDetailScreen = () => {
  const route = useRoute<FriendDetailRouteProp>();
  const { friendName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{friendName}</Text>
      <Text style={styles.subheading}>Shared Habits:</Text>
      <Text>• Reading</Text>
      <Text>• Running</Text>
      <Text>• Journaling</Text>
      <Text style={styles.subheading}>Progress Overview:</Text>
      <Text>✅ 42-day streak</Text>
      <Text>💪 Weekly progress: 6/7</Text>
    </View>
  );
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subheading: { marginTop: 16, fontSize: 16, fontWeight: '600' },
});
