import AppText from '@/components/AppText';
import colors from '@/theme/colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

      <FlatList
        scrollEnabled={false}
        data={displayedHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitRow}>

            {/* ✅ Habit Title */}
            <Text style={styles.habitText}>{item.title}</Text>

            
            {/* ✅ Custom Circle Checkbox */}
            <TouchableOpacity
              onPress={() => onToggle?.(item.id)}
              style={styles.habitCircle}
              activeOpacity={0.7}
            >
              {item.completed && <View style={styles.habitCircleDot} />}
            </TouchableOpacity>

         
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {showAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={onAddHabitPress}>
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
    width: wp('90%'),
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
});
