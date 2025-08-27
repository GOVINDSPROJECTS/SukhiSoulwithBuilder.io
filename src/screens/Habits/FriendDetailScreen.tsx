/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
// src/screens/FriendDetailScreen.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet,FlatList, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WeeklyTracker from './components/WeeklyTracker';
import BottomSheetModal from '../../components/BottomSheetModal';
import Feather from 'react-native-vector-icons/Feather';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import TogetherHabitsList from './components/TogetherHabitList';
import { Habit } from '@/types/habit';
import TogetherProgressInputModal from './components/TogetherProgressInputModal';


type HabitRoom = {
  room_id: number;
  room_name: string;
  create_user_id?: number;
};


type FriendDetailRouteProp = RouteProp<RootStackParamList, 'FriendDetail'>;

const FriendDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<FriendDetailRouteProp>();
  const { room_id } = route.params;
  const [showModal, setShowModal] = useState(false);
   const [showProgressModal, setShowProgressModal] = useState(false);
  const token = useAuthStore.getState().token;
  const [rooms, setRooms] = useState<HabitRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [habits, setHabits] = useState<Habit[]>([]);
  // const [habit_id, setHabitId] = useState<string>('');
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  
  const memberId = useAuthStore.getState().user?.id?.toString() || '';
    // const progressMapRef = useRef<Record<string, any>>({}); // 👈 Add this at the top (before useEffect)
  

////////////////////////////////////////////////////////////////////////
const fetchTogetherHabits = async (room_id: string) => {
  try {
    // Fetch all habits for this room
    const habitRes = await api.get(`/togetherhabits?room_id=${room_id}`);
    const rawHabits = habitRes?.data?.habitroommembers ?? [];

    // Fetch progress reports for each habit
    const reportRequests = rawHabits.map((habit: any) =>
      api.get(`/togetherhabitreports?together_habit_id=${habit.id}`)
    );
    const reportResponses = await Promise.all(reportRequests);

    // Flatten all reports
    const allReports = reportResponses.flatMap(
      (res) => res?.data?.togetherhabitreport ?? []
    );

    // Build map of latest progress by habit_id
    const latestProgressMap: Record<string, any> = {};
    allReports.forEach((report: any) => {
      const habitId = report.together_habit_id.toString();

      if (
        !latestProgressMap[habitId] ||
        new Date(report.updated_at) > new Date(latestProgressMap[habitId].updated_at)
      ) {
        latestProgressMap[habitId] = report;
      }
    });

    // Normalize today's date to same format as tracked_date (DD-MM-YYYY)
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); 
    // const todayFormatted = today.replace(/\//g, "-"); // convert to DD-MM-YYYY

    // Format habits
    const formattedHabits = rawHabits.map((habit: any) => {
      const habitId = habit.id.toString(); 
      // setHabitId(habitId); 
      const progress = latestProgressMap[habitId];
      const isToday = progress?.tracked_date === today;
      const completed = progress?.status?.toLowerCase() === "true" && isToday;

      return {
        id: habitId,
        title: habit.habit_name,
        description: habit.habit_description,
        completed,
        room_id: habit.room_id.toString(),
        member_id:habit.created_member_id,
        progress_status: habit.habit_progress_status?.toLowerCase() === "true",
      };
    });

    console.log("Together Habits:", formattedHabits);
    setHabits(formattedHabits);

  } catch (error: any) {
    console.error("Error fetching together habits:", error?.response?.data || error);
  }
};

 useEffect(() => {
    fetchTogetherHabits(room_id);
  }, []);
