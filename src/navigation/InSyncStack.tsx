// src/navigation/InSyncStack.tsx
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InSyncIntroScreen from '../screens/InSync/InSyncIntroScreen';
import InSyncHomeScreen from '../screens/InSync/InSyncHomeScreen';
// import InSyncInviteScreen from '../screens/InSync/InSyncInviteScreen';
// import AddActivitiesScreen from '../screens/InSync/AddActivitiesScreen';
import { ActivityIndicator, View } from 'react-native';

export type InSyncStackParamList = {
  InSyncIntro: undefined;
  InSyncHome: undefined;
  InSyncInvite: undefined;
  AddActivities: undefined;
};

const Stack = createNativeStackNavigator<InSyncStackParamList>();

const InSyncStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const checkIntroSeen = async () => {
      const seen = await AsyncStorage.getItem('@insync_intro_seen');
      setShowIntro(seen !== 'true'); // show if not seen
      setIsLoading(false);
    };
    checkIntroSeen();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#104256" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="InSyncIntro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InSyncIntro" component={InSyncIntroScreen} />
        <Stack.Screen name="InSyncHome" component={InSyncHomeScreen} />
      {/* <Stack.Screen name="InSyncInvite" component={InSyncInviteScreen} />
      <Stack.Screen name="AddActivities" component={AddActivitiesScreen} /> */}
    </Stack.Navigator>
  );
};

export default InSyncStack;
