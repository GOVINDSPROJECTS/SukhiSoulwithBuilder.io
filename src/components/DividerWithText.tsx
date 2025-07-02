import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = () => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>Sign up with</Text>
    <View style={styles.line} />
  </View>
);

export default DividerWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#555',
  },
});
