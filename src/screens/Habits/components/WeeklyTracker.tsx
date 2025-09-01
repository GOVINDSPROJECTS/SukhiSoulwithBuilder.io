// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import dayjs from 'dayjs';
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// import isToday from 'dayjs/plugin/isToday';
// import isoWeek from 'dayjs/plugin/isoWeek';
// import AppText from '@/components/AppText';

// dayjs.extend(isSameOrAfter);
// dayjs.extend(isToday);
// dayjs.extend(isoWeek);

// type Props = {
//   title?: string;
//   highlightedDates?: string[];
//   onDayPress?: (date: string) => void;
//   habitCompletionMap?: {
//     [date: string]: {
//       completed: number;
//       total: number;
//     };
//   };
// };



// const WeeklyTracker = ({ title, highlightedDates = [], onDayPress , habitCompletionMap,}: Props) => {
//   const weekStart = dayjs().startOf('week'); // Sunday as start (use isoWeek for Monday)
//   const weekDays = Array.from({ length: 7 }).map((_, i) =>
//     weekStart.add(i + 1, 'day')
//   );



//   return (
//     <View style={styles.wrapper}>
//       {title && <AppText variant="caption" style={styles.title}>{title}</AppText>}

//       {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
//         {weekDays.map((day, index) => {
//           const dateStr = day.format('YYYY-MM-DD');
//           const isToday = dayjs().isSame(day, 'day');
//           const isHighlighted = highlightedDates.includes(dateStr);
//           const completion = habitCompletionMap?.[dateStr];
// const hasHabits = completion && completion.total > 0;
// const allCompleted = hasHabits && completion.completed === completion.total;
// const partiallyCompleted = hasHabits && completion.completed > 0 && !allCompleted;


//           return (
//             <TouchableOpacity
//               key={index}
//               style={[
//   styles.dateCircle,
//   allCompleted && styles.fullComplete,
//   partiallyCompleted && styles.partialComplete,
//   isToday && styles.today,
// ]}
//               onPress={() => onDayPress?.(dateStr)}
//             >
//               <Text style={styles.dayText}>{day.format('dd')[0]}</Text>
//               <Text style={styles.dateText}>{day.date()}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView> */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
//     {weekDays.map((day, index) => {
//       const dateStr = day.format('YYYY-MM-DD');
//       const isToday = dayjs().isSame(day, 'day');

//       const completion = habitCompletionMap?.[dateStr];
//       const percentDone = completion ? completion.completed / completion.total : 0;

//       return (
//         <TouchableOpacity key={index} onPress={() => onDayPress?.(dateStr)}>
//           <View style={[styles.dateCircle, isToday && styles.today]}>
//             {/* Progress Fill Layer */}
//             <View style={[styles.fillOverlay, { height: `${percentDone * 100}%` }]} />

//             <Text style={styles.dayText}>{day.format('dd')[0]}</Text>
//             <Text style={styles.dateText}>{day.date()}</Text>
//           </View>
//         </TouchableOpacity>
//       );
//     })}
//   </ScrollView>
//     </View>
//   );
// };

// export default WeeklyTracker;

// const styles = StyleSheet.create({
//   wrapper: {
//   marginVertical: hp('2%'),
//   padding: wp('4%'),
//   backgroundColor: '#fff',
//   borderRadius: wp('3%'),
//   elevation: 4, // Android shadow
//   shadowColor: '#000', // iOS shadow
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.1,
//   shadowRadius: 4,
//   borderWidth: 1,
//   borderColor: '#eee',
//   marginHorizontal: wp('5%'), // add horizontal margin for spacing
// },

//   title: {
//     // fontSize: wp('4.5%'),
//     fontWeight: '600',
//     marginBottom: hp('1.5%'),
//     // color: '#104256',
//   },
//   container: {
//     flexDirection: 'row',
//     gap: wp('3%'),
//   },
//  dateCircle: {
//   width: wp('12%'),
//   height: wp('12%'),
//   borderRadius: wp('6%'),
//   backgroundColor: '#eee',
//   justifyContent: 'center',
//   alignItems: 'center',
//   overflow: 'hidden', // needed for clipping the fill
//   position: 'relative',
// },

// fillOverlay: {
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   width: '100%',
//   backgroundColor: '#4694c1',
//   zIndex: 0,
// },

//   highlighted: {
//     backgroundColor: '#4694c1',
//   },
//   today: {
//     borderWidth: 2,
//     borderColor: '#104256',
//   },
// dayText: {
//   fontSize: wp('3%'),
//   color: '#333',
//   zIndex: 1,
// },
// dateText: {
//   fontSize: wp('4%'),
//   fontWeight: 'bold',
//   color: '#333',
//   zIndex: 1,
// },
// // today: {
// //   borderWidth: 2,
// //   borderColor: '#104256',
// // },
//   partialComplete: {
//   backgroundColor: '#b3d8ec', // Light blue (for partial)
// },
// fullComplete: {
//   backgroundColor: '#2196F3', // Darker blue (for full)
// },

// });

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import dayjs from 'dayjs';

type Props = {
  title?: string;
  highlightedDates?: string[];
  onDayPress?: (date: string) => void;
  habitCompletionMap?: {
    [date: string]: {
      completed: number;
      total: number;
    };
  };
};

const WeeklyTracker = ({
  title,
  _highlightedDates = [],
  onDayPress,
  habitCompletionMap = {},
}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); // 👈 Track selected date

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    dayjs().startOf('week').add(i + 1, 'day')
  );

  const todayIndex = weekDays.findIndex((d) => dayjs().isSame(d, 'day'));

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current && todayIndex >= 0) {
        scrollRef.current.scrollTo({ x: todayIndex * (wp('12%') + wp('3%')), animated: true });
      }
    }, 300);
  }, [todayIndex]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * (wp('12%') + wp('3%')),
        animated: true,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {weekDays.map((day, index) => {
          const dateStr = day.format('YYYY-MM-DD');
          const isToday = dayjs().isSame(day, 'day');
          const isSelected = selectedDate === dateStr; // 👈 check if selected
          const progress = habitCompletionMap?.[dateStr];
          const percentDone = progress && progress.total > 0 ? progress.completed / progress.total : 0;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedDate(dateStr); // 👈 set selected
                onDayPress?.(dateStr);   // 👈 notify parent
                scrollToIndex(index);
              }}
            >
              <View
                style={[
                  styles.dateCircle,
                  isToday && styles.today,
                  isSelected && styles.selected, // 👈 apply selected style
                ]}
              >
                <View style={[styles.fillOverlay, { height: `${percentDone * 100}%` }]} />
                <Text style={styles.dateText}>{day.date()}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WeeklyTracker;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: hp('3%'),
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    width: wp('90%'),
    height: wp(33),
  },
  title: {
     width: wp('100%'),
    fontSize: wp(4.2),
    fontWeight: '500',
    marginBottom: hp('2%'),
    marginHorizontal: wp('2%'),
    marginRight: wp(30),
    color: '#2D2D2D',
  },
  container: {
    flexDirection: 'row',
    marginLeft: wp(1),
    gap: wp('2.6%'),
    alignSelf: 'center',
  },
  dateCircle: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('6%'),
    backgroundColor: '#8BCAD9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  fillOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#4694c1',
    zIndex: 0,
  },
  today: {
    borderWidth: 2,
    borderColor: '#104256',
  },
  selected: {
    backgroundColor: '#245C73', // 👈 Dark highlight for selected
  },
  dateText: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#fff', // 👈 white text when selected
    zIndex: 1,
  },
});
