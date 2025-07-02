import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isLoggedIn = false; // later check from auth store

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      ) : (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './AuthStack';
// import AppTabs from './AppTabs';
// import { useAuthStore } from '../store/authStore';


// const RootNavigator = () => {
//   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <AppTabs /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;
