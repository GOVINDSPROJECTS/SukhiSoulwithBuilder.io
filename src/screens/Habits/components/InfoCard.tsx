import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: ViewStyle; // 👈 Add this
};

const InfoCard = ({ title, subtitle, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('3%'),
    width: wp(86),
    alignSelf: 'center',
    padding: wp('4%'),
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: wp('5%'), // add horizontal margin for spacing
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: '700',
    color: '#2D2D2D',
    marginRight: wp(15),
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
});
