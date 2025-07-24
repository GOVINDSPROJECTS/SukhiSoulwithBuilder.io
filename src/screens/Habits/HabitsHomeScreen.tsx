import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import WeeklyTracker from './components/WeeklyTracker';
import HabitsList from './components/HabitsList';
import GradientWrapper from '../../components/GradientWrapper';
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CoachCard from './components/CoachCard';
import InfoCard from './components/InfoCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HabitsStackParamList } from '../../types/navigation';
import api from '../../services/api';
import { Habit } from '../../types/habit';



const HabitsHomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<HabitsStackParamList>>();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get('/userhabits');
        const rawHabits = response.data.habits;

        // Map backend habits to frontend Habit type
        const formattedHabits: Habit[] = rawHabits.map((habit: any) => ({
          id: habit.id.toString(),
          title: habit.habit_name,
          completed: habit.habit_progress_status === 'true',
        }));

        setHabits(formattedHabits);
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);


  const toggleHabitCompletion = (id: string) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updated);
    // 🟡 TODO: Later send POST /habits/:id/checkin here
  };


  const handleAddHabit = () => {
    // 🚧 To be implemented later
    // Alert.alert('hittingggg')
    navigation.navigate('AddHabit'); // 🔁 Navigates to AddHabitScreen
    // console.log('Add Habit Pressed');
  };

  return (
    <GradientWrapper>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <AppText variant="h2" style={styles.header}>
            Momentum
          </AppText>
          <AppText variant="caption" style={styles.header}>Create habits that stick</AppText>

          <WeeklyTracker
            title="This Week"
            habitCompletionMap={{
              '2025-07-09': { completed: 2, total: 10 },
              '2025-07-08': { completed: 10, total: 10 },
              '2025-07-07': { completed: 5, total: 10 },
            }}
            onDayPress={(date) => console.log('Pressed date:', date)}
          />


          <HabitsList
            title="Here's what you're building daily"
            habits={habits}
            onToggle={toggleHabitCompletion}
            showAddButton
            onAddHabitPress={handleAddHabit}
            maxItemsToShow={6}
          />

          <CoachCard
            title="Building habits doesn’t have to be hard"
            subtitle="We’ve helped thousands build habits that stick."
            buttonText="Talk to a Habit Coach"
            onPress={() => console.log('Coach card pressed')}
          />

          <InfoCard
            title="Understand Your Motivation"
            subtitle="Learn what helps habits last."
            onPress={() => console.log('Info card pressed')}
          />
        </ScrollView>
      )}
    </GradientWrapper>
  );
};

export default HabitsHomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('5%'),
    paddingTop: hp('10%'),
  },
  header: {
    marginLeft: wp('5%'),
    color: '#104256',
  },
});
