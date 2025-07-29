// src/screens/HabitCircleScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const friends = ['Dumb D. Madhura', 'Portega D. Piyush', 'Mugdha Mehindarkar'];

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
                style={styles.friendCard}
                onPress={() => navigation.navigate('FriendDetail', { friendName: name })}
                >
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.status}>Streak: {index * 50} Days</Text>
                </TouchableOpacity>
            </View>
        ))}
        <PrimaryButton
                title="Invite a Friend"
                onPress={() => navigation.navigate('TeamUpFlow')}
                style={{ width:wp(36),height:wp(11),alignSelf:"center",marginBottom: hp(1) }}
            />
    </ScrollView>
  );
};

export default HabitCircleScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },

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
  friendCard: {
    backgroundColor: '#2D2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    marginTop:wp(5),
   
  },

  //Outer Friend Card,Containing friends list
  friendsCard: {
    backgroundColor: '#c25656ff',
    marginBottom: 12,
    marginTop:wp(6),
    borderRadius: 10,
    borderColor:'#2D2D2D',
    borderWidth:2,
  },
  name: { fontSize: 16, fontWeight: '600' },
  status: { fontSize: 12, color: 'gray' },
});
