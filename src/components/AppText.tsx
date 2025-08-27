// src/components/AppText.tsx
import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import colors from '../theme/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  style?: any;
}

const AppText = ({ variant = 'body', style, ...props }: Props) => {
  return <Text style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
   h1: {
    fontWeight: '700',
    fontSize: wp('10%'),
    color:colors.primary,
  },
  h2: {
    fontSize: wp('6%'),
    // fontWeight: '300',
    color:'#2D2D2D',
  },
  caption: {
    fontSize: wp('4.5%'),
    color: '#666',
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AppText;
