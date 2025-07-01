// // src/navigation/RootNavigator.tsx

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';
// export type RootStackParamList = {
//   Login: undefined;
//   Signup: undefined;
//   Home: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const RootNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import { useAuthStore } from '../store/authStore';

const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
