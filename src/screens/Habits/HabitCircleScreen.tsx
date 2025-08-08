// src/screens/HabitCircleScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const friends = ['Dumb D. Madhura', 'Portega D. Piyush', 'Mugdha Mehindarkar'];
const habbitsNum = [1,0,3];

const HabitCircleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
        
        <Text style={styles.title}>Habit Circle</Text>
        <Text style={[styles.subTitle,{width:wp(74)}]}>Check in, track habits together, and keep
            each other going</Text>
        
        {friends.map((name, index) => (
            <View key={index} style={styles.friendsCard}>
                <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('FriendDetail', { friendName: name })}
                >
                <Text style={styles.name}>{name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={styles.status}>{habbitsNum[index]} habits tracked</Text>
                  <View style={{ width: wp(15) }} />
                      <Text style={styles.status}>Streak: {index * 50} Days</Text>

                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: wp(5), color: '#2D2D2D' }}>{'>'}</Text>
                  </View>
                </View>
                </TouchableOpacity>
            </View>
        ))}
        <PrimaryButton
                title="Invite a Friend"
                onPress={() => navigation.navigate('TeamUpFlow')}
                style={{ width:wp(40),height:wp(11),alignSelf:"flex-end",marginBottom: hp(1),marginTop:wp(8) }}
            />
    </ScrollView>
  );
};

export default HabitCircleScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF'},

  title: { 
    fontSize:wp(12), 
    fontWeight: 'bold', 
    marginBottom: 10, 
    marginTop: wp(10),
    color:'#245C73',
  },
  subTitle: {
    fontSize: wp(4),
    fontWeight: '400',
    color:'#666666',
    marginBottom: 10,
  },

  //Indivisual friend card
  // friendCard: {
  //   backgroundColor: '#2D2',
  //   padding: 16,
  //   marginBottom: 12,
  //   borderRadius: 10,
  //   marginTop:wp(5),
   
  // },

  //Outer Friend Card,Containing friends list
  friendsCard: {
    backgroundColor: '#FFFFFF',
    width: wp(88),
    height: wp(30),
    alignSelf: 'center',
    marginBottom: 12,
    marginTop:wp(6),
    borderRadius: 10,
    borderColor:'#2D2D2D',
    borderWidth:wp(0.1),
    padding: 16,
      // Subtle Drop Shadow
      shadowColor: '#00000040', // Transparent black
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1, // since color already has alpha
      shadowRadius: 6,

      // Android-specific elevation (optional for consistent cross-platform shadow)
      elevation: 4,
  },
  name: { 
    fontSize: wp(6), 
    width: wp(30),
    fontWeight: '700',
    color: '#2D2D2D',
  },
  status: { 
    fontSize: wp(3.2), 
    fontWeight: '500',
    color: '#666666'
  },
});
