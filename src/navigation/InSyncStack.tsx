// // src/navigation/InSyncStack.tsx
// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import InSyncIntroScreen from '../screens/InSync/InSyncIntroScreen';
// import InSyncHomeScreen from '../screens/InSync/InSyncHomeScreen';
// // import InSyncInviteScreen from '../screens/InSync/InSyncInviteScreen';
// // import AddActivitiesScreen from '../screens/InSync/AddActivitiesScreen';
// import { ActivityIndicator, View } from 'react-native';

// export type InSyncStackParamList = {
//   InSyncIntro: undefined;
//   InSyncHome: undefined;
//   InSyncInvite: undefined;
//   AddActivities: undefined;
// };

// const Stack = createNativeStackNavigator<InSyncStackParamList>();

// const InSyncStack = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showIntro, setShowIntro] = useState(false);

//   useEffect(() => {
//     const checkIntroSeen = async () => {
//       const seen = await AsyncStorage.getItem('@insync_intro_seen');
//       setShowIntro(seen !== 'true'); // show if not seen
//       setIsLoading(false);
//     };
//     checkIntroSeen();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#104256" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator initialRouteName="InSyncIntro" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="InSyncIntro" component={InSyncIntroScreen} />
//         <Stack.Screen name="InSyncHome" component={InSyncHomeScreen} />
//       {/* <Stack.Screen name="InSyncInvite" component={InSyncInviteScreen} />
//       <Stack.Screen name="AddActivities" component={AddActivitiesScreen} /> */}
//     </Stack.Navigator>
//   );
// };

// export default InSyncStack;


// src/navigation/InSyncStack.tsx
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InSyncIntroScreen from '../screens/InSync/InSyncIntroScreen';
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

export default function InSyncStack() {
  const [loading] = useState(false);
  const [introShown] = useState(false);

  // useEffect(() => {
  //   const loadIntroStatus = async () => {
  //     try {
  //       const seen = await AsyncStorage.getItem('@insync_intro_seen');
  //       setIntroShown(seen === 'true');
  //     } catch (error) {
  //       console.warn('Error reading intro status:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadIntroStatus();
  // }, []);

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
      {/* {!introShown ? (
        <Stack.Screen name="InSyncIntro" component={InSyncIntroScreen} />
      ) : (
        <Stack.Screen name="InSyncHome" component={InSyncHomeScreen} />
      )} */}
              <Stack.Screen name="InSyncIntro" component={InSyncIntroScreen} />

      {/* Uncomment below when ready */}
      {/* <Stack.Screen name="InSyncInvite" component={InSyncInviteScreen} /> */}
      {/* <Stack.Screen name="AddActivities" component={AddActivitiesScreen} /> */}
    </Stack.Navigator>
  );
}
