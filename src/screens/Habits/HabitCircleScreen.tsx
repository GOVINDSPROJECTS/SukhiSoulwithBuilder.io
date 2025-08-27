/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-native/no-inline-styles */
// // src/screens/HabitCircleScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import AppText from '@/components/AppText';

// const friends = ['Dumb D. Madhura', 'Portega D. Piyush', 'Mugdha Mehindarkar'];
const habbitsNum = [1,0,3];


type HabitRoom = {
  room_id: number;
  room_name: string;
  create_user_id?: number;
  status?: string;
};
  

const HabitCircleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const token = useAuthStore.getState().token;
      const [rooms, setRooms] = useState<HabitRoom[]>([]);
        const [loading, setLoading] = useState<boolean>(true);

        
const fetchRooms = async () => {
    try {
      const res = await api.get('/habitrooms',
        {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Use the token from the auth store", 
        }
      }
      );

      // ✅ Safe handling of message
      const message =
        res.data?.message?.toString?.() || 'No message from server';
      console.log("API Message:", message);

      // ✅ Use habitrooms instead of habitroommembers
      setRooms(Array.isArray(res.data?.habitrooms) ? res.data.habitrooms : []);
    } catch (error: any) {
      console.error('Error fetching rooms:', error?.response?.data || error);
      const errMsg =
        error?.response?.data?.message?.toString?.() || 'Failed to fetch rooms.';
      Alert.alert('Error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);
  


  const handleOnPress = (item: { room_id: any; room_name?: string; create_user_id?: number | undefined; status?: string | undefined; }) => {
    if (item.status === 'pending') {
      Alert.alert('Info', 'Waiting for your Buddy to join the room.');
    }
      else{
        navigation.navigate('FriendDetail', { room_id: item.room_id.toString() })
      }
  }

  return (
    <ScrollView style={styles.container}>
        
        <AppText variant='h1'>Habit Circle</AppText>
        <Text style={[styles.subTitle,{width:wp(74)}]}>Check in, track habits together, and keep
            each other going</Text>
        
        {rooms.map((item , index ) => (
            <View key={item.room_id} style={styles.friendsCard}>
                <TouchableOpacity
                key={item.room_id}
                onPress={()=>handleOnPress(item)}
                >
                <Text style={styles.name}>{item.room_name}</Text>

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
  container: { padding: 20, backgroundColor: '#FFFFFF', paddingTop: hp(7), flex: 1 },

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

  // Indivisual friend card
  friendCard: {
    backgroundColor: '#2D2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    marginTop:wp(5),
   
  },

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

//  src/screens/HabitRoomsScreen.tsx

// import api from '@/services/api';
// import { useAuthStore } from '@/store/authStore';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../types/navigation';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// type HabitRoom = {
//   room_id: number;
//   room_name: string;
//   create_user_id?: number;
// };

// const HabitRoomsScreen = () => {
//   const [rooms, setRooms] = useState<HabitRoom[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const user = useAuthStore((state) => state.user);
//   const token = useAuthStore.getState().token;
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  
//   // ✅ Check user id
//   useEffect(() => {
//     if (user?.id) {
//       Alert.alert("User ID", user.id.toString());
//     } else {
//       Alert.alert("No User ID found");
//     }
//   }, [user]);

//   const fetchRooms = async () => {
//     try {
//       const res = await api.get('/habitrooms',
//         {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`, // Use the token from the auth store", 
//         }
//       }
//       );

//       // ✅ Safe handling of message
//       const message =
//         res.data?.message?.toString?.() || 'No message from server';
//       console.log("API Message:", message);

//       // ✅ Use habitrooms instead of habitroommembers
//       setRooms(Array.isArray(res.data?.habitrooms) ? res.data.habitrooms : []);
//     } catch (error: any) {
//       console.error('Error fetching rooms:', error?.response?.data || error);
//       const errMsg =
//         error?.response?.data?.message?.toString?.() || 'Failed to fetch rooms.';
//       Alert.alert('Error', errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);
  
 

//   const renderItem = ({ item }: { item: HabitRoom }) => (
//     <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('FriendDetail', { room_id: item.room_id.toString() })}>
//       <Text style={styles.roomText}>{item.room_name}</Text>
     
//       {/* If backend provides date, show it */}
//       {/* <Text style={styles.dateText}>Joined: {new Date(item.created_at).toDateString()}</Text> */}
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Habit Circle</Text>
//       <Text style={[styles.subTitle, { width: wp(74) }]}>
//         Check in, track habits together, and keep each other going
//       </Text>

//       {rooms.length > 0 ? (
//         <FlatList
//           data={rooms}
//           keyExtractor={(item) => item.room_id.toString()}
//           renderItem={renderItem}
//           contentContainerStyle={styles.list}
//         />
//       ) : (
//         <Text style={styles.noRooms}>You are not part of any rooms yet.</Text>
//       )}
//     </View>
//   );
// };

// export default HabitRoomsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: wp(12),
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginTop: wp(10),
//     color: '#245C73',
//   },
//   list: {
//     paddingBottom: hp('10%'),
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: wp('4%'),
//     marginBottom: hp('1.5%'),
//     borderRadius: wp('3%'),
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   roomText: {
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//     color: '#222',
//   },
//   dateText: {
//     fontSize: wp('3.5%'),
//     color: '#666',
//     marginTop: hp('0.5%'),
//   },
//   noRooms: {
//     fontSize: wp('4.5%'),
//     color: '#999',
//     textAlign: 'center',
//     marginTop: hp('10%'),
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   subTitle: {
//     fontSize: wp(4),
//     fontWeight: '400',
//     color: '#666666',
//     marginBottom: 10,
//   },
// });
