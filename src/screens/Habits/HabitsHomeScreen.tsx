import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert,TouchableOpacity } from 'react-native';
import WeeklyTracker from './components/WeeklyTracker';
import HabitsList from './components/HabitsList';
import GradientWrapper from '../../components/GradientWrapper';
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CoachCard from './components/CoachCard';
import InfoCard from './components/InfoCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Text } from 'react-native';
import colors from '@/theme/colors';
import BuildHabitTogetherCard from './components/BuildHabitTogetherCard';
import PrimaryButton from '../../components/PrimaryButton';
import BottomSheetModal from '../../components/BottomSheetModal';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HabitsHomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [showModal, setShowModal] = useState(false);


  const [habits, setHabits] = useState([
    { id: '1', title: 'Cold Showers', completed: false },
    { id: '2', title: 'Exercise', completed: true },
    { id: '3', title: 'Meditation', completed: true },
    { id: '4', title: 'Journaling', completed: true },
    { id: '5', title: 'Reading', completed: true },
    { id: '6', title: 'Stretching', completed: true },
  ]);


  const toggleHabitCompletion = (id: string) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updated);
  };

  const handleAddHabit = () => {
    // 🚧 To be implemented later
    // Alert.alert('hittingggg')
    navigation.navigate({ name: 'AddHabit' } as any); // 🔁 Navigates to AddHabitScreen
    // console.log('Add Habit Pressed');
  };

  return (
    <GradientWrapper>



      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppText variant="h2" style={[styles.header,,styles.title]}>
          Momentum
        </AppText>
        <AppText variant= "caption" style={styles.header}>Create habits that stick</AppText>

        <WeeklyTracker
          title="Here's how far you've come >"
          habitCompletionMap={{
            '2025-07-09': { completed: 2, total: 10 },
            '2025-07-08': { completed: 10, total: 10 },
            '2025-07-07': { completed: 5, total: 10 },
          }}
          onDayPress={(date) => navigation.navigate('DayDetail', { date })}
        />


        <HabitsList
          title="Let's kick off Your routine"
          habits={habits}
          onToggle={toggleHabitCompletion}
          showAddButton
          onAddHabitPress={handleAddHabit}
          maxItemsToShow={6}
        />

        <AppText variant="h1" style={[styles.text]}>
          Building habbits don't have to be hard
        </AppText>
        <AppText variant= "caption" style={[styles.subtext,colors.muted]}>Quick tools to support your habit journey</AppText>





        <CoachCard
          title="Not sure where to begin? Let's figure it out together "
          subtitle=""
          buttonText="Talk to a Habit Coach"
          onPress={() => console.log('Coach card pressed')}
        />

        <InfoCard
          title="Understand Your Habits"
          subtitle="Learn what helps habits last."
          onPress={() => console.log('Info card pressed')}
        />

        <BuildHabitTogetherCard onPress={() => navigation.navigate('TeamUpFlow')} />


      </ScrollView>
    </GradientWrapper>
  );
};



export default HabitsHomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('5%'),
    paddingTop: hp('1%'),
  },
  title: {
    fontSize: wp(12),
    fontWeight: 'bold',
    color: '#245C73',
    marginBottom: hp(1),
    
  },
  subtitle: {
    fontSize: wp(4),
    color: '#245C73',
    textAlign: 'center',
    marginBottom: hp(5),
  },
  header: {
    marginLeft: wp('5%'),
    color: '#104256',
  },
  subtext:{
    marginLeft: wp('5%'),
    fontSize:wp(4),
    marginBottom:wp(11)
  },
  text:{
    color:' #2D2D2D',
    marginLeft: wp('5%'),
    marginTop:wp(11),
    fontSize:wp(8),
  },



    //Habit Coach Page.......
    modalTitle: {
    fontSize: wp(6),
    fontWeight: '600',
    marginBottom: hp(2),
    color: '#2D2D2D',
  },
  tipGroup: {
    paddingBottom: hp(3),
  },
  tipTitle: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp(0.5),
  },
  tipText: {
    fontSize: wp(3.6),
    color: '#2D2D2D',
  },
  closeTips:{
    width: wp(5),
    height:hp(5),
    alignSelf:"flex-end"
  },
});
