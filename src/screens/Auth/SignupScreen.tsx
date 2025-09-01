import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import DividerWithText from '../../components/DividerWithText';
import { AuthStackParamList, RootStackParamList } from 'src/types/navigation';
import SocialLoginButton from '../../components/SocialLoginButton';
import GradientWrapper from '../../components/GradientWrapper';
import AppText from '../../components/AppText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getOtp } from '../../auth/otpAuth';
import GenderSelector from '../../components/GenderSelector';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../theme/colors';


type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
const SignupScreen = () => {

  const otpnavigation = useNavigation<AuthNavigationProp>();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSignupOtp = () => {
    console.log({ name, email, age, sex });

    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter valid email';
    if (!age || isNaN(Number(age))) newErrors.age = 'Enter valid age';
    if (!sex) newErrors.sex = 'Please select gender';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('Validation errors:', newErrors);

      return;
    }
    // ✅ All fields valid
    getOtp(email, name, age, sex, otpnavigation);
  };


  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '618676745098-tupjtgn3d7lg07t1flkfnd9fpoh176lp.apps.googleusercontent.com',
  //     offlineAccess: true,
  //     scopes: ['openid', 'email', 'profile',],
  //   });
  // }, []);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <GradientWrapper>
        <ScrollView contentContainerStyle={styles.container} 
         showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
          <AppText variant='h1' style={styles.brand}>Sukhi{'\n'}Soul</AppText>
          {/* <AppText variant='h1'>Soul</AppText> */}

          <AppText
            variant='h2'
            style={{ marginTop: hp('5%'), marginBottom: hp('2%'),color:"#2D2D2D" }}
          >Create your account</AppText>

          {/* <CustomTextInput placeholder="Name" value={name} onChangeText={setName} type="text" />
        <CustomTextInput placeholder="Age" value={age} onChangeText={setAge} type="age"/> */}
          {/* <CustomTextInput placeholder="Sex" value={sex} onChangeText={setSex} type="sex"/> */}
          {/* <GenderSelector value={sex} onSelect={setSex} />
        <CustomTextInput placeholder="Mail" value={email} onChangeText={setEmail} type="email"/> */}

          <CustomTextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            type="text"
            error={errors.name}
          />

          <CustomTextInput
            placeholder="Age"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
            }}
            type="age"
            error={errors.age}
          />

          <GenderSelector value={sex} onSelect={setSex} error={errors.sex} />


          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            type="email"
            error={errors.email}
          />


          <PrimaryButton
            title="Get OTP"
            onPress={handleSignupOtp}
            // onPress={()=> navigation.navigate('AuthStack', { screen: 'OtpVerification' })}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: wp('30%'), alignSelf: 'center', marginVertical: hp('2%'), marginBottom: hp('3%') }}
          />

          <DividerWithText />

          <View style={styles.socialContainer}>
            <SocialLoginButton
              icon={require('../../assets/icons/google.png')}
              onPress={() => handleGoogleSignin(navigation)}
            />
            {/* <SocialLoginButton
            icon={require('../assets/icons/apple.png')}
            onPress={() => {}}
          /> */}
          </View>

          <Text style={styles.termsText}>
            By signing up you agree to our <Text style={styles.link}>Terms</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </GradientWrapper>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: hp('6%'),
  },
  container: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('6%'),
  },
  subHeading: {
    fontSize: wp('5%'),
    color: '#333',
    marginBottom: hp('1%'),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  termsText: {
    fontSize: wp('3.2%'),
    textAlign: 'center',
    color: '#666',
    marginTop: hp('1%'),
  },
  link: {
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.2%'),
    marginTop: hp('0.5%'),
    marginBottom: hp('1.5%'),
  },
    brand: {
    // marginTop: hp('1%'),
    fontSize: wp('10%'),
    color:colors.primary,
  },
});
