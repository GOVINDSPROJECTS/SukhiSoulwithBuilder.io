/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import BottomSheetModal from '../../components/BottomSheetModal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios'; // <-- use axios for API calls
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Share } from 'react-native';


const TeamUpFlowScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<'teamup' | 'circle' | 'circleToInvite' | 'created' | 'invite'>('teamup');
  const [habitID, setHabitID] = useState('');
  // const [loading, setLoading] = useState(false);
  const token = useAuthStore.getState().token;
  const [hasShared, setHasShared] = useState(false);
  const [code, setCode] = useState("");


  const handleCreateCircleUsingCode = () => {
    setStep('circle');
  }

  const handleCreateCircleWithCode = () => {
    setStep('circleToInvite');
  }

  const handleShare = async () => {
    try {
      const message = `Hey! 👋 Join my Habit Circle using this ID: ${habitID}\n\nLet's track our habits together! 🚀`;
      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        // Close bottom sheet first
        setVisible(false);

        // Reopen with "created" step after small delay
        setTimeout(() => {
          setStep("created");
          setVisible(true);
        }, 300);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to share Habit Circle ID");
    }
  };


  React.useEffect(() => {
    if (hasShared) {
      // wait a tick before moving to created step
      const timer = setTimeout(() => {
        setStep("created");
        setHasShared(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hasShared]);


// eslint-disable-next-line react-hooks/exhaustive-deps
const CreateSelfAsMember = async (roomId: string) => {
  try {
    const payload = new FormData();
    payload.append('room_id', roomId);

    await api.post(
      'habitroommembers',
      payload,
      {
        headers: { 'Content-Type': 'multipart/form-data' ,
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Use the token from the auth store", 
        },
        
      }
    );

  } catch (error: any) {
    console.error('Error Joining Room:', error);
    Alert.alert('Error1111', error?.response?.data?.message || 'Failed to join room.');
  }
};

  // API call to create habit circle
  const createHabitCircle = React.useCallback(async () => {
    try {
      // setLoading(true);
      const response = await api.post('/habitrooms', {}, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Use the token from the auth store", 
        }
      });

      if (response.data?.habit_room?.room_id) {
        // setHabitID(response.data.habit_room.room_id.toString());
        const roomId = response.data.habit_room.room_id.toString();
      setHabitID(roomId); // still store in state if needed later
        await CreateSelfAsMember(roomId); // pass directly here
      } else {
        Alert.alert("Error", "Failed to create Habit Circle");
      }
      
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while creating the circle");
    } finally {
      // setLoading(false);`
    }
  }, [CreateSelfAsMember, token]); // ✅ empty deps → function won't change


  React.useEffect(() => {
    if (step === "circle" && !habitID) {
      createHabitCircle();
    }
  }, [step, habitID, createHabitCircle]);


  const renderStepContent = () => {
    switch (step) {
      case 'teamup':
        return (

          <View style={styles.container}>
            {/* Profile Avatar */}

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>Invite your</Text>
              <Text style={styles.titleHighlight}> Buddy</Text>

              {/* Get Code */}
              <TouchableOpacity style={styles.optionBox} onPress={handleCreateCircleUsingCode}>
                <Text style={styles.optionText}>
                  Get Code{"\n"}
                  <Text style={styles.subText}>Share this code with your partner</Text>
                </Text>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png" }}
                  style={styles.icon}
                />
              </TouchableOpacity>


              <TouchableOpacity style={styles.optionBox} onPress={handleCreateCircleWithCode}>
                <Text style={styles.optionText}>
                  Enter Code{"\n"}
                  <Text style={styles.subText}>Already have a code? Write it here</Text>
                </Text>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/84/84380.png" }}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'circle':
        return (
          <View>
            <Text style={styles.heading}>Your Habit Circle</Text>

            {/* Wrapper with border */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={habitID}
                editable={false}
                selectTextOnFocus={false}
              />
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(habitID);
                  Alert.alert("Copied", "Habit Circle ID copied!");
                }}
                style={styles.copyButton}
              >
                <Ionicons name="copy-outline" size={wp(6)} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.grayBox} />
            <Text style={[styles.desc, { marginVertical: wp(15) }]}>
              Stick to habits 95% better—together
            </Text>

            <PrimaryButton
              title="Share this ID"
              onPress={handleShare}
              style={{
                width: wp(40),
                height: wp(11),
                alignSelf: 'center',
                marginBottom: hp(6),
              }}
            />
          </View>
        );

      case 'circleToInvite':


        const handlAcceptInvite = async () => {
          try {
            const payload = new FormData();
            payload.append('room_id', code);

            const response = await api.post(
              'habitroommembers',
              payload,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
            );

            if (response?.data?.message?.includes('Member added to room successfully')) {
              // ✅ Navigate to OTP Screen with required data
              navigation.navigate('HabitCircle');
            } else {
              Alert.alert('Error', response.data?.message || 'Something went wrong.');
            }
          } catch (error: any) {
            console.error('Error Joining Room:', error);
            Alert.alert('Error', error?.response?.data?.message || 'Failed to send OTP.');
          }

        }

        return (
          <View style={{ paddingHorizontal: wp(6), paddingVertical: hp(2) }}>
            <Text style={styles.title}>Enter Shared Code</Text>
            <Text style={styles.subtitle}>
              Your partner sent you an invite code. Paste it below to get connected.
            </Text>

            <TextInput
              style={[
                styles.inputinvite,
                {
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  padding: wp(3),
                  marginBottom: hp(2),
                },
              ]}
              placeholder="Paste code here..."
              placeholderTextColor="#aaa"
              value={code}
              onChangeText={setCode}
            />

            <TouchableOpacity style={styles.button} onPress={handlAcceptInvite}>
              <Text style={styles.buttonText}>Sync Now</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>
              Secure sync. Only you two can view shared progress.
            </Text>
          </View>
        );

      case 'invite':
        return (
          <View>
            <Image
              source={require('../../assets/icons/correct.png')}
              style={styles.image}
            />

            <View style={{ width: wp(55), alignSelf: 'center', marginBottom: hp(40) }}>
              <Text style={[styles.heading, { alignSelf: 'center', textAlign: 'center' }]}>Invite Sent</Text>
              <Text style={[{ alignSelf: 'center', }]}>We’ll notify you when they join</Text>
            </View>

            <PrimaryButton
              title="Done"
              onPress={() => {
                setVisible(false);
                navigation.replace('HabitCircle');
              }}
              style={{ width: wp(26), height: wp(11), alignSelf: "center", marginBottom: hp(1) }}
            />

            <TouchableOpacity>
              <Text style={[styles.desc, { alignSelf: 'center', marginBottom: hp(45) }]}>Cancel Invite</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <BottomSheetModal visible={visible} onClose={() => navigation.navigate('HabitsHome' as any)}>
      <View
        style={{
          width: wp(13),
          height: 5,
          backgroundColor: '#171717',
          marginTop: 2,
          marginBottom: hp(2),
          borderRadius: 12,
          alignSelf: 'center',
        }}
      />
      {renderStepContent()}
    </BottomSheetModal>
  );
};

export default TeamUpFlowScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: wp(9),
    fontWeight: 700,
    marginBottom: 10,
    color: '#171717',
    marginTop: 20,

  },
  subHeading: {
    fontSize: wp(3.5),
    fontWeight: 500,
    color: 'rgba(23, 23, 23, 0.54)',
    marginBottom: 16,
  },
  desc: {
    // marginVertical: wp(10),
    textAlign: 'center',
    fontSize: wp(3.5),
    color: '#171717',
    fontWeight: '400',
    marginBottom: wp(1),
  },


  input: {
    flex: 1,
    fontSize: wp(3.5),
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(10),
  },
  copyIcon: {
    marginLeft: wp(2),
  },

  grayBox: {
    marginLeft: wp(6),
    marginRight: wp(6),
    width: wp(88),
    height: wp(62),
    backgroundColor: '#686868',
    marginBottom: wp(8),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: wp(2.5),
    marginVertical: 16,
  },

  //Correct.png Icon 
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(5),
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#F3FAFF",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingHorizontal: wp("5%"),
  // },
  image: {
    width: wp(13),
    height: wp(13),
    marginTop: hp(5),
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.1),
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    height: wp(12),
    marginBottom: wp(20),
    paddingHorizontal: wp(3),
  },
  copyButton: {
    paddingHorizontal: wp(2), // space so icon doesn’t stick to border
  },


  avatarContainer: {
    position: "absolute",
    top: hp("5%"),
  },
  avatarCircle: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("7.5%"),
    backgroundColor: "#0088cc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: wp("6%"),
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    width: wp("85%"),
    padding: wp("6%"),
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginTop: hp("12%"),
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "600",
    color: "#222",
  },
  titleHighlight: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: "#0077cc",
    marginBottom: hp("3%"),
  },
  optionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp("4%"),
    borderRadius: 10,
    marginBottom: hp("2%"),
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: wp("4%"),
    color: "#222",
  },
  subText: {
    fontSize: wp("3.2%"),
    color: "#777",
  },

  icon: {
    width: wp("6%"),
    height: wp("6%"),
    marginLeft: wp("2%"),
  },

  //   title: {
  //   fontSize: wp("7%"),
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   marginBottom: hp("1.5%"),
  // },
  subtitle: {
    fontSize: wp("4%"),
    textAlign: "center",
    color: "#555",
    marginBottom: hp("3%"),
  },
  inputinvite: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    fontSize: wp("4%"),
    marginBottom: hp("3%"),
  },
  button: {
    width: "100%",
    backgroundColor: "#175873",
    paddingVertical: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontWeight: "600",
  },
  footer: {
    fontSize: wp("3.5%"),
    textAlign: "center",
    color: "#666",
  },
  containerinvite: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("8%"),
    backgroundColor: "#fff",
  },
});
