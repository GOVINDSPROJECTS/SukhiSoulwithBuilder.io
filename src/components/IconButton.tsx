import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  icon: any;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const IconButton = ({ icon, label, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#9999',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 12,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
