import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../theme/colors';

const GradientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
});

export default GradientWrapper;
