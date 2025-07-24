import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitsIntroScreen from '../screens/Habits/HabitsIntroScreen';
import JoinedHabitsScreen from '../screens/Habits/JoinedHabitsScreen';
import HabitsHomeScreen from '../screens/Habits/HabitsHomeScreen';
import TrackHabitScreen from '../screens/Habits/TrackHabitScreen';
import AddHabitScreen from '@/screens/Habits/AddHabitScreen';

export type HabitsStackParamList = {
  HabitsIntro: undefined;
  HabitsHome: undefined;
  CreateHabit: undefined;
  TrackHabit: undefined;
  JoinedHabits: undefined;
  AddHabit:undefined;
};

const Stack = createNativeStackNavigator<HabitsStackParamList>();

const HabitsStack = () => {
  return (
    <Stack.Navigator initialRouteName="HabitsIntro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HabitsHome" component={HabitsHomeScreen} />
        <Stack.Screen name="TrackHabit"   component={TrackHabitScreen}/>
        <Stack.Screen name="JoinedHabits" component={JoinedHabitsScreen}/>
        <Stack.Screen name="HabitsIntro" component={HabitsIntroScreen}/>
        <Stack.Screen name="AddHabit" component={AddHabitScreen} />
    </Stack.Navigator>
  );
};

export default HabitsStack;
