import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
};

const CoachCard = ({ title, subtitle, buttonText, onPress }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.ctaRow}>
          <Text style={styles.buttonText}>{buttonText}</Text>
          <Text style={styles.arrow}>{' >'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CoachCard;

const styles = StyleSheet.create({
  card: {
    padding: wp('4%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('3%'),

    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: wp('2%'), // add horizontal margin for spacing
  },
  title: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('1.5%'),
  },
  button: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#2D2D2D',
    fontSize: wp('5'),
    fontWeight: '700',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    color: '#2D2D2D',
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  arrow: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
});
