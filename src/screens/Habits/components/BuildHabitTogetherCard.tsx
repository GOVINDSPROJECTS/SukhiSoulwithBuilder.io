import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  onPress?: () => void;
};

const BuildHabitTogetherCard: React.FC<Props> = ({ onPress }) => (
    <View style={styles.card}>
            <Text style={styles.desc}>
            Team up for better habits. Consistency loves company.
            </Text>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.ctaRow}>
                <Text style={styles.cta}>Build a Habit Together</Text>
                <Text style={styles.arrow}>{' >'}</Text>
            </View>
        </TouchableOpacity>

    </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp('3%'),
    padding: wp('5%'),
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: wp('2%'), // add horizontal margin for spacing
  },
  desc: {
    fontSize: wp('3.5%'),
    color: '#2D2D2D',
    marginRight:wp(2),
    marginBottom: hp('1%'),
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft:wp(18),
    marginTop: hp('2%'),
  },
  cta: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#222',
  },
  arrow: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
});

export default BuildHabitTogetherCard;