import React, { useState } from 'react';
import { Text, View, Button,Image, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native';
import BottomSheetModal from '../../components/BottomSheetModal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';





const TeamUpFlowScreen = () => {
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<'teamup' | 'circle' | 'created' | 'invite'>('teamup');

  const handleNext = () => {
    if (step === 'teamup') setStep('circle');
    else if (step === 'circle') setStep('created');
    else if (step === 'created') setStep('invite');
    else setVisible(false); // Done
  };
  

  const renderStepContent = () => {
    switch (step) {
      case 'teamup':
        return (
          <View>
            <View style={{width: wp(73),height:hp(25)}}>
              <Text style={styles.heading}>Team Up to Stay On Track</Text>
              <Text style={styles.subHeading}>Create your Habit Circle, a group to start your habit journey. Track progress together, send nudges, and celebrate wins!</Text>
            </View>
            <View style={styles.grayBox} />
            <Text style={[styles.desc,{marginVertical:wp(10)}]}>Stick to habits 95% better—together</Text>
          
            <PrimaryButton
                title="Create Habit Circle"
                onPress={handleNext}
                style={{ width:wp(50),height:wp(11),alignSelf:"center",marginBottom: hp(5) }}
            />

          </View>
        );
      case 'circle':
        return (
          <View>
            <Text style={styles.heading}>Your Habit Circle</Text>
            <TextInput style={styles.input} placeholder='Habit Circle ID' editable={true} />
            <View style={styles.grayBox} />
            <Text style={[styles.desc,{marginVertical:wp(15)}]}>Stick to habits 95% better—together</Text>
  
            <PrimaryButton
                title="Share this ID"
                onPress={handleNext}
                style={{ width:wp(40),height:wp(11),alignSelf:"center",marginBottom: hp(6) }}
            />
          </View>
        );
      case 'created':
        return (
          <View>
            <Image
              source={require('../../assets/icons/correct.png')}
              style={styles.image}
            />
            <View style={{width:wp(55),alignSelf:'center',marginBottom:hp(35)}}>
                <Text style={[styles.heading,{alignSelf: 'center',textAlign:'center'}]}>Circle Created</Text>
                <Text style={[styles.desc,{alignSelf: 'center'}]}>We'll notify you when they join</Text>
            </View>
           
            <PrimaryButton
                title="Proceed"
                onPress={handleNext}
                style={{ width:wp(36),height:wp(11),alignSelf:"center",marginBottom: hp(1) }}
            />
            <Text style={[styles.desc,{alignSelf: 'center',marginBottom: hp(5)}]}>You can see your Habit Circle on Momentum</Text>
          </View>
        );
      case 'invite':
        return (
          <View>
             <Image
              source={require('../../assets/icons/correct.png')}
              style={styles.image}
            />

            <View style={{width:wp(55),alignSelf:'center',marginBottom:hp(40)}}>
              <Text style={[styles.heading,{alignSelf: 'center',textAlign:'center'}]}>Invite Sent</Text>
              <Text style={[{alignSelf: 'center',}]}>We’ll notify you when they join</Text>
            </View>

            <PrimaryButton
                title="Done"
                  onPress={() => {
                    setVisible(false);
                    navigation.replace('HabitCircle');
                  }}
                style={{ width:wp(26),height:wp(11),alignSelf:"center",marginBottom: hp(1) }}
            />

            <TouchableOpacity>
                <Text style={[styles.desc,{alignSelf: 'center',marginBottom: hp(45)}]}>Cancel Invite</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <BottomSheetModal visible={visible} onClose={() => setVisible(false)}>
        <View
                style={{
                  width: wp(13),
                  height: 5,
                  backgroundColor: '#171717',
                  marginTop: 2,
                  marginBottom: hp(2),
                  borderRadius:12,
                  alignSelf: 'center',
                }}
        />
      {renderStepContent()}
    </BottomSheetModal>
  );
};

export default TeamUpFlowScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: wp(9),
    fontWeight: 700,
    marginBottom: 10,
    color: '#171717',
    marginTop: 20,

  },
  subHeading: {
    fontSize: wp(3.5),
    fontWeight: 500,
    color: 'rgba(23, 23, 23, 0.54)',
    marginBottom: 16,
  },
  desc: {
    // marginVertical: wp(10),
    textAlign: 'center',
    fontSize: wp(3.5),
    color: '#171717',
    fontWeight: '400',
    marginBottom: wp(1),
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: wp(0.1),
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: wp(12),
    padding: 10,
    borderRadius: 10,
    marginBottom: wp(12),
  },
  grayBox: {
    marginLeft:wp(6),
    marginRight:wp(6),
    width: wp(88),
    height: wp(62),
    backgroundColor: '#686868',
    marginBottom: wp(5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: wp(2.5),
    marginVertical: 16,
  },

  //Correct.png Icon 
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: wp(13),
    height: wp(13),
    marginTop: hp(5),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
