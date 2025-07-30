// src/screens/FriendDetailScreen.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet,FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WeeklyTracker from './components/WeeklyTracker';
import HabitsList from './components/HabitsList';
import BottomSheetModal from '../../components/BottomSheetModal';
import InfoCard from './components/InfoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HabitsStackParamList } from '../../types/navigation';


type FriendDetailRouteProp = RouteProp<RootStackParamList, 'FriendDetail'>;

const FriendDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HabitsStackParamList>>();
  const route = useRoute<FriendDetailRouteProp>();
  const { friendName } = route.params;
  const [showModal, setShowModal] = useState(false);


    const [habits, setHabits] = useState([
      { id: '1', title: 'Cold Showers', completed: false },
      { id: '2', title: 'Exercise', completed: true },
      { id: '3', title: 'Meditation', completed: true },
    ]);
    const toggleHabitCompletion = (id: string) => {
        const updated = habits.map((habit) =>
          habit.id === id ? { ...habit, completed: !habit.completed } : habit
        );
        setHabits(updated);
    };
    const handleAddHabit = () => {
      setShowModal(true);
    };

  const activity = ["Running", "Beating Madhura", "Sketching", "Movie"];
  const schedule=["Daily", "Every Hour", "Weekly","Monthly"];
  const score=125;

  //For Existing Habits
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const toggleHabit = (habit: string) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits((prev) => prev.filter((h) => h !== habit));
    } else {
      setSelectedHabits((prev) => [...prev, habit]);
    }
  };



  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.container}>
          <Text style={styles.title}>{friendName}</Text>
          <Text style={[styles.subText,{marginTop: wp(3)}]}>Habit Partner since 5th July, 2025</Text>
          <Text style={styles.subText}>Habit Streak of 5 Days</Text>
          <Text style={styles.subheading}>Shared Habits</Text>

          {/* Here is a component for the habits */}
          <HabitsList
            title="Here’s what you’re building daily"
            habits={habits}
            onToggle={toggleHabitCompletion}
            showAddButton
            onAddHabitPress={handleAddHabit}
          />

          <Text style={styles.subheading}>Keep each other going</Text>
          <Text style={[styles.subText,{width:wp(40)}]}>A little motivation goes a long way</Text>

          <View style={[styles.motivationCard, { flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }]}>
                <View>
                    <Text style={styles.text18}>Nudge to Remind</Text>
                    <Text style={styles.subText}>Remind Mugdha to track today</Text>
                </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: wp(5), color: '#2D2D2D' }}>{'🔔'}</Text>
                  </View>
           </View>
          <View style={[styles.motivationCard, { flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }]}>
                <View>
                    <Text style={styles.text18}>Cheer your Friend</Text>
                    <Text style={styles.subText}>You’ve got this, let’s complete the challenge</Text>
                </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: wp(5), color: '#2D2D2D' }}>{'⭐'}</Text>
                  </View>
           </View>


          <Text style={[styles.subheading,{marginTop: wp(12)}]}>A week at a glance</Text>
          <WeeklyTracker
            title="Here's how far you've come >"
            habitCompletionMap={{
              '2025-07-09': { completed: 2, total: 10 },
              '2025-07-08': { completed: 10, total: 10 },
              '2025-07-07': { completed: 5, total: 10 },
            }}
          />

          <View style={{ marginTop: wp(0.1) }}>
            {activity.map((act, index) => (
              <View key={index} style={[styles.activiyWrapper,{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>

                <View>
                  <Text style={[styles.text18, { fontWeight: 'bold' }]}>{act}</Text>
                  <Text style={styles.subText}>{schedule[index]}</Text>
                </View>

                {/* <TouchableOpacity>
                  <Text style={{ fontSize: wp(3.5), color: '#666666', fontWeight: '500' }}>128{'🔥'}</Text>
                </TouchableOpacity> */}

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={[styles.subText,{marginTop: hp(2.6)}]}>{score}</Text>
                    <Image
                        source={require('../../assets/icons/streak.png')}
                        style={styles.streak}
                    />
                </View>

              </View>
            ))}
          </View>

        </View>
          <BottomSheetModal
            visible={showModal}
            onClose={() => setShowModal(false)}
          >
            <View
              style={{
                width: wp(13),
                height: 5,
                backgroundColor: '#000000',
                marginTop: 2,
                marginBottom: hp(10),
                borderRadius:12,
                alignSelf: 'center',
              }}
            />
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Existing Habits</Text>
              </View>

              <FlatList
                data={activity}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.habitRow}>
                    <Text style={styles.habitText}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => toggleHabit(item)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          selectedHabits.includes(item) && styles.checkedBox,
                        ]}
                      />
                    </TouchableOpacity>

                  </View>
                )}
              />

            </View>
              <TouchableOpacity onPress={() => navigation.navigate('AddHabitScreen' as any)} style={{ alignSelf: 'flex-end', marginRight: wp(4), marginTop: wp(2) }}>
                <Text style={styles.addNew}>+Add New Habit</Text>
              </TouchableOpacity>

        
            <PrimaryButton
                title="Done"
                onPress={() => console.log('Done')}
                style={{ width:wp(40),height:wp(11),alignSelf:"center",marginBottom: hp(5),marginTop:wp(8) }}
            />

          </BottomSheetModal>
    </ScrollView>
  );
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  container: {
     padding: 25 
  },
  title: { 
    fontSize: wp(12), 
    marginTop: wp(5),
    fontWeight: 700, 
    color: '#2D2D2D'
  },
  subText: {
    fontSize: wp(3.5), 
    color: '#666666', 
    fontWeight: 500,
    marginTop: wp(0.5)
  },
  subheading: { 
    marginTop: wp(6),
    fontSize: wp(6), 
    fontWeight: 700 
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: wp(0.2),
    borderColor: '#2D2D2D',
    marginTop: wp(5),
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text18:{
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#2D2D2D',
  },
  activiyWrapper:{
    marginVertical: hp('0.5'),
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    width: wp('90%'),
    height:wp(18),
  },

  streak: {
    width:wp(4),
    height: hp(4),
    marginTop: hp(3),
    marginLeft: wp(2),
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },


  // Existing Habits
  card: {
    width: wp(88),
    height: hp(50),
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: wp(9),
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: wp(2),
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  habitText: {
    fontSize: wp(6),
    color: '#2D2D2D',
    fontWeight: '400',
  },
  checkbox: {
    width: wp(7.5),
    height: wp(7.5),
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 2,
  },
  checkedBox: {
    backgroundColor: '#555',
  },
  addNew: {
    marginTop: wp(1),
    color: '#666666',
    fontWeight: '700',
    fontSize: wp(5),
    textAlign: 'right',
    marginBottom: wp(8),
    marginRight: wp(4),
  },
});
