import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry }: Props) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
  },
});
