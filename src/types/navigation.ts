// src/types/navigation.ts

import { HabitsStackParamList } from '@/navigation/HabitsStack';
import { InSyncStackParamList } from '@/navigation/InSyncStack';
import { NavigatorScreenParams } from '@react-navigation/native';
// import HabitsHomeScreen from './../screens/Habits/HabitsHomeScreen';


// Auth Screens
export type AuthStackParamList = {
  Login: { referralCode?: string }| undefined;
  Signup: { referralCode?: string }| undefined;
  OtpVerification: {
    email: string;
    name?: string;
    age?: string;
    sex?: string;
  };

};

// Main App Tabs
export type AppTabsParamList = {
  Home:  { referralCode?: string }| undefined;
  Profile: undefined;
  InSyncIntro: undefined;
  Habits:undefined;
  InSync:undefined;


};

// export type HabitsStackParamList = {
//     Habits:undefined;
//     HabitsHome:undefined;
//     AddHabit:undefined
//     AddTogetherHabit:{ room_id: string };
//     EditOrDelete:{id:string}
// }

// export type InSyncStackParamList = {
//   InSyncIntro:undefined;
//   InSyncHome:undefined;
//   InSync:undefined; 
// }

// Root Navigation Stack
export type RootStackParamList = {
  Habits:undefined;
  Welcome: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppTabs: NavigatorScreenParams<AppTabsParamList>;
  HabitsStack: NavigatorScreenParams<HabitsStackParamList>;
  InsyncStack: NavigatorScreenParams<InSyncStackParamList>;
  HomeScreen: undefined;
  HabitsHome: undefined;
  DayDetail: { date: string };
  TeamUpFlow: undefined;
  HabitCircle: undefined;
  FriendDetail: { room_id : string };
  AddHabitScreen: undefined;
  otpVerificationScreen: undefined;
  UpdateEmailOtp: {
      email: string;
      name?: string;
      age?: string;
      sex?: string;
    };
  ReportsLogsScreen:undefined;
  SavedItemsScreen:undefined;
  NextScreen: { roomId: string }; 
  GetEnterCode:undefined;
  EnterCodeScreen: undefined;
  AddTogetherHabit:{ room_id: string };
  InSyncHome:undefined;
  EditOrDeleteHabit :{id:string};
};
