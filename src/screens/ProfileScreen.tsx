import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { fetchUserInfo } from '../services/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../components/PrimaryButton';
import BottomSheetModal from '../components/BottomSheetModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import CustomOptionPickerModal from '@/components/CustomOptionPickerModal';
import Feather from 'react-native-vector-icons/Feather';
import api from '../services/api';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import DeviceInfo from 'react-native-device-info';



const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  const [fullName, setFullName] = useState(user?.name ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [age, setAge] = useState(user?.age?.toString() ?? '');
  const token = useAuthStore(state => state.token);

  const appName = DeviceInfo.getApplicationName();
  const appVersion = DeviceInfo.getVersion();       

  const handleChoosePhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', 'Failed to pick image');
          return;
        }

        const asset = response.assets?.[0];
        if (!asset || !asset.uri) return;

        const uploadToken = useAuthStore.getState().token;
        const formData = new FormData();
        let mime = 'image/jpeg';

        if (asset.uri.endsWith('.png')) mime = 'image/png';

        formData.append('display_photo', {
          uri: asset.uri,
          type: mime,
          name: asset.fileName || `profile_${Date.now()}.${mime.split('/')[1]}`,
        } as any);



        try {
          const res = await api.post('/update-profile-picture', formData, {
            headers: {
              Authorization: `Bearer ${uploadToken}`,
              'Content-Type': 'multipart/form-data',
            },
            timeout: 10000,
          });
          console.log('User from store:', user);

          if (res.data.success && user?.id) {
            setUser({
              ...user,
              display_photo: res.data.photo_url,
            });
            console.log(res.data.photo_url);
            Alert.alert('Success', 'Profile photo updated');
          } else {
            Alert.alert('Error', 'User data is missing');
          }

        } catch (err) {
          console.error(err);
          Alert.alert('Error', 'Upload failed');
        }
      }
    );
  };

  // API handler for profile update
  const handleUpdateProfile = async (updates: { name?: string; gender?: string; age?: string }) => {
    try {
      const res = await api.put('/update-profile', updates, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success && user?.id) {
        setUser({
          ...user,
          ...updates,
        });
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', res.data.message || 'Failed to update');
      }

    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Error', 'Unable to update profile');
    }
  };

  const handleSaveContact = () => {
    handleUpdateProfile({ name: fullName });
    setShowUpdateModal(false);
  };

  const handleSaveSex = () => {
    handleUpdateProfile({ gender });
    setShowGenderPicker(false);
  };

  const handleSaveAge = () => {
    handleUpdateProfile({ age });
    setShowAgeModal(false);
  };

  const handleLogout = () => {
    logout();
  };

