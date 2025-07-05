// src/components/AppText.tsx
import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import colors from '../theme/colors';

interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  style?: any;
}

const AppText = ({ variant = 'body', style, ...props }: Props) => {
  return <Text style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 18,
    color: colors.muted,
  },
});

export default AppText;
