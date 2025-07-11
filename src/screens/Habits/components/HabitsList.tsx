import AppText from '@/components/AppText';
import colors from '@/theme/colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Habit = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  habits: Habit[];
  title?: string;
  onToggle?: (id: string) => void;
  showAddButton?: boolean;
  onAddHabitPress?: () => void;
  maxItemsToShow?: number;
};

const HabitsList = ({
  habits,
  title,
  onToggle,
  showAddButton = false,
  onAddHabitPress,
  maxItemsToShow,
}: Props) => {
  const displayedHabits = maxItemsToShow ? habits.slice(0, maxItemsToShow) : habits;

    // function onAddHabit(event: GestureResponderEvent): void {
      
    //   onAddHabitPress
    //     // throw new Error('Function not implemented.');
    // }
  return (
    <View style={styles.wrapper}>
      {title && <AppText variant= "h2" style={{color: colors.primary, marginBottom: hp('3%'),}} >{title}</AppText>}

      <FlatList
          scrollEnabled={false} // ✅ disables internal scroll
        data={displayedHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.habitRow}
            onPress={() => onToggle?.(item.id)}
          >
            <Text style={styles.habitText}>{item.title}</Text>
            <Ionicons
              name={item.completed ? 'radio-button-on' : 'radio-button-off'}
              size={22}
              color={item.completed ? '#2196F3' : '#ccc'}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* {showAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={onAddHabitPress}>
          <Ionicons name="add" size={18} color="#104256" />
        </TouchableOpacity>
      )} */}
      {showAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={onAddHabitPress}>
          {/* <Image source={require('../../../assets/icons/plus.png')} style={styles.plusIcon} /> */}
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      )}
      
    </View>
  );
};

export default HabitsList;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: hp('2%'),
    marginHorizontal: wp('5%'),
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#104256',
    marginBottom: hp('1.5%'),
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  habitText: {
    fontSize: wp('4%'),
    color: '#333',
  },
  separator: {
    height: 0,
  },
 addButton: {
  alignSelf: 'flex-end',
  marginTop: hp('1.5%'),
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
  paddingHorizontal:wp('1%'),
},

});


// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// type Habit = {
//   id: string;
//   title: string;
//   isCompleted: boolean;
// };

// type Props = {
//   habits: Habit[];
//   title?: string;
//   showAddButton?: boolean;
//   maxVisible?: number;
//   onToggleComplete?: (id: string) => void;
//   onAddHabit?: () => void;
// };

// const HabitsList = ({
//   habits,
//   title,
//   showAddButton = false,
//   maxVisible = habits.length,
//   onToggleComplete,
//   onAddHabit,
// }: Props) => {
//   const visibleHabits = habits.slice(0, maxVisible);

//   return (
//     <View style={styles.wrapper}>
//       {title && <Text style={styles.title}>{title}</Text>}

//       <FlatList
//         data={visibleHabits}
//         keyExtractor={(item) => item.id}
//         scrollEnabled={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.habitItem, item.isCompleted && styles.completed]}
//             onPress={() => onToggleComplete?.(item.id)}
//           >
//             <Text style={styles.habitText}>{item.title}</Text>
//             <View style={[styles.radio, item.isCompleted && styles.radioFilled]} />
//           </TouchableOpacity>
//         )}
//       />

//       {showAddButton && (
//         <TouchableOpacity style={styles.addButton} onPress={onAddHabit}>
//           <Image source={require('../assets/icons/plus.png')} style={styles.plusIcon} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default HabitsList;

// const styles = StyleSheet.create({
//   wrapper: {
//     marginVertical: hp('2%'),
//     padding: wp('4%'),
//     backgroundColor: '#fff',
//     borderRadius: wp('3%'),
//     elevation: 4, // Android shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     borderWidth: 1,
//     borderColor: '#eee',
//     marginHorizontal: wp('5%'),
//   },
//   title: {
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//     marginBottom: hp('1.5%'),
//     color: '#104256',
//   },
//   habitItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: hp('1.5%'),
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   habitText: {
//     fontSize: wp('4%'),
//     color: '#333',
//   },
//   completed: {
//     opacity: 0.5,
//   },
//   radio: {
//     width: wp('4%'),
//     height: wp('4%'),
//     borderRadius: wp('2%'),
//     borderWidth: 2,
//     borderColor: '#104256',
//   },
//   radioFilled: {
//     backgroundColor: '#104256',
//   },
//   addButton: {
//     alignSelf: 'flex-end',
//     marginTop: hp('2%'),
//   },
//   plusIcon: {
//     width: wp('6%'),
//     height: wp('6%'),
//     tintColor: '#104256',
//   },
// });
