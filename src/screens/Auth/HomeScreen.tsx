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
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const moods = ['😢 Bad', '😐 Okay', '😊 Good', '😁 Very Happy'];

const habits = ['Cold Showers', 'Exercise', 'Meditation'];

const tasks = ['Drink Water', 'Read 10 pages', 'No Social Media'];

const discoverCards = [
  { id: '1', title: 'Go Natural', author: '@sukhisoul' },
  { id: '2', title: 'Be Like Water', author: '@sukhisoul' },
];

const HomeScreen = () => {
  const [selectedMood, setSelectedMood] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Top Tab Nav UI (visual only) */}
      <View style={styles.topNav}>
        <Text style={styles.topNavTextActive}>Mood</Text>
        <Text style={styles.topNavText}>Habits</Text>
        <Text style={styles.topNavText}>Activity</Text>
        <Text style={styles.topNavText}>Educate</Text>
      </View>

      {/* Mood Slider */}
      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodSlider}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.moodButtonSelected,
            ]}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Habits Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today’s Habits</Text>
        {habits.map((habit, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardText}>{habit}</Text>
          </View>
        ))}
      </View>

      {/* Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        {tasks.map((task, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardText}>{task}</Text>
          </View>
        ))}
      </View>

      {/* Discover Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discover</Text>
        <FlatList
          data={discoverCards}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.discoverCard}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAuthor}>{item.author}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafe',
    padding: 16,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  topNavText: {
    fontSize: 14,
    color: '#999',
  },
  topNavTextActive: {
    fontSize: 14,
    color: '#0e3c61',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  moodSlider: {
    marginBottom: 24,
  },
  moodButton: {
    backgroundColor: '#d9e3ec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  moodButtonSelected: {
    backgroundColor: '#0e3c61',
  },
  moodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#e5ecf4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardText: {
    color: '#333',
  },
  discoverCard: {
    width: width * 0.6,
    height: 150,
    backgroundColor: '#0e3c61',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardAuthor: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 8,
  },
});
