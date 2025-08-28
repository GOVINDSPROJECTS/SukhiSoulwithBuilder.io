// import AppText from '@/components/AppText';
// import colors from '@/theme/colors';
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import ConfettiCannon from 'react-native-confetti-cannon';
// import { useState, useRef } from 'react';


// type Habit = {
//     id: string;
//   title: string;
//   completed: boolean;
//   habit_progress_status: string; // add this
// };

// type Props = {
//   habits: Habit[];
//   title?: string;
//   onToggle?: (id: string) => void;
//   toEditOrDelete?:(id: string)=> void;
//   showAddButton?: boolean;
//   onAddHabitPress?: () => void;
//   onAllHabitPress?: () => void;
//   maxItemsToShow?: number;
//   isCompleted ?:boolean;
// };

// const HabitsList = ({
//   habits,
//   title,
//   onToggle,
//   showAddButton = false,
//   onAddHabitPress,
//   onAllHabitPress,
//   toEditOrDelete,
//   maxItemsToShow,
//   isCompleted,
// }: Props) => {
//   const displayedHabits = maxItemsToShow ? habits.slice(0, maxItemsToShow) : habits;

// const [showConfetti, setShowConfetti] = useState(false);
// const confettiRef = useRef<any>(null);

// const handleToggleHabit = (id: string) => {
//   onToggle?.(id);
//   setShowConfetti(true);
// };

//   return (
//     <View style={styles.wrapper}>
//   {title && (
//     <AppText
//       variant="h1"
//       style={{ color: colors.primary, marginBottom: hp('2.5%') }}
//     >
//       {title}
//     </AppText>
//   )}

//   {displayedHabits.length === 0 ? (
//     <View style={styles.emptyStateContainer}>
//       <Text style={styles.emptyStateText}>Build your first habit</Text>
//     </View>
//   ) : (
//     <FlatList
//       scrollEnabled={false}
//       data={displayedHabits}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View style={styles.habitRow}>

//           <TouchableOpacity
//             onPress={()=> toEditOrDelete?.(item.id)} 
//             style={styles.habitText}><Text>{item.title}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={ () => handleToggleHabit(item.id)}
//             style={styles.habitCircle}
//             activeOpacity={0.7}
//           >
//             {item.completed && <View style={styles.habitCircleDot} />}
//           </TouchableOpacity>
//         </View>
//       )}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//     />
//   )}

//   {showAddButton ? (
//     <TouchableOpacity style={styles.addButton} onPress={onAddHabitPress}>
//       <Text style={styles.plusIcon}>{'+'}</Text>
//     </TouchableOpacity>
//   ):
//   <TouchableOpacity>
//     <View style={[styles.emptyStateText,{flexDirection:"row",alignSelf:"flex-end"}]}>
//         <Text style={[styles.allHabitsText,{color:"#666666",fontSize:wp(4)}]} onPress={onAllHabitPress}>All habits</Text>
//         <AntDesign name="right" color="#2D2D2D" size={14} style={{marginTop:hp(0.4)}}/>
//     </View>

//   </TouchableOpacity>
//   }

//   {showConfetti && (
//   <ConfettiCannon
//     count={50}
//     origin={{ x: wp(45), y: hp(0) }}
//     explosionSpeed={300}
//     fallSpeed={3000}
//     fadeOut
//     autoStart
//     onAnimationEnd={() => setShowConfetti(false)}
//   />
// )}
// </View>

//   );
// };

// export default HabitsList;
// const styles = StyleSheet.create({
//   wrapper: {
//     marginVertical: hp('2%'),
//     width: wp(90),
//     padding: wp('4%'),
//     backgroundColor: '#fff',
//     borderRadius: wp('3%'),
//     borderWidth: 1,
//     borderColor: '#eee',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     alignSelf:"center",

//   },
//   habitRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between', // add this
//     paddingVertical: hp('1%'),
//     paddingHorizontal: wp('2%'),
//   },
//   habitCircle: {
//     width: wp('5.5%'),
//     height: wp('5.5%'),
//     borderRadius: wp('2.75%'),
//     backgroundColor:'#DCEEF2',
//     justifyContent: 'center',
//     alignItems: 'center', // change to center
//     // marginRight: wp('4%'), // remove this line
//   },
//   habitCircleDot: {
//     width: wp('3.5%'),
//     height: wp('3.5%'),
//     borderRadius: wp('2.25%'),
//     backgroundColor: '#3D88A7',
//     alignItems: 'flex-end',
//   },
//   habitText: {
//     fontSize: wp('5%'),
//     fontWeight:700,
//     color: '#2D2D2D',
//     flex: 1, // add this
//   },
//   separator: {
//     height: 1,
//     marginVertical: hp('0.3%'),
//     marginLeft: wp('11%'), // align with text
//   },
//   addButton: {
//     alignSelf: 'flex-end',
//     marginTop: hp('3%'),
//     backgroundColor: '#e0f0f6',
//     padding: wp('2.5%'),
//     borderRadius: wp('50%'),
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.15,
//     shadowRadius: 2,
//   },
//   plusIcon: {
//     fontSize: wp('5.5%'),
//     color: '#104256',
//     textAlign: 'center',
//     lineHeight: wp('6.5%'),
//     fontWeight: 'bold',
//     paddingHorizontal: wp('1%'),
//   },
//   emptyStateContainer: {
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: hp('1'),
// },

