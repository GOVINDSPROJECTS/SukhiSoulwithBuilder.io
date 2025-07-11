import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import GradientWrapper from '../../components/GradientWrapper';
import PrimaryButton from '../../components/PrimaryButton';
import BottomSheetModal from '../../components/BottomSheetModal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HabitsStackParamList } from '../../types/navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HabitsIntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HabitsStackParamList>>();
  const [showModal, setShowModal] = useState(false);

  const handleGetGoing = async () => {
    await AsyncStorage.setItem('@habit_intro_seen', 'true');
    setShowModal(false);
    navigation.replace('HabitsHome');
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Momentum</Text>
        <Text style={styles.subtitle}>A habit formation tool that keeps you going</Text>

        <View style={styles.imageContainer}>
          {/* Replace with real image */}
          <View style={styles.imagePlaceholder} />
        </View>

        <Text style={styles.description}>
          Repeat it daily — until it becomes as natural as brushing your teeth.
        </Text>

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.howLink}>How can I do that?</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Let's get moving"
          onPress={() => setShowModal(true)}
          style={styles.button}
        />
      </View>

      {/* 🧠 BottomSheetModal with tips */}
      <BottomSheetModal visible={showModal} onClose={() => setShowModal(false)}>
        <Text style={styles.modalTitle}>How can I do that?</Text>

        <View style={styles.tipGroup}>
          {[
            ['Start small and easy', 'Begin with a super easy version of the habit so it feels effortless to do every day.'],
            ['Attach it to something you already do', 'Link it to something you already do, like brushing your teeth or morning chai.'],
            ['Repeat it at the same time and place', 'Do it at a fixed time and place to make it feel automatic.'],
            ['Track your progress visually', 'Mark each day you do it. Seeing a streak builds motivation.'],
            ['Reward yourself right after', 'Celebrate right after—your brain remembers what feels good.'],
          ].map(([title, desc], i) => (
            <View key={i} style={{ marginBottom: hp(2.5) }}>
              <Text style={styles.tipTitle}>• {title}</Text>
              <Text style={styles.tipText}>{desc}</Text>
            </View>
          ))}
        </View>

        <PrimaryButton
          title="Let's get going"
          onPress={handleGetGoing}
          style={{ marginTop: hp(2) }}
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
    fontSize: wp(8),
    fontWeight: 'bold',
    color: '#003a52',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4),
    color: '#444',
    textAlign: 'center',
    marginBottom: hp(5),
  },
  imageContainer: {
    width: wp(60),
    height: wp(60),
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginBottom: hp(5),
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 16,
  },
  description: {
    fontSize: wp(4),
    color: '#333',
    textAlign: 'center',
    marginBottom: hp(5),
  },
  howLink: {
    fontSize: wp(3.5),
    color: '#333',
    textDecorationLine: 'underline',
    marginBottom: hp(3),
  },
  button: {
    width: wp(60),
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: wp(6),
    fontWeight: '600',
    marginBottom: hp(2),
    color: '#003a52',
  },
  tipGroup: {
    paddingBottom: hp(3),
  },
  tipTitle: {
    fontSize: wp(4.2),
    fontWeight: '500',
    color: '#111',
    marginBottom: hp(0.5),
  },
  tipText: {
    fontSize: wp(3.6),
    color: '#444',
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
