
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabsParamList } from '../types/navigation';
import HomeScreen from '../screens/Auth/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HabitsStack from './HabitsStack';
import InSyncIntroScreen from '../screens/InSync/InSyncIntroScreen';
import InSyncStack from './InSyncStack';


const Tab = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Habits" component={HabitsStack}/>
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="InSync" component={InSyncStack} />
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