////////////////////////////////////////////////////////////////////////
// const checkAlreadySubmittedTogether = async (habitId: string) => {
//   try {
//     const token = useAuthStore.getState().token;
//     const response = await api.get(`/togetherhabitalreadysubmitted/${habitId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json',
//       },
//     });
//     const res =response.data.already_submitted;
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.error('Error checking submission:', error);
//     // return false; // fallback
//   }
// };
const checkAlreadySubmittedTogether = async (habitId: string) => {
  try {
    const token = useAuthStore.getState().token;
    const response = await api.get(`/togetherhabitalreadysubmitted/${habitId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // Let’s assume backend returns either `null` or an object
    return response.data.report || null;
  } catch (error) {
    console.error("Error checking submission:", error);
    return null; // fallback
  }
};

const togglingTogetherHabits = useRef<Set<string>>(new Set());

const toggleTogetherHabitCompletion = async (
  id: string,
  roomId: string,
) => {
  if (togglingTogetherHabits.current.has(id)) return;
  togglingTogetherHabits.current.add(id);

  const habit = habits.find(h => h.id === id);
  if (!habit) {
    togglingTogetherHabits.current.delete(id);
    return;
  }

  const fetchTogetherHabits = async () => {
    try {
      const [habitRes, progressRes] = await Promise.all([
        api.get(`/togetherhabits?room_id=${roomId}`),
        api.get(`/togetherhabitreports?together_habit_id=${id}`),
      ]);

      const rawHabits = habitRes.data.habitroommembers;
      const progressReports = progressRes.data.togetherhabitreport;

      if (!Array.isArray(progressReports)) {
        console.error("progressReports is not an array:", progressReports);
        return;
      }

      const latestProgressMap: Record<string, any> = {};
      progressReports.forEach((report: any) => {
        const habitId = report.together_habit_id.toString();

        if (
          !latestProgressMap[habitId] ||
          new Date(report.updated_at) > new Date(latestProgressMap[habitId].updated_at)
        ) {
          latestProgressMap[habitId] = report;
        }
      });


      const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

      const formattedHabits: Habit[] = rawHabits.map((habit: any) => {
        const habitId = habit.id.toString();
        const progress = latestProgressMap[habitId];

        const isToday = progress?.tracked_date === today;
        const completed = progress?.status.toLowerCase() === 'true' && isToday;

        return {
          id: habitId,
        title: habit.habit_name,
        description: habit.habit_description,
        completed,
        room_id: habit.room_id.toString(),
        member_id:habit.created_member_id,
        progress_status: habit.habit_progress_status?.toLowerCase() === "true",
        };
      });

      setHabits(formattedHabits);
    } catch (error) {
      console.error('Error fetching together habits or progress reports:', error);
    }
  };

  const token = useAuthStore.getState().token;
  const isCurrentlyCompleted = habit.completed;
  const newStatus = !isCurrentlyCompleted;
  const todayDate = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  console.log('todaydate' , todayDate)

  try {
    const alreadySubmitted = await checkAlreadySubmittedTogether(habit.id);
    console.log('is already submitted:', alreadySubmitted ,'iscurrently completed', isCurrentlyCompleted);

  
      const existingReport = await checkAlreadySubmittedTogether(habit.id);
      console.log(existingReport)

      
// ✅ If already submitted —> DELETE
if (existingReport && isCurrentlyCompleted) {
  await api.delete(`/togetherhabitreports/${existingReport.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const updated = habits.map(h =>
    h.id === id ? { ...h, completed: false } : h
  );
  setHabits(updated);
  await fetchTogetherHabits();
  togglingTogetherHabits.current.delete(id);
  return;
}
    // ✅ If modal required and not completed
    if (habit.progress_status && !isCurrentlyCompleted) {
      setSelectedHabit(habit);
      setShowProgressModal(true);
      togglingTogetherHabits.current.delete(id);
            console.log('modal shown .')

      return;
    }

    // ✅ Otherwise create report
    const formData = new FormData();
    formData.append('room_id', roomId);
    formData.append('together_habit_id', habit.id);
    formData.append('status', newStatus.toString());
    formData.append('tracked_date', todayDate);
    formData.append('member_id', memberId);
    formData.append('description', '.');

    await api.post('/togetherhabitreports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('report created .', formData);
    const updated = habits.map(h =>
      h.id === id ? { ...h, completed: newStatus } : h
    );
    setHabits(updated);
    fetchTogetherHabits();
  } catch (error) {
    console.error('Toggle Error:', error);
    Alert.alert('Error', 'Unable to update habit');
  } finally {
    togglingTogetherHabits.current.delete(id);
  }
};

/////////////////////////////////////////////////////////////////////////

  const handleAddHabit = () => {
    navigation.navigate('AddTogetherHabit', { room_id: room_id }); // 🔁 Navigates to AddHabitScreen
  };

  const activity = ["Running", "Beating Madhura", "Sketching", "Movie"];
  const schedule=["Daily", "Every Hour", "Weekly","Monthly"];
  const score=125;

  //For Existing Habits
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const toggleHabit = (habit: string) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits((prev) => prev.filter((h) => h !== habit));
    } else {
      setSelectedHabits((prev) => [...prev, habit]);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get('/habitrooms', {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`, 
        }
      });

      // ✅ Safe handling of message
      const message =
        res.data?.message?.toString?.() || 'No message from server';
      console.log("API Message:", message);

      // ✅ Extract all rooms
      const allRooms = Array.isArray(res.data?.habitrooms) ? res.data.habitrooms : [];

      // ✅ Find the specific room using your propRoomId
      const specificRoom = allRooms.find(
        (room: { room_id: string; }) => String(room.room_id) === String(room_id)
      );
      

      if (specificRoom) {
        setRooms([specificRoom]); // store only that one
        fetchTogetherHabits(room_id); // Fetch habits for the found room
      } else {
        setRooms([]); // if not found, empty
        console.log("Room not found for ID:", room_id);
      }

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
    fetchTogetherHabits(room_id);
  }, []);

 

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.container}>
          <Text style={styles.title}>{rooms[0]?.room_name}</Text>
          <Text style={[styles.subText,{marginTop: wp(3)}]}>Habit Partner since 5th July, 2025</Text>
          <Text style={styles.subText}>Habit Streak of 5 Days</Text>
          <Text style={styles.subheading}>Shared Habits</Text>

          {/* Here is a component for the habits */}
          <TogetherHabitsList
            title="Make your first move"
            habits={habits}
            onToggle={toggleTogetherHabitCompletion}
            showAddButton
            onAddHabitPress={handleAddHabit}
          />

          <Text style={styles.subheading}>Keep each other going</Text>
          <Text style={[styles.subText,{width:wp(40)}]}>A little motivation goes a long way</Text>

          <TouchableOpacity style={[styles.motivationCard, { flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }]} onPress={() => Alert.alert(memberId)}>
                <View >
                    <Text style={styles.text18}>Nudge to Remind</Text>
                    <Text style={styles.subText}>Remind Mugdha to track today</Text>
                </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Feather name="bell" color="#000" size={24} />
                  </View>
           </TouchableOpacity>
          <TouchableOpacity style={[styles.motivationCard, { flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }]}>
                <View>
                    <Text style={styles.text18}>Cheer your Friend</Text>
                    <Text style={styles.subText}>You’ve got this, let’s complete the challenge</Text>
                </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Feather name="star" color="#000" size={24} />
                  </View>
           </TouchableOpacity>


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
          <BottomSheetModal
            visible={showModal}
            onClose={() => setShowModal(false)}
          >
            <View
              style={{
                width: wp(13),
                height: 5,
                backgroundColor: '#000000',
                marginTop: 2,
                marginBottom: hp(10),
                borderRadius:12,
                alignSelf: 'center',
              }}
            />
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Existing Habits</Text>
              </View>

              <FlatList
                data={activity}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.habitRow}>
                    <Text style={styles.habitText}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => toggleHabit(item)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          selectedHabits.includes(item) && styles.checkedBox,
                        ]}
                      />
                    </TouchableOpacity>

                  </View>
                )}
              />

            </View>
              <TouchableOpacity onPress={() => navigation.navigate('AddHabitScreen' as any)} style={{ alignSelf: 'flex-end', marginRight: wp(4), marginTop: wp(2) }}>
                <Text style={styles.addNew}>+Add New Habit</Text>
              </TouchableOpacity>

        
            <PrimaryButton
                title="Done"
                onPress={() => console.log('Done')}
                style={{ width:wp(40),height:wp(11),alignSelf:"center",marginBottom: hp(5),marginTop:wp(8) }}
            />

          </BottomSheetModal>

           <TogetherProgressInputModal
          visible={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          habit={selectedHabit}
          onSubmitSuccess={() => {
            if (!selectedHabit) return;
            const updated = habits.map(h =>
              h.id === selectedHabit.id ? { ...h, completed: !h.completed } : h
            );
            setHabits(updated);
            setSelectedHabit(null);
            fetchTogetherHabits(room_id); // ✅ Re-fetch from API after progress submission
            // Refresh habits after submission
          }}
        />
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
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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


  // Existing Habits
  card: {
    width: wp(88),
    height: hp(50),
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: wp(9),
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: wp(2),
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  habitText: {
    fontSize: wp(6),
    color: '#2D2D2D',
    fontWeight: '400',
  },
  checkbox: {
    width: wp(7.5),
    height: wp(7.5),
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 2,
  },
  checkedBox: {
    backgroundColor: '#555',
  },
  addNew: {
    marginTop: wp(1),
    color: '#666666',
    fontWeight: '700',
    fontSize: wp(5),
    textAlign: 'right',
    marginBottom: wp(8),
    marginRight: wp(4),
  },
});




// src/screens/Habits/FriendDetailScreen.tsx

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList,
//   Alert,
// } from 'react-native';
// import api from 'api';
// import colors from '@/theme/colors';
// import api from '@/services/api';
// import { useAuthStore } from '@/store/authStore';

// type HabitRoom = {
//   room_id: number;
//   create_user_id: number;
//   room_name: string;
// };

// type FriendDetailScreenProps = {
//   route: {
//     params: {
//       room_id: number;
//     };
//   };
// };

// const FriendDetailScreen: React.FC<FriendDetailScreenProps> = ({ route }) => {
//   const { room_id } = route.params;
//   const [rooms, setRooms] = useState<HabitRoom[]>([]);
//   const [loading, setLoading] = useState(true);
//     const token = useAuthStore.getState().token;
  
//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       const response = await api.get('/habitrooms', {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token}`, // Use the token from the auth store", 
//         },
//       });

//       console.log('API Response:', response.data);

//       const allRooms: HabitRoom[] = response.data.habitrooms || [];
//       const specificRoom = allRooms.find(
//         (room: HabitRoom) => String(room.room_id) === String(room_id)
//       );
// if (specificRoom) {
//   Alert.alert("Found Room", JSON.stringify(specificRoom));
// } else {
//   Alert.alert("Not Found", `Room with id ${room_id} not found`);
// }

//       if (specificRoom) {
//         setRooms([specificRoom]);
//       } else {
//         setRooms([]);
//       }
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {rooms.length > 0 ? (
//         <>
//           <Text style={styles.title}>{rooms[0].room_name}</Text>
//           <FlatList
//             data={rooms}
//             keyExtractor={(item) => item.room_id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.roomItem}>
//                 <Text style={styles.roomName}>Room ID: {item.room_id}</Text>
//                 <Text>Created By: {item.create_user_id}</Text>
//               </View>
//             )}
//           />
//         </>
//       ) : (
//         <Text style={styles.errorText}>Room not found</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: colors.background,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700', // ✅ fixed fontWeight type
//     color: colors.primary,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   roomItem: {
//     padding: 16,
//     backgroundColor: colors.background,
//     borderRadius: 10,
//     marginBottom: 12,
//   },
//   roomName: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: colors.textPrimary,
//   },
//   errorText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default FriendDetailScreen;
