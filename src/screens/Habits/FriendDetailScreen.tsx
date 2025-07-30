// src/screens/FriendDetailScreen.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WeeklyTracker from './components/WeeklyTracker';





type FriendDetailRouteProp = RouteProp<RootStackParamList, 'FriendDetail'>;

const FriendDetailScreen = () => {
  const route = useRoute<FriendDetailRouteProp>();
  const { friendName } = route.params;

  const activity = ["Running", "Beating Madhura", "Sketching", "Movie"];
  const schedule=["Daily", "Every Hour", "Weekly","Monthly"];
  const score=125;

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.container}>
          <Text style={styles.title}>{friendName}</Text>
          <Text style={[styles.subText,{marginTop: wp(3)}]}>Habit Partner since 5th July, 2025</Text>
          <Text style={styles.subText}>Habit Streak of 5 Days</Text>
          <Text style={styles.subheading}>Shared Habits</Text>

          {/* Here is a component for the habits */}

          <Text style={styles.subheading}>Keep each other going</Text>
          <Text style={[styles.subText,{width:wp(40)}]}>A little motivation goes a long way</Text>

          <View style={[styles.motivationCard, { flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }]}>
                <View>
                    <Text style={styles.text18}>Nudge to Remind</Text>
                    <Text style={styles.subText}>Remind Mugdha to track today</Text>
                </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: wp(5), color: '#2D2D2D' }}>{'🔔'}</Text>
                  </View>
           </View>
          <View style={[styles.motivationCard, { flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }]}>
                <View>
                    <Text style={styles.text18}>Cheer your Friend</Text>
                    <Text style={styles.subText}>You’ve got this, let’s complete the challenge</Text>
                </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: wp(5), color: '#2D2D2D' }}>{'⭐'}</Text>
                  </View>
           </View>


          <Text style={[styles.subheading,{marginTop: wp(12)}]}>A week at a glance</Text>
          <WeeklyTracker
            title="Here's how far you've come >"
            habitCompletionMap={{
              '2025-07-09': { completed: 2, total: 10 },
              '2025-07-08': { completed: 10, total: 10 },
              '2025-07-07': { completed: 5, total: 10 },
            }}
          />

          <View style={{ marginTop: wp(0.1) }}>
            {activity.map((act, index) => (
              <View key={index} style={[styles.activiyWrapper,{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>

                <View>
                  <Text style={[styles.text18, { fontWeight: 'bold' }]}>{act}</Text>
                  <Text style={styles.subText}>{schedule[index]}</Text>
                </View>

                {/* <TouchableOpacity>
                  <Text style={{ fontSize: wp(3.5), color: '#666666', fontWeight: '500' }}>128{'🔥'}</Text>
                </TouchableOpacity> */}

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={[styles.subText,{marginTop: hp(2.6)}]}>{score}</Text>
                    <Image
                        source={require('../../assets/icons/streak.png')}
                        style={styles.streak}
                    />
                </View>

              </View>
            ))}
          </View>

        </View>
    </ScrollView>
  );
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  container: {
     padding: 25 
  },
  title: { 
    fontSize: wp(12), 
    marginTop: wp(5),
    fontWeight: 700, 
    color: '#2D2D2D'
  },
  subText: {
    fontSize: wp(3.5), 
    color: '#666666', 
    fontWeight: 500,
    marginTop: wp(0.5)
  },
  subheading: { 
    marginTop: wp(6),
    fontSize: wp(6), 
    fontWeight: 700 
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: wp(0.2),
    borderColor: '#2D2D2D',
    marginTop: wp(5),
    shadowColor: '#00000040', // Transparent black
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 1, 
    shadowRadius: 6,

    // Android-specific elevation (optional for consistent cross-platform shadow)
    elevation: 4,
  },
  text18:{
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#2D2D2D',
  },
  activiyWrapper:{
    marginVertical: hp('0.5'),
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    width: wp('90%'),
    height:wp(18),
  },

  streak: {
    width:wp(4),
    height: hp(4),
    marginTop: hp(3),
    marginLeft: wp(2),
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
});
