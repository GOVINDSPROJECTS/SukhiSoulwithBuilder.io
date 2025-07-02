// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';
// import OtpVerificationScreen from '../screens/OtpVerificationScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';




// export type RootStackParamList = {
//   Login: undefined;
//   Signup: undefined;
//   Home: undefined;
//   OtpVerification:undefined;
//   Welcome:undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Welcome" component={WelcomeScreen} />
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="Signup" component={SignupScreen} />
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />

//   </Stack.Navigator>
// );

// export default AuthStack;


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
  </Stack.Navigator>
);

export default AuthStack;
