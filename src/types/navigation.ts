// src/types/navigation.ts

import { NavigatorScreenParams } from '@react-navigation/native';

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
};
