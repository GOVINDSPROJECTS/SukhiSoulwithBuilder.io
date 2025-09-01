// src/navigation/SwipeTabs.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import HabitsStack from './HabitsStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStack from '../screens/ProfileScreen';

const SwipeTabs = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'habits', title: 'Habits', icon: 'checkmark-done' },
    { key: 'profile', title: 'Profile', icon: 'person' },
  ];

  const renderScene = SceneMap({
    habits: HabitsStack,
    profile: ProfileStack,
  });

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {routes.map((route, i) => {
        const isFocused = i === index;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
          >
            <Ionicons
              name={route.icon as any}
              size={22}
              color={isFocused ? '#104256' : '#aaa'}
            />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
              {route.title}
            </Text>
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
        swipeEnabled={true}
        renderTabBar={() => null} // hide default bar
      />
      {renderTabBar()}
    </>
  );
};

export default SwipeTabs;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
    paddingTop: 6,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  labelFocused: {
    color: '#104256',
    fontWeight: 'bold',
  },
});
