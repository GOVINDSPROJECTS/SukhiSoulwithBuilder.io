import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../components/AppText';
import PrimaryButton from '../components/PrimaryButton';
import GradientWrapper from '../components/GradientWrapper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import colors from '../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WelcomeScreenGradientWrapper from '../components/WelcomrScreenGradientWrapper';

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <WelcomeScreenGradientWrapper>
      <AppText variant="caption" style={styles.caption}>Welcome to,</AppText>
      <AppText variant="h1" style={styles.brand}>Sukhi Soul</AppText>
      <AppText variant = "caption" style={styles.description}>
        Let’s build balance with mindful habits, deeper bonds, and daily wellbeing
      </AppText>

      <View style={styles.card}>
        <Image
          source={require('../assets/images/explorer.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <PrimaryButton
        title="Sign Up"
        onPress={() => navigation.navigate('AuthStack', { screen: 'Signup' })}
        style={{ width: wp('30%'), alignSelf: 'center' , marginTop: wp('5%'),}}
      />

      <AppText variant="caption" style={styles.footer}>
        Already have an account?{' '}
        <AppText style={styles.link} onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
          Log in
        </AppText>
      </AppText>
    </WelcomeScreenGradientWrapper>
  );
};

const styles = StyleSheet.create({
  caption: {
    // fontSize: wp('4%'),
    color:"#2D2D2D",
    fontWeight:'400'
  },
  brand: {
    // marginTop: hp('1%'),
    fontSize: wp(12),
    color:colors.primary,
    fontWeight:700,
  },
  description: {
    marginTop: hp('3%'),
    // marginBottom: hp('2%'),
    marginVertical:hp('2%'),
    maxWidth: wp(64),
    fontSize: wp('4.2%'),
    color:"#2D2D2D",
    fontWeight:'400'
    // textAlign: 'center',
    // alignSelf: 'center',
    
  },
  footer: {
    textAlign: 'center',
    marginTop: hp('2%'),
    fontSize: wp('3.2%'),
  },
  card: {
    width: wp('70%'),
    height: hp('40%'),
    backgroundColor: '#ccc',
    borderRadius: 16,
    alignSelf: 'center',
    overflow: 'hidden',
    marginVertical: hp('4.5%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  link: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: wp('4%'),
  },
});

export default WelcomeScreen;
