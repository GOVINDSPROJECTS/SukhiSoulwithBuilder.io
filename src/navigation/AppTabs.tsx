
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   useWindowDimensions,
//   StyleSheet,
//   Platform,
//   Image,
//   BackHandler,
//   ToastAndroid,
// } from 'react-native';
// import { TabView } from 'react-native-tab-view';
// import { BlurView } from '@react-native-community/blur';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { useNavigation } from '@react-navigation/native';

// import HomeScreen from '../screens/Auth/HomeScreen';
// import HabitsStack from './HabitsStack';
// import ProfileScreen from '../screens/ProfileScreen';
// import SettingsScreen from '../screens/SettingsScreen';

// const AppTabs = () => {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const navigation = useNavigation();

//   const routes = [
//     { key: 'home', iconType: 'image', icon: require('../assets/icons/group.png') },
//     { key: 'habits', iconType: 'ionicon', icon: 'bicycle-outline' },
//     { key: 'settings', iconType: 'entypo', icon: 'link' },
//     { key: 'profile', iconType: 'image', icon: require('../assets/icons/profile.png') },
//   ];

//   const renderScene = ({ route }: any) => {
//     switch (route.key) {
//       case 'home':
//         return <HomeScreen />;
//       case 'habits':
//         return <HabitsStack />;
//       case 'settings':
//         return <SettingsScreen />;
//       case 'profile':
//         return <ProfileScreen />;
//       default:
//         return null;
//     }
//   };

//   const handleTabChange = (newIndex: number) => {
//     setIndex(newIndex); // 🧠 Just set new tab index, no stack push
//   };

//   const backPressCountRef = useRef(0);

// useEffect(() => {
//   const onBackPress = () => {
//     const state = navigation.getState();
//     const currentTab = state?.routes?.[index];
//     const nestedState = currentTab?.state;

//     // ✅ If the current tab's stack can go back, do it
//     if ((nestedState?.index ?? 0) > 0) {
//       navigation.goBack();
//       return true;
//     }

//     // ⬅️ Otherwise, switch to Home tab
//     if (index !== 0) {
//       setIndex(0);
//       return true;
//     }

//     // ⬅️ Double tap to exit logic
//     if (backPressCountRef.current === 0) {
//       backPressCountRef.current += 1;
//       ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
//       setTimeout(() => {
//         backPressCountRef.current = 0;
//       }, 2000);
//       return true;
//     }

//     BackHandler.exitApp();
//     return true;
//   };

//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     onBackPress
//   );

//   return () => backHandler.remove();
// }, [index, navigation]);

//   const renderTabBar = () => (
//     <View style={styles.tabBarWrapper}>
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="light"
//         blurAmount={5}
//         reducedTransparencyFallbackColor="rgba(255,255,255,0.8)"
//       />
//       {routes.map((route, i) => {
//         const isFocused = i === index;

//         return (
//           <TouchableOpacity
//             key={route.key}
//             style={styles.tabItem}
//             onPress={() => handleTabChange(i)}
//           >
//             {route.iconType === 'image' && (
//               <Image
//                 source={route.icon}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   tintColor: isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 0.4)',
//                 }}
//                 resizeMode="contain"
//               />
//             )}

//             {route.iconType === 'ionicon' && (
//               <Ionicons
//                 name={route.icon}
//                 size={30}
//                 color={isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 0.4)'}
//               />
//             )}

//             {route.iconType === 'entypo' && (
//               <Entypo
//                 name={route.icon}
//                 size={30}
//                 color={isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 0.4)'}
//               />
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );

//   return (
//     <>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={handleTabChange}
//         initialLayout={{ width: layout.width }}
//         swipeEnabled
//         renderTabBar={() => null}
//         lazy
//         renderLazyPlaceholder={() => null}
//         removeClippedSubviews={false}
//       />
//       {renderTabBar()}
//     </>
//   );
// };

// export default AppTabs;

// const styles = StyleSheet.create({
//   tabBarWrapper: {
//     position: 'absolute',
//     bottom: 24,
//     left: '50%',
//     transform: [{ translateX: -152.5 }],
//     width: 305,
//     height: 70,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderRadius: 100,
//     overflow: 'hidden',
//     backgroundColor:
//       Platform.OS === 'android' ? 'rgba(52, 133, 167, 0.4)' : 'transparent',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   tabItem: {
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
// });






import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { BlurView } from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/Auth/HomeScreen';
import HabitsStack from './HabitsStack';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AppTabs = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'home', iconType: 'image', icon: require('../assets/icons/group.png') },
    { key: 'habits', iconType: 'ionicon', icon: 'bicycle-outline' },
    { key: 'settings', iconType: 'entypo', icon: 'link' },
    { key: 'profile', iconType: 'image', icon: require('../assets/icons/profile.png') },
  ];

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'home':
        return <HomeScreen goToHabits={() => setIndex(1)} goToInsync={() => setIndex(2)}/>;
      case 'habits':
        return <HabitsStack />;
      case 'settings':
        return <SettingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  const renderTabBar = () => (
    <View style={styles.tabBarWrapper}>
      {/* <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="rgba(255,255,255,0.8)"
      /> */}
      {routes.map((route, i) => {
        const isFocused = i === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
          >
{route.iconType === 'image' && (
  <Image
    source={route.icon}
    style={{
      width: 30,
      height: 30,
      tintColor: isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 10)', // FIXED
    }}
    resizeMode="contain"
  />
)}

{route.iconType === 'ionicon' && (
  <Ionicons
    name={route.icon}
    size={30}
    color={isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 10)'} // FIXED
  />
)}

{route.iconType === 'entypo' && (
  <Entypo
    name={route.icon}
    size={30}
    color={isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 10)'} // FIXED
  />
)}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled
        renderTabBar={() => null}

        lazy
        renderLazyPlaceholder={() => null}
        removeClippedSubviews={false}
      />
      {renderTabBar()}
    </>
  );
};

export default AppTabs;

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: [{ translateX: -152.5 }],
    width: 305,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor:
      Platform.OS === 'android' ? 'rgba(52, 133, 167, 0.4)' : 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
});
