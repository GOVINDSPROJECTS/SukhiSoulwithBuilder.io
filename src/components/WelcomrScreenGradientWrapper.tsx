import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WelcomeScreenGradientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={[ colors.gradientMiddle , colors.gradientStart]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
    justifyContent: 'center',
    paddingTop:wp("5%"),
  },
});

export default WelcomeScreenGradientWrapper;
