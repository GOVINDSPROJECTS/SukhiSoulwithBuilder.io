// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/navigation';
// import PrimaryButton from '../components/PrimaryButton';

// type RootNav = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

// const WelcomeScreen = () => {
//   const navigation = useNavigation<RootNav>();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to,</Text>
//       <Text style={styles.brand}>Sukhi Soul</Text>

//       <Text style={styles.subtitle}>
//         Let’s build balance with mindful {'\n'}habits, deeper bonds, and daily {'\n'}wellbeing
//       </Text>

//       <View style={styles.imagePlaceholder} />

//       <PrimaryButton
//         title="Sign Up"
//         onPress={() => navigation.navigate('AuthStack', { screen: 'Signup' })}
//         style={{ width: '40%', alignSelf: 'center' }}

//       />

//       <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
//         <Text style={styles.loginText}>
//           Already have an account? <Text style={styles.link}>Sign In</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     paddingTop: 80,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 16,
//     color: '#666',
//   },
//   brand: {
//     fontSize: 48,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#444',
//     lineHeight: 22,
//     marginBottom: 50,
//   },
//   imagePlaceholder: {
//     width: 220,
//     height: 270,
//     backgroundColor: '#ccc',
//     borderRadius: 16,
//     alignSelf: 'center',
//     marginBottom: 40,
//   },
//   loginText: {
//     marginTop: 12,
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#999',
//   },
//   link: {
//     textDecorationLine: 'underline',
//     color: '#000',
//     fontSize:16,
//   },
// });

// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View , StyleSheet,Image } from 'react-native';
import AppText from '../components/AppText';
import PrimaryButton from '../components/PrimaryButton';
import GradientWrapper from '../components/GradientWrapper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import colors from '../theme/colors';

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <GradientWrapper>
      <AppText variant="caption">Welcome to,</AppText>
      <AppText variant="h1" style={styles.brand}>Sukhi Soul</AppText>
      <AppText style={styles.description}>
        Let’s build balance with mindful habits, deeper bonds, and daily wellbeing
      </AppText>

      {/* <ImageCard source={require('../assets/images/explorer.png')} /> */}
      <View style={styles.card}>
      <Image source={require('../assets/images/explorer.png')} style={styles.image} resizeMode="cover" />
    </View>

      <PrimaryButton 
      title="Sign Up" 
      onPress={() => navigation.navigate('AuthStack', { screen: 'Signup' })} 
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ width: '40%', alignSelf: 'center' }}
      />

      <AppText variant="caption" style={styles.footer}>
        Already have an account?{' '}
        <AppText style={styles.link} onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
          Log in
        </AppText>
      </AppText>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  brand: {
    marginTop: 4,
  },
  description: {
    marginTop: 10,
    marginBottom: 20,
    maxWidth: 280,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    width: 220,
    height: 270,
    backgroundColor: '#ccc', // fallback in case image fails
    borderRadius: 16,
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
