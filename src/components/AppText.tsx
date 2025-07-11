// src/components/AppText.tsx
import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import colors from '../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  style?: any;
}

const AppText = ({ variant = 'body', style, ...props }: Props) => {
  return <Text style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
   h1: {
    fontSize: wp('8%'),
    fontWeight: '700',
  },
  h2: {
    fontSize: wp('6%'),
    fontWeight: '600',
  },
  caption: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AppText;
