import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import GradientWrapper from '../../components/GradientWrapper';
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HabitsStackParamList } from '../../types/navigation';



const InSyncHomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<HabitsStackParamList>>();

  return (
    <GradientWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <AppText variant="h2" style={styles.header}>
          InSyncHome
        </AppText>
      </ScrollView>
    </GradientWrapper>
  );
};

export default InSyncHomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('5%'),
    paddingTop: hp('10%'),
  },
  header: {
    marginLeft: wp('5%'),
    color: '#104256',
  },
});
