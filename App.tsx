// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import RootNavigator from './src/navigation/RootNavigator';
// import { useAuthStore } from './src/store/authStore';
// import Toast from 'react-native-toast-message';

// const App = () => {
//   const restoreSession = useAuthStore((state) => state.restoreSession);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = async () => {
//       await restoreSession();
//       setLoading(false);
//     };
//     checkSession();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <>
//       <RootNavigator />
//       <Toast />
//     </>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import Toast from 'react-native-toast-message';

const App = () => {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      await restoreSession();
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
      <Toast />
    </NavigationContainer>
  );
};

export default App;

