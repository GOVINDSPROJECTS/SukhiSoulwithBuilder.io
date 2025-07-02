import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

type Props = {
  icon: any;
  onPress: () => void;
};

const SocialLoginButton = ({ icon, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
