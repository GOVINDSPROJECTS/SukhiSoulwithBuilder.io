// src/types/navigation.ts

import { NavigatorScreenParams } from '@react-navigation/native';
import HabitsHomeScreen from './../screens/Habits/HabitsHomeScreen';


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
  Settings: undefined;
    Habits:undefined;

};

export type HabitsStackParamList = {
    Habits:undefined;
    HabitsHome:undefined;
    AddHabit:undefined
}

// Root Navigation Stack
export type RootStackParamList = {
  Habits:undefined;
  Welcome: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppTabs: NavigatorScreenParams<AppTabsParamList>;
  HabitsStack: NavigatorScreenParams<HabitsStackParamList>;
  HomeScreen: { scrollToDiscover?: boolean };
  HabitsHomeScreen: undefined;
  DayDetail: { date: string };
  TeamUpFlow: undefined;
  HabitCircle: undefined;
  FriendDetail: { friendName: string };
  AddHabitScreen: undefined;
};
