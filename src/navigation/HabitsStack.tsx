// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HabitsIntroScreen from '../screens/Habits/HabitsIntroScreen';
// import JoinedHabitsScreen from '../screens/Habits/JoinedHabitsScreen';
// import HabitsHomeScreen from '../screens/Habits/HabitsHomeScreen';
// import TrackHabitScreen from '../screens/Habits/TrackHabitScreen';
// import AddHabitScreen from '@/screens/Habits/AddHabitScreen';
// import DayDetailScreen from '../screens/Habits/DayDetailScreen';
// import HabitCircleScreen from '../screens/Habits/HabitCircleScreen';
// import FriendDetailScreen from '../screens/Habits/FriendDetailScreen';
// import TeamUpFlowScreen from '../screens/Habits/TeamUpFlowScreen';

// export type HabitsStackParamList = {
//   HabitsIntro: undefined;
//   HabitsHome: undefined;
//   CreateHabit: undefined;
//   TrackHabit: undefined;
//   JoinedHabits: undefined;
//   AddHabit:undefined;

//   DayDetail: undefined;
//   HabitCircle: undefined;
//   FriendDetail: undefined;
//   TeamUpFlow: undefined;
// };

// const Stack = createNativeStackNavigator<HabitsStackParamList>();

// const HabitsStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="HabitsIntro" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="HabitsHome" component={HabitsHomeScreen} />
//         <Stack.Screen name="TrackHabit"   component={TrackHabitScreen}/>
//         <Stack.Screen name="JoinedHabits" component={JoinedHabitsScreen}/>
//         <Stack.Screen name="HabitsIntro" component={HabitsIntroScreen}/>
//         <Stack.Screen name="AddHabit" component={AddHabitScreen} />

//           {/* <Stack.Screen name="AddHabit" component={a} /> */}

//         <Stack.Screen name="DayDetail" component={DayDetailScreen} />
//         <Stack.Screen name="HabitCircle" component={HabitCircleScreen} />
//         <Stack.Screen name="FriendDetail" component={FriendDetailScreen} />
//         <Stack.Screen name="TeamUpFlow" component={TeamUpFlowScreen} />

//     </Stack.Navigator>
//   );
// };

// export default HabitsStack;


import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitsIntroScreen from '../screens/Habits/HabitsIntroScreen';
import JoinedHabitsScreen from '../screens/Habits/JoinedHabitsScreen';
import HabitsHomeScreen from '../screens/Habits/HabitsHomeScreen';
import TrackHabitScreen from '../screens/Habits/TrackHabitScreen';
import AddHabitScreen from '@/screens/Habits/AddHabitScreen';
import DayDetailScreen from '../screens/Habits/DayDetailScreen';
import HabitCircleScreen from '../screens/Habits/HabitCircleScreen';
import FriendDetailScreen from '../screens/Habits/FriendDetailScreen';
import TeamUpFlowScreen from '../screens/Habits/TeamUpFlowScreen';
import { useAuthStore } from '@/store/authStore';

export type HabitsStackParamList = {
  HabitsIntro: undefined;
  HabitsHome: undefined;
  CreateHabit: undefined;
  TrackHabit: undefined;
  JoinedHabits: undefined;
  AddHabit: undefined;
  DayDetail: undefined;
  HabitCircle: undefined;
  FriendDetail: undefined;
  TeamUpFlow: undefined;
};

const Stack = createNativeStackNavigator<HabitsStackParamList>();

export default function HabitsNavigator() {
  const { introShown, loadIntroStatus } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadIntroStatus();
      setLoading(false);
    };
    init();
  }, [loadIntroStatus]);

  if (loading) return null; // Or splash/loading screen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!introShown ? (
  <Stack.Screen name="HabitsIntro" component={HabitsIntroScreen} />
) : (
  <Stack.Screen name="HabitsHome" component={HabitsHomeScreen} />
)}

      <Stack.Screen name="TrackHabit" component={TrackHabitScreen} />
      <Stack.Screen name="JoinedHabits" component={JoinedHabitsScreen} />
      <Stack.Screen name="AddHabit" component={AddHabitScreen} />
      <Stack.Screen name="DayDetail" component={DayDetailScreen} />
      <Stack.Screen name="HabitCircle" component={HabitCircleScreen} />
      <Stack.Screen name="FriendDetail" component={FriendDetailScreen} />
      <Stack.Screen name="TeamUpFlow" component={TeamUpFlowScreen} />
    </Stack.Navigator>
  );
}