// emptyStateText: {
//   fontSize: wp(3.6),
//   color: '#888',
//   fontStyle: 'italic',
//   textAlign: 'right',
//   marginTop: hp('2%'),
// },
// allHabitsText: {
//     color: '#666666',
//     fontWeight: '500',
//     fontSize: wp(4),
//     marginRight: 2,
//     marginTop: 2,
// },

// });


import AppText from '@/components/AppText';
import colors from '@/theme/colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator ,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useState, useRef } from 'react';


type Habit = {
    id: string;
  title: string;
  completed: boolean;
  habit_progress_status: string; // add this
};

type Props = {
  habits: Habit[];
  title?: string;
  onToggle?: (id: string) => void;
  toEditOrDelete?:(id: string)=> void;
  showAddButton?: boolean;
  onAddHabitPress?: () => void;
  onAllHabitPress?: () => void;
  maxItemsToShow?: number;
  isCompleted ?:boolean;
  loading?: boolean;      // Add this prop

};

const HabitsList = ({
  habits,
  title,
  onToggle,
  showAddButton = false,
  onAddHabitPress,
  onAllHabitPress,
  toEditOrDelete,
  maxItemsToShow,
  loading = false,

  isCompleted,
}: Props) => {
  const displayedHabits = maxItemsToShow ? habits.slice(0, maxItemsToShow) : habits;

const [showConfetti, setShowConfetti] = useState(false);
const confettiRef = useRef<any>(null);

const handleToggleHabit = (id: string) => {
  onToggle?.(id);
  setShowConfetti(true);
};

if (loading) {
  return (
    <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center', height: hp('20%') }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
  return (
    <View style={styles.wrapper}>
  {title && (
    <AppText
      variant="h1"
      style={{ color: colors.primary, marginBottom: hp('2.5%') }}
    >
      {title}
    </AppText>
  )}

  {displayedHabits.length === 0 ? (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>Build your first habit</Text>
    </View>
  ) : (
    <FlatList
      scrollEnabled={false}
      data={displayedHabits}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.habitRow}>

          <TouchableOpacity
            onPress={()=> toEditOrDelete?.(item.id)} 
            style={styles.habitText}><Text>{item.title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => handleToggleHabit(item.id)}
            style={styles.habitCircle}
            activeOpacity={0.7}
          >
            {item.completed && <View style={styles.habitCircleDot} />}
          </TouchableOpacity>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )}

  {showAddButton ? (
    <TouchableOpacity style={styles.addButton} onPress={onAddHabitPress}>
      <Text style={styles.plusIcon}>{'+'}</Text>
    </TouchableOpacity>
  ):
  <TouchableOpacity>
    <View style={[styles.emptyStateText,{flexDirection:"row",alignSelf:"flex-end"}]}>
        <Text style={[styles.allHabitsText,{color:"#666666",fontSize:wp(4)}]} onPress={onAllHabitPress}>All habits</Text>
        <AntDesign name="right" color="#2D2D2D" size={14} style={{marginTop:hp(0.4)}}/>
    </View>

  </TouchableOpacity>
  }

  {showConfetti && (
  <ConfettiCannon
    count={50}
    origin={{ x: wp(45), y: hp(0) }}
    explosionSpeed={300}
    fallSpeed={3000}
    fadeOut
    autoStart
    onAnimationEnd={() => setShowConfetti(false)}
  />
)}
</View>

  );
};

export default HabitsList;
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: hp('2%'),
    width: wp(90),
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf:"center",

  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // add this
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  habitCircle: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    borderRadius: wp('2.75%'),
    backgroundColor:'#DCEEF2',
    justifyContent: 'center',
    alignItems: 'center', // change to center
    // marginRight: wp('4%'), // remove this line
  },
  habitCircleDot: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    borderRadius: wp('2.25%'),
    backgroundColor: '#3D88A7',
    alignItems: 'flex-end',
  },
  habitText: {
    fontSize: wp('5%'),
    fontWeight:700,
    color: '#2D2D2D',
    flex: 1, // add this
  },
  separator: {
    height: 1,
    marginVertical: hp('0.3%'),
    marginLeft: wp('11%'), // align with text
  },
  addButton: {
    alignSelf: 'flex-end',
    marginTop: hp('3%'),
    backgroundColor: '#e0f0f6',
    padding: wp('2.5%'),
    borderRadius: wp('50%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  plusIcon: {
    fontSize: wp('5.5%'),
    color: '#104256',
    textAlign: 'center',
    lineHeight: wp('6.5%'),
    fontWeight: 'bold',
    paddingHorizontal: wp('1%'),
  },
  emptyStateContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: hp('1'),
},

emptyStateText: {
  fontSize: wp(3.6),
  color: '#888',
  fontStyle: 'italic',
  textAlign: 'right',
  marginTop: hp('2%'),
},
allHabitsText: {
    color: '#666666',
    fontWeight: '500',
    fontSize: wp(4),
    marginRight: 2,
    marginTop: 2,
},

});
