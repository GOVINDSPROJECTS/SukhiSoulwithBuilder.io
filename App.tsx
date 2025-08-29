import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { loadUserPrefs } from './src/store/userPrefsStore';
import SwipeTabs from '@/navigation/SwipeTabs';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  GoogleSignin.configure({
    webClientId: '618676745098-tupjtgn3d7lg07t1flkfnd9fpoh176lp.apps.googleusercontent.com',
    offlineAccess: true,
    scopes: ['openid', 'email', 'profile'],
  });
}, []);

  useEffect(() => {
      loadUserPrefs(); // 👈 load flag on app start

    const init = async () => {
      await restoreSession();
      setLoading(false);
    };
    init();
  }, [restoreSession]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  return (
    <>
    <NavigationContainer>
      {/* <SwipeTabs/> */}
      <RootNavigator />
      <Toast />
      </NavigationContainer>
    </>
  );
};

export default App;
