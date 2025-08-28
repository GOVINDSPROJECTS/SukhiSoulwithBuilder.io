import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import PrimaryButton from '../../components/PrimaryButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const EnterCodeScreen = () => {
  const [code, setCode] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleJoin = () => {
    if (code.trim().length === 0) {
      Alert.alert("Error", "Please enter a valid code.");
      return;
    }
    // Navigate to HabitCircleScreen with code
    // navigation.navigate("HabitCircleScreen", { joinedCode: code });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Shared{'\n'}Code</Text>
      <Text style={styles.subtitle}>Your partner sent you an invite code. Paste it below to get connected.</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste Code here..."
        value={code}
        onChangeText={setCode}
        maxLength={8}
      />

      <PrimaryButton
        title="Join Circle"
        onPress={() => {
          if (code.trim().length === 0) {
            Alert.alert("Error", "Please enter a valid code.");
            return;
          }

          navigation.navigate("HabitCircleScreen", { joinedCode: code });
        }}
        style={{
          width: wp(40),
          height: wp(11),
          alignSelf: 'center',
          marginTop: hp(8),
          marginBottom: hp(5),
        }}
      />
      
    </View>
  );
};

export default EnterCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("5%"),
    backgroundColor: "#fff",
  },
  title: {
    fontSize: wp(9),
    fontWeight: 700,
    alignSelf:"flex-start",
    marginBottom: hp(0.5),
    color: "#2D2D2D",
  },
  subtitle:{
    fontSize:wp(3),
    fontWeight:500,
    color: "#666666",
    marginBottom: hp(6),
    marginLeft:wp(1)
  },
  input: {
    width: wp("88%"),
    height: hp("7%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp("3"),
    paddingHorizontal: wp("4%"),
    fontSize: wp("3.5"),
    marginBottom: hp("3%"),
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity:5,
    shadowRadius: 5,
  },
  joinButton: {
    backgroundColor: "#2196F3",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("12%"),
    borderRadius: wp("3%"),
  },
  joinText: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontWeight: "600",
  },
});
