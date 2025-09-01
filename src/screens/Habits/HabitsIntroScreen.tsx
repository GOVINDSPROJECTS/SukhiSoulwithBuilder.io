import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import GradientWrapper from '../../components/GradientWrapper';
import PrimaryButton from '../../components/PrimaryButton';
import BottomSheetModal from '../../components/BottomSheetModal';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppTabsParamList } from '../../types/navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuthStore } from '@/store/authStore';

const uiIntro = StyleSheet.create({
  titleBox: { width: 270, height: 106, alignSelf: 'flex-start' },
  titleLarge: { fontSize: 48 },
  subtitleSmall: { fontSize: 16 },
  descriptionBox: { width: 274, height: 46, alignContent: 'center' },
  actionsBox: { width: 196, height: 72, alignItems: 'center' },
  modalHandleThin: {
    width: wp(13),
    height: 2,
    backgroundColor: '#000000',
    marginTop: 2,
    marginBottom: hp(2),
    borderRadius: 12,
    alignSelf: 'center',
  },
  closeIcon: { fontSize: wp(3.5) },
  separator: { width: wp(90), height: 1, backgroundColor: '#000000', marginTop: 2, marginBottom: 10, alignSelf: 'center' },
  tipItem: { marginBottom: hp(2.5), width: wp(75), height: hp(8), alignContent: 'center' },
  tipTextIndent: { marginLeft: wp(2) },
  getGoingBtn: { width: wp(45), height: wp(11), alignSelf: 'center', marginBottom: hp(10) },
});


const HabitsIntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppTabsParamList>>();
  const [showModal, setShowModal] = useState(false);

  const setIntroShown = useAuthStore((state) => state.setIntroShown);

  const handleGetGoing = async () => {
    setIntroShown(true);
     navigation.navigate('Habits');
  };




//  <Text style={[styles.heading, {fontSize: 36}]}>How are you{'\n'}feeling{'\n'}today?</Text>


// [styles.section, { width: 209, height: 140 }]

  return (
    <GradientWrapper>
      <View style={styles.container}>

        <View style={uiIntro.titleBox}>
          <Text style={[styles.title, uiIntro.titleLarge]}>Momentum</Text>
          <Text style={[styles.subtitle, uiIntro.subtitleSmall]}>A habit formation tool that keeps {'\n'}you going</Text>
        </View>







        <View style={styles.imageContainer}>
          {/* Replace with real image */}
          <View style={styles.imagePlaceholder} />
        </View>






        <Text style={[styles.description, uiIntro.descriptionBox]}>
          Repeat it daily — until it becomes as natural as brushing your teeth.
        </Text>





        <View style={uiIntro.actionsBox} >
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={styles.howLink}>How can I do that?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Let's get moving"
            onPress={() => setShowModal(true)}
            style={styles.button}
          />
        </View>
      </View>








      {/* BottomSheetModal */}
      <BottomSheetModal visible={showModal} onClose={() => setShowModal(false)}>
         <View style={uiIntro.modalHandleThin} />

        <TouchableOpacity style={styles.closeTips}  onPress={() => setShowModal(false)}>
            {/* <Icon name="x" size={16} color="#000000" /> */}
            <Text style={uiIntro.closeIcon}>✕</Text>
        </TouchableOpacity>




        <Text style={styles.modalTitle}>How can I do that?</Text>
        
        <View style={uiIntro.separator} />

        <View style={styles.tipGroup}>
          {[
            ['Start small and easy', 'Begin with a super easy version of the habit so it feels effortless to do every day.'],
            ['Attach it to something you already do', 'Link it to something you already do, like brushing your teeth or morning chai.'],
            ['Repeat it at the same time and place', 'Do it at a fixed time and place to make it feel automatic.'],
            ['Track your progress visually', 'Mark each day you do it. Seeing a streak builds motivation.'],
            ['Reward yourself right after', 'Celebrate right after—your brain remembers what feels good.'],
          ].map(([title, desc], i) => (
            <View key={i} style={uiIntro.tipItem}>
              <Text style={styles.tipTitle}>• {title}</Text>
              <Text style={[styles.tipText, uiIntro.tipTextIndent]}>{desc}</Text>
            </View>
          ))}
        </View>
  
        <PrimaryButton
          title="Let's get going"
          onPress={handleGetGoing}
          style={uiIntro.getGoingBtn}
        />
      </BottomSheetModal>
    </GradientWrapper>
  );
};

export default HabitsIntroScreen;

const styles = StyleSheet.create({
  container: {
    padding: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#003a52',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4),
    color: '#000000',
    textAlign: 'left',
    marginBottom: hp(5),
    fontWeight:'semibold'
  },
  imageContainer: {
    width: wp(70),
    height: wp(65),
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginBottom: hp(2),
    marginTop:hp(5)
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 16,
  },
  description: {
    fontSize: wp(4.5),
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: hp(8),
  },
  howLink: {
    fontSize: wp(3.2),
    color: '#2D2D2D',
    textDecorationLine: 'underline',
    marginBottom: hp(2),
  },
  button: {
    width: wp(52),
    height:hp(6),
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: wp(6),
    fontWeight: '600',
    marginBottom: hp(2),
    color: '#2D2D2D',
  },
  tipGroup: {
    paddingBottom: hp(3),
        paddingHorizontal:wp(2),

  },
  tipTitle: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp(0.5),
  },
  tipText: {
    fontSize: wp(3.6),
    color: '#2D2D2D',
  },
  closeTips:{
    width: wp(5),
    height:hp(5),
    alignSelf:"flex-end"
  },
    modalHandle: {
  width: wp('15%'),        // ~60px on most devices
  height: hp('0.6%'),      // ~5px
  borderRadius: wp('5%'),
  backgroundColor: '#666666',
  alignSelf: 'center',
  marginBottom: hp('2%'),
},
});


// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// const HabitsIntroScreen = ({ navigation }: any) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Habit Tracker</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate('HabitsHome')} />
//     </View>
//   );
// };

// export default HabitsIntroScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
// });