useFocusEffect(
  useCallback(() => {
    fetchUserInfo();
  }, [])
);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Image
          source={{
            uri: user?.display_photo
              ? user.display_photo
              : 'http://3.6.142.117/profile_pictures/1756323726_68af5f8e88689.jpg',
          }}
          style={styles.profileImage}
        />

        <View style={styles.editIconWrapper}>
          <Feather name="camera" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Name */}
      <Text style={styles.userName}>{user?.name}</Text>

      {/* Reports and Logs */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ReportsLogsScreen')}>
        <View>
          <Text style={styles.cardTitle}>Reports and Logs</Text>
          <Text style={styles.cardSubtitle}>Check your logged data and statistics</Text>
        </View>
        <Icon name="chevron-forward" size={20} color="#888" />
      </TouchableOpacity>

      <View style={styles.container}>
        <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('SavedItemsScreen')}>
          <Text style={styles.optionText}>Saved Items</Text>
          <Icon name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={() => setShowModal(true)}>
          <Text style={styles.optionText}>Account and Security</Text>
          <Icon name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Settings</Text>
          <Icon name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        {/* Log Out Button */}
        <PrimaryButton title="Log Out" onPress={handleLogout} style={styles.logoutButton} />
        <Text style={styles.appVersion}>{appName} {appVersion}</Text>
      </View>

      {/* Account Modal */}
      <BottomSheetModal visible={showModal} onClose={() => setShowModal(false)}>
        <View style={styles.sheetHandle} />
        <View style={styles.modalContentTop}>
          <Text style={styles.accountTitle}>Account and Security</Text>

          {/* Full Name */}
          <View style={styles.Card}>
            <Text style={styles.lightTxt}>Full Name</Text>
            <View style={styles.rowBetweenMT05}>
              <Text style={styles.name}>{user?.name}</Text>
              <TouchableOpacity onPress={() => setShowUpdateModal(true)}>
                <Feather name="edit" size={wp(5.5)} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Email - disabled */}
          <View style={styles.cardDisabled}>
            <Text style={styles.lightTxt}>Email Address</Text>
            <Text style={styles.name}>{user?.email}</Text>
          </View>

          {/* Sex */}
          <View style={styles.Card}>
            <Text style={styles.lightTxt}>Sex</Text>
            <View style={styles.rowBetweenMT05}>
              <Text style={styles.name}>{user?.gender ?? 'Not mentioned'}</Text>
              <TouchableOpacity onPress={() => setShowGenderPicker(true)}>
                <Feather name="edit" size={wp(5.5)} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Age */}
          <View style={styles.Card}>
            <Text style={styles.lightTxt}>Age</Text>
            <View style={styles.rowBetweenMT05}>
              <Text style={styles.name}>{user?.age ?? 'Not mentioned'}</Text>
              <TouchableOpacity onPress={() => setShowAgeModal(true)}>
                <Feather name="edit" size={wp(5.5)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetModal>

      {/* Name Edit Modal */}
      <BottomSheetModal visible={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <Text style={[styles.text18, styles.fieldLabelSpacing]}>Full Name</Text>
        <TextInput value={fullName} onChangeText={setFullName} style={styles.inputStyle} />
        <PrimaryButton title="Save" onPress={handleSaveContact} style={styles.modalPrimaryButton} />
      </BottomSheetModal>

      {/* Age Edit Modal */}
      <BottomSheetModal visible={showAgeModal} onClose={() => setShowAgeModal(false)}>
        <Text style={[styles.text18, styles.fieldLabelSpacing]}>Age</Text>
        <TextInput value={age} onChangeText={setAge} style={styles.inputStyle} keyboardType="numeric" />
        <PrimaryButton title="Save" onPress={handleSaveAge} style={styles.modalPrimaryButton} />
      </BottomSheetModal>

      {/* Gender Picker */}
      <CustomOptionPickerModal
        visible={showGenderPicker}
        options={['Male', 'Female']}
        onClose={() => {
          handleSaveSex(); // call the function
          setShowGenderPicker(false);
        }}
        onSelect={(val) => {
          setGender(val);
          handleUpdateProfile({ gender: val });
          setShowGenderPicker(false);
        }}
        selected={gender}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text18: { fontSize: wp(4.5), color: '#2D2D2D', fontWeight: '500' },
  disabledInput: { backgroundColor: '#f2f2f2', color: '#999' },
  Card: {
    backgroundColor: '#fff',
    width: wp(88),
    height: wp(21),
    alignSelf: 'center',
    marginBottom: wp(2),
    borderRadius: wp(2.5),
    borderColor: '#2D2D2D',
    borderWidth: wp(0.1),
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  name: { fontSize: wp(4), width: wp(45), fontWeight: '500', color: '#2D2D2D' },
  lightTxt: { fontSize: wp(3.2), fontWeight: '400', color: '#666' },
  container: { alignItems: 'center', padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  profileImage: { width: wp(37), height: wp(37), borderRadius: wp(20), marginTop: wp(6), marginBottom: hp(1), backgroundColor: '#666' },
  userName: { fontSize: wp(8), fontWeight: '700', color: '#2D2D2D' },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '500', color: '#222' },
  cardSubtitle: { fontSize: 12, color: '#888', marginTop: 4 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: wp(4) },
  optionText: { fontSize: wp(4.5), fontWeight: '500', color: '#2D2D2D' },
  logoutButton: { paddingVertical: wp(3), paddingHorizontal: wp(10), borderRadius: wp(2.5), marginTop: hp(5) },
  appVersion: { fontSize: wp(4.0), color: '#666', marginTop: hp(2), fontWeight: '400' },
  sheetHandle: { width: wp(13), height: 5, backgroundColor: '#000', marginTop: 2, marginBottom: hp(2), borderRadius: 12, alignSelf: 'center' },
  modalContentTop: { marginTop: hp(3) },
  accountTitle: { fontSize: wp(6), fontWeight: '700', marginBottom: hp(3), textAlign: 'center' },
  rowBetweenMT05: { flexDirection: 'row', justifyContent: 'space-between', marginTop: wp(0.5) },
  cardDisabled: { ...StyleSheet.flatten([ ({} as any) ]), ...({} as any) },
  fieldLabelSpacing: { marginLeft: wp(3), marginTop: hp(3) },
  modalPrimaryButton: { width: wp(40), height: wp(11), alignSelf: 'center', marginTop: hp(20) },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: wp(3),
    width: wp(88),
    paddingVertical: hp(1.5),
    fontSize: wp(4),
    backgroundColor: '#fff',
    marginTop: hp(1),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: wp(32),
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 20,
  }

});

export default ProfileScreen;
