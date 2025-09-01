import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const ReportsAndLogsScreen = () => {
  const navigation = useNavigation();

  const reportData = [
    {
      title: 'Mood Tracker',
      subtitle: 'Info about habit formation',
      // onPress: () => navigation.navigate('MoodTrackerScreen'),
    },
    {
      title: 'Habit Tracker',
      subtitle: 'Know your relations better',
      // onPress: () => navigation.navigate('HabitTrackerScreen'),
    },
    {
      title: 'Connection Score',
      subtitle: 'Know your relations better',
      // onPress: () => navigation.navigate('ConnectionScoreScreen'),
    },
    {
      title: 'Compatibility tests Score',
      subtitle: 'Know your relations better',
      // onPress: () => navigation.navigate('CompatibilityScoreScreen'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reports and Logs</Text>

      {/* onPress={item.onPress} */}
      {reportData.map((item, index) => (                              
        <TouchableOpacity key={index} style={styles.card} >   
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(6),
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  title: {
    fontSize: wp(6),
    fontWeight: '700',
    marginBottom: hp(11),
    marginTop:hp(2),
    color: '#2D2D2D',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(4),
    borderRadius: wp(5),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: hp(2),
    borderWidth: 0.4,
    borderColor: '#ddd',
    
  },
  cardTitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#2D2D2D',
    marginBottom: wp(1),
  },
  cardSubtitle: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#666666',
  },
});

export default ReportsAndLogsScreen;
