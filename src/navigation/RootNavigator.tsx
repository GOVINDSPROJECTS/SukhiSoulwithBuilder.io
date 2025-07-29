// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/navigation';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import AuthStack from './AuthStack';
// import AppTabs from './AppTabs';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const RootNavigator = () => {
//   // const isLoggedIn = false; // ✅ Replace with Zustand or auth check later

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Welcome" component={WelcomeScreen} />
//       <Stack.Screen name="AuthStack" component={AuthStack} />
//       <Stack.Screen name="AppTabs" component={AppTabs} />
//     </Stack.Navigator>
//   );
// };


// export default RootNavigator;




import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthStack from './AuthStack';
// import AppTabs from './AppTabs';
import { useAuthStore } from '../store/authStore';
import AppTabs from './AppTabs';
import DayDetailScreen from '../screens/Habits/DayDetailScreen';
import TeamUpFlowScreen from '../screens/Habits/TeamUpFlowScreen';
import HabitCircleScreen from '../screens/Habits/HabitCircleScreen';
import FriendDetailScreen from '../screens/Habits/FriendDetailScreen';



const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => !!state.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      ) : (
        <>
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="DayDetail" component={DayDetailScreen} />
        <Stack.Screen name="TeamUpFlow" component={TeamUpFlowScreen} />
        <Stack.Screen name="HabitCircle" component={HabitCircleScreen} />
        <Stack.Screen name="FriendDetail" component={FriendDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
