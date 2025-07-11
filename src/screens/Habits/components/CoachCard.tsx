import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CoachCard;

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
      marginHorizontal: wp('5%'), // add horizontal margin for spacing

  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#104256',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('1.5%'),
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#104256',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
});
