// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Modal,
//     StyleSheet,
//     Pressable
// } from 'react-native';

// const GenderSelector = ({ value, onSelect }: { value: string; onSelect: (v: string) => void }) => {
//     const [visible, setVisible] = useState(false);

//     return (
//         <>
//             <TouchableOpacity onPress={() => setVisible(true)} style={styles.inputWrapper}>
//                 <Text style={[styles.inputText, !value && { color: '#aaa' }]}>
//                     {value || 'Select Gender'}
//                 </Text>
//             </TouchableOpacity>

//             <Modal transparent visible={visible} animationType="fade">
//                 <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)} />

//                 <View style={styles.modalContent}>
//                     <TouchableOpacity
//                         style={styles.option}
//                         onPress={() => {
//                             onSelect('Male');
//                             setVisible(false);
//                         }}
//                     >
//                         <Text style={styles.optionText}>Male</Text>
//                     </TouchableOpacity>

//                     <View style={styles.divider} />

//                     <TouchableOpacity
//                         style={styles.option}
//                         onPress={() => {
//                             onSelect('Female');
//                             setVisible(false);
//                         }}
//                     >
//                         <Text style={styles.optionText}>Female</Text>
//                     </TouchableOpacity>
//                 </View>

//             </Modal>
//         </>
//     );
// };

// export default GenderSelector;

import React, { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable
} from 'react-native';

const GenderSelector = ({
  value,
  onSelect,
  error,
}: {
  value: string;
  onSelect: (v: string) => void;
  error?: string;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.inputWrapper}>
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Select Gender'}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)} />

        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelect('male'); // ✅ Always lowercase
              setVisible(false);
            }}
          >
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelect('female'); // ✅ Always lowercase
              setVisible(false);
            }}
          >
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default GenderSelector;


const styles = StyleSheet.create({
    inputWrapper: {
        backgroundColor: '#fff',
        padding: wp('3.5%'),
  borderRadius: wp('2.5%'),
        // marginBottom: 16,
        justifyContent: 'center',
    },
    inputText: {
        color: '#000',
        fontSize: 16,
    },
    placeholderText: {
        color: '#aaa',
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        margin: 40,
        marginTop: '80%',
        marginLeft:'40%',
        width: '40%',
    },
    option: {
        paddingVertical: 5,
    },
    optionText: {
        fontSize: wp('4.5%'),
        color: '#000',
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 4,
    },
    errorText: {
  color: 'red',
  marginTop: 4,
  marginLeft: 6,
},


});
