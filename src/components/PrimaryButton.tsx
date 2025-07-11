

// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
// import colors from '../theme/colors';

// interface Props {
//   title: string;
//   onPress: () => void;
//   style?: ViewStyle;
//   textStyle?: TextStyle;
// }

// const PrimaryButton = ({ title, onPress, style, textStyle }: Props) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
//       <Text style={[styles.text, textStyle]}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: colors.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     alignItems: 'center',
//     elevation: 2,
//   },
//   text: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default PrimaryButton;

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import colors from '../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}

const PrimaryButton = ({ title, onPress, style, disabled, loading }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
   button: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2.5%'),
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    // fontSize: wp('4.5%'),
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
