// src/navigation/InSyncStack.tsx
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InSyncIntroScreen from '../screens/InSync/InSyncIntroScreen';
// import InSyncHomeScreen from '../screens/InSync/InSyncHomeScreen';
// import InSyncInviteScreen from '../screens/InSync/InSyncInviteScreen';
// import AddActivitiesScreen from '../screens/InSync/AddActivitiesScreen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export type InSyncStackParamList = {
  InSyncIntro: undefined;
  InSyncHome: undefined;
  InSyncInvite: undefined;
  AddActivities: undefined;
};

const Stack = createNativeStackNavigator<InSyncStackParamList>();

export default function InSyncStack() {
  const [loading] = useState(false);
  const [introShown] = useState(false);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#104256" />
      </View>
    );
  }

  return (
    <Stack.Navigator
  screenOptions={{ headerShown: false }}
  initialRouteName={introShown ? 'InSyncHome' : 'InSyncIntro'}
>
              <Stack.Screen name="InSyncIntro" component={InSyncIntroScreen} />

      {/* Uncomment below when ready */}
      {/* <Stack.Screen name="InSyncInvite" component={InSyncInviteScreen} /> */}
      {/* <Stack.Screen name="AddActivities" component={AddActivitiesScreen} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
