// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity,TextInput,Alert } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import GradientWrapper from '../../components/GradientWrapper';
// import Icon from 'react-native-vector-icons/Feather'; // for icons
// import Feather from 'react-native-vector-icons/Feather';
// import BottomSheetModal from '../../components/BottomSheetModal';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import PrimaryButton from '../../components/PrimaryButton';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../types/navigation';






// const GetEnterCodeScreen = () => {
//   const [showGetCodeModal, setshowGetCodeModal] = useState(true);

//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const handleCreateHabitCircle = async () => {
//     try {
//       const response = await fetch('http://3.6.142.117/api/habitrooms', {
//         method: 'POST', // or 'GET' depending on API spec
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({ /* if API needs data */ })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const roomId = data.room_id; // adjust if API response structure is different

//         // Store roomId in navigation params
//         navigation.navigate('NextScreen', { roomId });

//       } else {
//         console.error('API Error:', data);
//         Alert.alert('Failed to create habit circle.');
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//       Alert.alert('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <GradientWrapper>
//       <View style={styles.card}>
//         <Text style={styles.title}>Invite your{'\n'}Sync Buddy</Text>

//         {/* Get Code Box */}
//         <TouchableOpacity style={[styles.optionBox,{marginTop:hp(11)}]}>
//           <View>
//             <Text style={styles.optionTitle}>Get Code</Text>
//             <Text style={styles.optionSubtitle}>Share this code with your partner</Text>
//           </View>
//           <View style={styles.iconBox}>
//             <Feather name="plus-square" color="#000" size={24} />
//           </View>
//         </TouchableOpacity>

//         {/* Enter Code Box */}
//         <TouchableOpacity style={styles.optionBox}>
//           <View>
//             <Text style={styles.optionTitle}>Enter code</Text>
//             <Text style={styles.optionSubtitle}>Already have a code? Write it here</Text>
//           </View>
//           <View style={styles.iconBox}>
//             <Icon name="edit" size={24} color="#000" />
//           </View>
//         </TouchableOpacity>
//       </View>


//       <BottomSheetModal visible={showGetCodeModal} onClose={() => setshowGetCodeModal(false)}>
//          <View>
//             <Text style={styles.heading}>Your Habit Circle</Text>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 // value={habitID}
//                 value={"089"}
//                 editable={false}
//                 selectTextOnFocus={false}
//               />
//               <TouchableOpacity onPress={() => {
//                 // Clipboard.setString(habitID);
//                 Clipboard.setString("089");
//                 Alert.alert("Copied", "Habit Circle ID copied!");
//               }}>
//                 <Ionicons name="copy-outline" size={wp(6)} color="#000" style={styles.copyIcon} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.grayBox} />
//             <Text style={[styles.desc, { marginVertical: wp(15) }]}>
//               Stick to habits 95% better—together
//             </Text>

//             {/* <PrimaryButton
//               title="Share this ID"
//               onPress={}
//               style={{
//                 width: wp(40),
//                 height: wp(11),
//                 alignSelf: 'center',
//                 marginBottom: hp(6),
//               }}
//             /> */}
//           </View>

//       </BottomSheetModal>
//     </GradientWrapper>
//   );
// };

// export default GetEnterCodeScreen;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: wp(6),
//     width: wp(90),
//     alignSelf: 'center',
//     height:hp(55),
//     marginTop: hp(16),
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 4,
//   },
//   title: {
//     fontSize: wp(9),
//     fontWeight: '700',
//     color: '#245C73',
//   },
//   optionBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: wp(4),
//     marginBottom: hp(2),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   optionTitle: {
//     fontSize: wp(4.5),
//     fontWeight: '600',
//     color: '#2D2D2D',
//   },
//   optionSubtitle: {
//     fontSize: wp(3.5),
//     color: '#666666',
//     marginTop: 2,
//   },
//   iconBox: {
//     width: wp(8),
//     height: wp(8),
//     borderRadius: wp(4),
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   //Styles for Getcode model
//   heading: {
//     fontSize: wp(9),
//     fontWeight: 700,
//     marginBottom: 10,
//     color: '#171717',
//     marginTop: 20,

//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: wp(0.1),
//     borderColor: '#000000',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },

//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: wp(10),
//   },
//   copyIcon: {
//     marginLeft: wp(2),
//   },
//   grayBox: {
//     marginLeft:wp(6),
//     marginRight:wp(6),
//     width: wp(88),
//     height: wp(62),
//     backgroundColor: '#686868',
//     marginBottom: wp(8),
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     borderRadius: wp(2.5),
//     marginVertical: 16,
//   },
//   desc: {
//     // marginVertical: wp(10),
//     textAlign: 'center',
//     fontSize: wp(3.5),
//     color: '#171717',
//     fontWeight: '400',
//     marginBottom: wp(1),
//   },


// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
  ActivityIndicator,
  Image,
  
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientWrapper from '../../components/GradientWrapper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import BottomSheetModal from '../../components/BottomSheetModal';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const ui = StyleSheet.create({
  sheetHandle: {
    width: wp(13),
    height: 5,
    backgroundColor: '#171717',
    marginTop: 2,
    marginBottom: hp(2),
    borderRadius: 12,
    alignSelf: 'center',
  },
  flex1: { flex: 1 },
  descMargin: { marginVertical: wp(10) },
  shareIdButton: { width: wp(40), height: wp(11), alignSelf: 'center', marginBottom: hp(6) },
});

const GetEnterCodeScreen: React.FC = () => {
  const [showGetCodeModal, setShowGetCodeModal] = useState(false);
  const [habitCode, _setHabitCode] = useState<string>('123456');
  const [_loading, _setLoading] = useState(false);




  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();







  const handleCopyCode = () => {
    if (!habitCode) return;
    Clipboard.setString(habitCode);
    Alert.alert('Copied', 'Habit Circle ID copied!');
  };

  const handleShareCode = async () => {
    if (!habitCode) return;
    try {
      await Share.share({
        message: `Join my Habit Circle with this code: ${habitCode}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Share error:', message);
    }
  };

  return (
    <GradientWrapper>
      <View style={styles.card}>
        <Text style={styles.title}>Create your{'\n'}Habit Circle</Text>

        {/* Get Code */}
        <TouchableOpacity
          style={[styles.optionBox, { marginTop: hp(11) }]}
          onPress={()=>setShowGetCodeModal(true)}
          disabled={loading}
        >
          <View>
            <Text style={styles.optionTitle}>Get Code</Text>
            <Text style={styles.optionSubtitle}>Share this code with your partner</Text>
          </View>

          <View style={styles.iconBox}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Feather name="plus-square" color="#000" size={24} />
            )}
          </View>
        </TouchableOpacity>







          
        
        {/* Enter Code (wire to your Enter screen when ready) */}
        <TouchableOpacity 
          style={styles.optionBox} 
          onPress={() => navigation.navigate("EnterCodeScreen")}
        >
          <View>
            <Text style={styles.optionTitle}>Enter code</Text>
            <Text style={styles.optionSubtitle}>Already have a code? Write it here</Text>
          </View>
          <View style={styles.iconBox}>
            <Feather name="edit" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      {/* BottomSheet with generated code */}
      <BottomSheetModal
        visible={showGetCodeModal}
        onClose={() => setShowGetCodeModal(false)}
      >
        <View style={ui.sheetHandle} />
        <View>
          <Text style={styles.heading}>Your Habit Circle</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, ui.flex1]}
              value={habitCode}
              editable={false}
              selectTextOnFocus={false}
            />
            <TouchableOpacity onPress={handleCopyCode}>
              <Ionicons name="copy-outline" size={wp(6)} color="#000" style={styles.copyIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.grayBox}>
            <Image
                source={require('../../assets/images/Rectangle35.png')}
                style={styles.image}
                resizeMode="cover"
            />
          </View>
          <Text style={[styles.desc, ui.descMargin]}>
            Stick to habits 95% better—together
          </Text>

          <PrimaryButton
            title="Share this ID"
            onPress={handleShareCode}
            style={{
                width: wp(40),
                height: wp(11),
                alignSelf: 'center',
                marginBottom: hp(6),
            }}
          />
        </View>
      </BottomSheetModal>
    </GradientWrapper>
  );
};

export default GetEnterCodeScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: wp(6),
    width: wp(90),
    alignSelf: 'center',
    height: hp(55),
    marginTop: hp(16),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: wp(9),
    fontWeight: '700',
    color: '#245C73',
  },
  optionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp(4),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#2D2D2D',
  },
  optionSubtitle: {
    fontSize: wp(3.5),
    color: '#666666',
    marginTop: 2,
  },
  iconBox: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // BottomSheet styles
  heading: {
    fontSize: wp(9),
    fontWeight: 700,
    marginBottom: 10,
    color: '#171717',
    marginTop: hp(3),

  },
  input: {
    backgroundColor: '#FFFFFF',
    marginTop:hp(2.5),
    borderWidth: wp(0.2),
    borderColor: '#000000',
    height: wp(12),
    padding: 10,
    borderRadius: 10,
    marginBottom: wp(20),
    color: '#000000',
    fontSize: wp(3.5),
      shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity:5,
    shadowRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(1),
  },
  copyIcon: {
    marginLeft: wp(2),
    marginBottom:hp(8),
  },
  grayBox: {
    marginLeft:wp(6),
    marginRight:wp(6),
    width: wp(88),
    height: wp(62),
    // backgroundColor: '#686868',
    marginBottom: wp(8),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity:5,
    shadowRadius: 5,
    borderRadius: wp(2.5),
    marginVertical: 12,
  },
   desc: {
    // marginVertical: wp(10),
    textAlign: 'center',
    fontSize: wp(3.5),
    color: '#171717',
    fontWeight: '400',
    marginBottom: wp(1),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
