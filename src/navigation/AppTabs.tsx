import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/Auth/HomeScreen';
import HabitsStack from './HabitsStack';
import InSyncStack from './InSyncStack';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors: _descriptors, navigation }) {
  return (
    <View style={styles.tabBarWrapper}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        let icon;
        switch (route.name) {
          case 'Home':
            icon = (
              <Ionicons
                name="home-outline"
                size={30}
                color={isFocused ? '#1e1e1e' : 'rgba(255,255,255,0.6)'}
              />
            );
            break;
          case 'Habits':
            icon = (
              <Ionicons
                name="bicycle-outline"
                size={30}
                color={isFocused ? '#1e1e1e' : 'rgba(255,255,255,0.6)'}
              />
            );
            break;
          case 'InSync':
            icon = (
              <Entypo
                name="link"
                size={30}
                color={isFocused ? '#1e1e1e' : 'rgba(255,255,255,0.6)'}
              />
            );
            break;
          case 'Profile':
            icon = (
              <Ionicons
                name="person-outline"
                size={30}
                color={isFocused ? '#1e1e1e' : 'rgba(255,255,255,0.6)'}
              />
            );
            break;
          default:
            icon = null;
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      swipeEnabled={true}
      tabBarPosition="bottom"
      tabBar={CustomTabBar}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Habits" component={HabitsStack} />
      <Tab.Screen name="InSync" component={InSyncStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

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

// import React, { useState } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   useWindowDimensions,
//   StyleSheet,
//   Platform,
//   Image,
// } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import { BlurView } from '@react-native-community/blur';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';

// import HomeScreen from '../screens/Auth/HomeScreen';
// import HabitsStack from './HabitsStack';
// import ProfileScreen from '../screens/ProfileScreen';
// // import SettingsScreen from '../screens/SettingsScreen';
// import InSyncIntroScreen from '@/screens/InSync/InSyncIntroScreen';
// import InSyncStack from './InSyncStack';

// const AppTabs = () => {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);

//   const [routes, setRoutes] = useState([
//     { key: 'home-0', routeKey: 'home', iconType: 'image', icon: require('../assets/icons/group.png'), refreshKey: 0 },
//     { key: 'habits-0', routeKey: 'habits', iconType: 'ionicon', icon: 'bicycle-outline', refreshKey: 0 },
//     { key: 'insync-0', routeKey: 'insync', iconType: 'entypo', icon: 'link', refreshKey: 0 },
//     { key: 'profile-0', routeKey: 'profile', iconType: 'image', icon: require('../assets/icons/profile.png'), refreshKey: 0 },
//   ]);

//   const renderScene = ({ route }: any) => {
//     const { routeKey, refreshKey } = route;

//     switch (routeKey) {
//       case 'home':
//         return <HomeScreen refreshKey={refreshKey} goToHabits={() => setIndex(1)} goToInsync={() => setIndex(2)} />;
//       case 'habits':
//         return <HabitsStack refreshKey={refreshKey} />;
//       case 'insync':
//         return <InSyncStack refreshKey={refreshKey} />;
//       case 'profile':
//         return <ProfileScreen refreshKey={refreshKey} />;
//       default:
//         return null;
//     }
//   };

//   const renderTabBar = () => (
//     <View style={styles.tabBarWrapper}>
//       {/* <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="light"
//         blurAmount={5}
//         reducedTransparencyFallbackColor="rgba(255,255,255,0.8)"
//       /> */}
//       {routes.map((route, i) => {
//         const isFocused = i === index;

//         return (
//           <TouchableOpacity
//             key={route.key}
//             style={styles.tabItem}
//             onPress={() => {
//               if (i === index) {
//                 const newRoutes = [...routes];
//                 newRoutes[i].refreshKey += 1;
//                 newRoutes[i].key = `${newRoutes[i].routeKey}-${newRoutes[i].refreshKey}`;
//                 setRoutes(newRoutes);
//               } else {
//                 setIndex(i);
//               }
//             }}

//           >
//             {route.iconType === 'image' && (
//               <Image
//                 source={route.icon}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   tintColor: isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 10)', // FIXED
//                 }}
//                 resizeMode="contain"
//               />
//             )}

//             {route.iconType === 'ionicon' && (
//               <Ionicons
//                 name={route.icon}
//                 size={30}
//                 color={isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 10)'} // FIXED
//               />
//             )}

//             {route.iconType === 'entypo' && (
//               <Entypo
//                 name={route.icon}
//                 size={30}
//                 color={isFocused ? '#1e1e1e' : 'rgba(255, 255, 255, 10)'} // FIXED
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
//         onIndexChange={setIndex}
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
