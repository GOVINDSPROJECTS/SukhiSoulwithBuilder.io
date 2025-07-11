import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native';
import IconButton from '../../components/IconButton';
import { handleGoogleSignin } from '../../auth/googleAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../types/navigation';
import { BlurView } from '@react-native-community/blur';
import { getLoginOtp } from '../../auth/otpAuth';
import PrimaryButton from '../../components/PrimaryButton';
import GradientWrapper from '../../components/GradientWrapper';
import AppText from '../../components/AppText';
import CustomTextInput from '../../components/CustomTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const LoginScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const otpnavigation = useNavigation<AuthNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0]; // Starts below screen
  const [email, setEmail] = useState('');


  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };
  // const handleAppleLogin = () => {
  //   console.log('Apple login triggered');
  // };

  return (
    // <View style={styles.container}>
    <GradientWrapper >
      <View style={styles.card}>
        <AppText variant='h1'>Sukhi</AppText>
        <AppText variant='h1'>Soul</AppText>
        <View style={styles.buttonview}>
          <IconButton style={styles.iconButton}
            icon={require('../../assets/icons/mail.png')}
            label="Get Email OTP"
            onPress={openModal}
          />
          <IconButton style={styles.iconButton}
            icon={require('../../assets/icons/google.png')}
            label="Continue with Google"
            onPress={() => handleGoogleSignin(navigation)}
          />
          {/* <IconButton
          icon={require('../assets/icons/apple.png')}
          label="Continue with Apple"
          onPress={handleAppleLogin}
        /> */}
        </View>
      </View>
      <Modal transparent visible={modalVisible} animationType="none">

        <View style={styles.modalWrapper}>
          {/* Blur background */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={4}
            reducedTransparencyFallbackColor="black"
          />

          {/* Modal content with pressable close */}
          <Pressable style={styles.backdrop} onPress={closeModal} />

          {/* Slide-up modal card */}
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.modalTitle}>Enter Your Mail</Text>
            <CustomTextInput
              placeholder="Mail"
              // placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              style={{borderWidth:2 , borderColor:'#808080', margin:'4%'}}
              type="email"
            />
            <PrimaryButton
              title="Get OTP"
              onPress={() => {
                closeModal(); // close modal first
                setTimeout(() => {
                  getLoginOtp(email, otpnavigation); // THEN call OTP logic
                }); // delay ensures modal is closed before navigating
              }}
              style={{ width: '30%', alignSelf: 'center' }}
            >
            </PrimaryButton>

          </Animated.View>
        </View>
      </Modal>

    </GradientWrapper>
    // </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp('5%'),
    width: '90%',
    elevation: 6,
  },
  buttonview: {
    marginTop: hp('6%'),
    marginBottom: hp('3%'),
  },
  heading: {
    fontSize: wp('12%'),
    fontWeight: 'bold',
    lineHeight: wp('10%'),
    color: '#fff',
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
  },
  heading1: {
    fontSize: wp('12%'),
    fontWeight: 'bold',
    lineHeight: wp('10%'),
    color: '#fff',
    marginBottom: hp('6%'),
  },
  iconButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    paddingBottom: hp('30%'),
    paddingTop: hp('5%'),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    marginHorizontal: wp('2%'),
  },
  modalTitle: {
    fontSize: wp('6%'),
    color: '#000',
    marginBottom: hp('2%'),
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  button: {
    backgroundColor: '#fff',
    padding: wp('3%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
