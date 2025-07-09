// import React from 'react';
// import { View, TextInput, StyleSheet, ViewStyle, Text, Alert } from 'react-native';

// interface Props {
//   placeholder: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   secureTextEntry?: boolean;
//   style?: ViewStyle;
//   type?: 'text' | 'age' | 'email' | 'sex';  // <-- added type
// }

// const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, style, type = 'text' }: Props) => {

//   const handleInput = (text: string) => {
//     switch (type) {
//       case 'text':
//         onChangeText(text.replace(/[^A-Za-z ]/g, '')); // only letters and spaces
//         break;
//       case 'age':
//         if (/^\d{0,2}$/.test(text)) onChangeText(text); // only 0–99
//         break;
//       case 'email':
//         onChangeText(text); // just set here, validate externally
//         break;
//       case 'sex':
//         const formatted = text.toLowerCase();
//         if (formatted === 'male' || formatted === 'female') {
//           onChangeText(formatted);
//         } else {
//           onChangeText(text); // allow input but validate on submit
//         }
//         break;
//       default:
//         onChangeText(text);
//     }
//   };

//   return (
//     <View style={styles.inputWrapper}>
//       <TextInput
//         style={[styles.input, style]}
//         placeholder={placeholder}
//         placeholderTextColor="#ddd"
//         value={value}
//         onChangeText={handleInput}
//         secureTextEntry={secureTextEntry}
//         keyboardType={
//           type === 'age' ? 'numeric' :
//           type === 'email' ? 'email-address' :
//           'default'
//         }
//         autoCapitalize={type === 'email' || type === 'sex' ? 'none' : 'words'}
//       />
//     </View>
//   );
// };

// export default CustomTextInput;

// const styles = StyleSheet.create({
//   inputWrapper: {
//     width: '100%',
//     marginVertical: 8,
//   },
//   input: {
//     backgroundColor: '#fff',
//     color: '#000',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 10,
//     fontSize: 16,
//   },
// });


import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, Text } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  type?: 'text' | 'age' | 'email' | 'sex';
  error?: string; // <-- added error prop
}

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  type = 'text',
  error,
}: Props) => {

  const handleInput = (text: string) => {
    switch (type) {
      case 'text':
        onChangeText(text.replace(/[^A-Za-z ]/g, ''));
        break;
      case 'age':
        if (/^\d{0,2}$/.test(text)) onChangeText(text);
        break;
      case 'email':
        onChangeText(text);
        break;
      case 'sex':
        const formatted = text.toLowerCase();
        if (formatted === 'male' || formatted === 'female') {
          onChangeText(formatted);
        } else {
          onChangeText(text);
        }
        break;
      default:
        onChangeText(text);
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[
          styles.input,
          style,
          error ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        value={value}
        onChangeText={handleInput}
        secureTextEntry={secureTextEntry}
        keyboardType={
          type === 'age' ? 'numeric' :
          type === 'email' ? 'email-address' :
          'default'
        }
        autoCapitalize={type === 'email' || type === 'sex' ? 'none' : 'words'}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
