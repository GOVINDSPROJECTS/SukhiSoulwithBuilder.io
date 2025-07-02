// src/types/navigation.ts

import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Screens
export type AuthStackParamList = {
  Login: { referralCode?: string }| undefined;
  Signup: { referralCode?: string }| undefined;
  OtpVerification: undefined;
};

// Main App Tabs
export type AppTabsParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Root Navigation Stack
export type RootStackParamList = {
  Welcome: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppTabs: NavigatorScreenParams<AppTabsParamList>;
};
