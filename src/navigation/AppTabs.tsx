
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabsParamList } from '../types/navigation';
import HomeScreen from '../screens/Auth/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
// import HabitsIntroScreen from '../screens/HabitsIntroScreen';
import HabitsStack from './HabitsStack';


const Tab = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen
  name="Habits"
  component={HabitsStack}
  options={{
    tabBarLabel: 'Habits',
    // tabBarIcon: ({ color, size }) => (
    //   <Ionicons name="leaf-outline" size={size} color={color} />
    // ),
  }}
/>
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default AppTabs;

// import { NavigationContainer } from '@react-navigation/native';
// import SwipeTabs from './SwipeTabs';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <SwipeTabs />
//     </NavigationContainer>
//   );
// };
