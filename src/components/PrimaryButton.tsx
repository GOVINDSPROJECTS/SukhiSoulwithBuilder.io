// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

// type Props = {
//   title: string;
//   onPress: () => void;
//   style?: StyleProp<ViewStyle>; // <-- For optional external styling
// };

// const PrimaryButton = ({ title, onPress, style }: Props) => {
//   return (
//     <TouchableOpacity
//       style={[styles.button, style]}
//       onPress={onPress}
//       activeOpacity={0.8}
//     >
//       <Text style={styles.buttonText}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// export default PrimaryButton;

// const styles = StyleSheet.create({
//   button: {
//     width: '100%', // <-- Responsive width
//     backgroundColor: '#000',
//     // backgroundColor: '#fff',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 16,
//     borderColor:'#000',
//     // borderStartWidth:2,
//     // borderEndWidth:2,
//     // borderWidth:2
//   },
//   buttonText: {
//     // color: '#000',
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '../theme/colors';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton = ({ title, onPress, style, textStyle }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrimaryButton;
