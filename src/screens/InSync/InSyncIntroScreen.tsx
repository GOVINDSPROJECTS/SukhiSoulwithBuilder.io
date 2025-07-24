import React, { useEffect, useState } from 'react';
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
import { InSyncStackParamList } from '../../types/navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppText from '@/components/AppText';
import colors from '@/theme/colors';

const InSyncIntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<InSyncStackParamList>>();
  const [showModal, setShowModal] = useState(false);

  const handleGetGoing = async () => {
    await AsyncStorage.setItem('@insync_intro_seen', 'true');
    setShowModal(false);
    navigation.replace('InSyncHome');
    
  };

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <AppText variant = 'h1' style={styles.brand} >InSync</AppText>
        <AppText variant='h2' style={styles.subtitle}>A tool to connect, understand and grow together</AppText>

        <View style={styles.imageContainer}>
          {/* Replace with real image */}
          <View style={styles.imagePlaceholder} />
        </View>

        <Text style={styles.description}>
          Build together a life you{'\n'}always wanted
        </Text>

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.howLink}>How can I do that?</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Let's Connect"
          onPress={() => setShowModal(true)}
          style={styles.button}
        />
      </View>

      
        {/* 🧠 BottomSheetModal with tips */}
      <BottomSheetModal visible={showModal} onClose={() => setShowModal(false)}>
 
 <View style={styles.modalHandle} />
        <Text style={styles.modalTitle}>How can I do that?</Text>
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical:wp(5)
  }}
/>
        <View style={styles.tipGroup}>
          {[
            ['Create tasks together', 'Plan small, meaningful actions as a team which will build trust, routine, and shared joy.'],
            ['Take understanding tests', 'Discover how each of you thinks, feels, and reacts. Its the first step toward deeper empathy.'],
            ['Ask what they truly need', 'Check in regularly—sometimes clarity starts with simply asking, "What would help you feel more understood today?"'],
            ['Journal your thoughts daily', 'Writing helps you reflect, cool off, and see things from a calmer, clearer perspective.'],
            ['Get support when needed', 'Therapy is not weakness—its teamwork. If something feels too heavy, reaching out can lighten the load for both of you.'],
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

export default InSyncIntroScreen;

const styles = StyleSheet.create({
  container: {
    padding: wp(6),
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop:wp(30),
  },
    brand: {
    marginTop: hp(3),
    // fontSize: wp('10%'),
    color:colors.primary,
  },
  subtitle: {
    fontSize: wp(4),
    color: '#444',
    // textAlign: 'center',
    marginBottom: hp(8),
  },
  imageContainer: {
    width: wp(70),
    height: wp(60),
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginBottom: hp(2),
    marginHorizontal:"auto"
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 16,
  },
  description: {
    fontSize: wp(4),
    color: '#333',
    textAlign: 'center',
    marginBottom: hp(10),
    textAlignVertical:'center'
  },
  howLink: {
    fontSize: wp(3.5),
    color: '#333',
    textDecorationLine: 'underline',
    marginBottom: hp(3),
    marginHorizontal:'auto'
  },
  button: {
    width: wp(60),
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: wp(6),
    fontWeight: '600',
    color: '#003a52',  
  },
  tipGroup: {
    paddingBottom: hp(3),
    paddingHorizontal:wp(2),
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
  modalHandle: {
  width: wp('15%'),        // ~60px on most devices
  height: hp('0.6%'),      // ~5px
  borderRadius: wp('5%'),
  backgroundColor: '#666666',
  alignSelf: 'center',
  marginBottom: hp('2%'),
},
});
