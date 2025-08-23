import React, { useEffect ,useState} from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { fetchUserInfo } from '../services/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GradientWrapper from '../components/GradientWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../components/PrimaryButton';
import BottomSheetModal from '../components/BottomSheetModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import CustomOptionPickerModal from '@/components/CustomOptionPickerModal';
import Feather from 'react-native-vector-icons/Feather';








const ProfileScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);




  const actOpen="6 July 2025";

  const name='Dhanashri Deokar';


  const [fullName, setFullName] = useState(name);
  const [email, setEmail] = useState('deokardhanshri@gmail.com ');
  const [gender, setGender] = useState('Female');
  const [firstName, setFirstName] = useState('Dhanashri');
  const [lastName, setLastName] = useState('Deokar');

  // Add handler functions if needed
  const handleSaveAccountInfo = () => {
    // Do something with fullName, email, gender
    console.log({ fullName, email, gender });
    setShowModal(false);
  };

  const handleSaveContact = () => {
    // Do something with firstName, lastName
    console.log({ firstName, lastName });
    setShowUpdateModal(false);
  };
  
  // const handleGetOtp = () => {
  //   onPress={() => navigation.navigate('TeamUpFlow')}
  //   setIsOtpVerified(true); 
  // };

  
  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    // navigation.navigate('AuthStack', { screen: 'Login' });
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <Image
        // source={{ uri: 'https://placehold.co/100x100?text=User' }}
        style={styles.profileImage}
      />

      {/* Name and Created Date */}
      {/* <Text style={styles.userName}>{username}</Text> */}
      <Text style={styles.userName}>{user?.name}</Text>
      <Text style={styles.createdDate}>created on {actOpen}</Text>

      {/* Reports and Logs (Card Style) */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ReportsLogsScreen')} >
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

        <TouchableOpacity style={styles.optionRow}  onPress={() => setShowModal(true)}>
          <Text style={styles.optionText}>Account and Security</Text>
          <Icon name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Settings</Text>
          <Icon name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        {/* Log Out Button */}
        <PrimaryButton
              title="Log Out"
              onPress={handleLogout}
              style={styles.logoutButton}
        />   

        {/* App Version */}
        <Text style={styles.appVersion}>App Version 1.0.1</Text>    

      </View>



    <BottomSheetModal visible={showModal} onClose={() => setShowModal(false)}>
      <View
        style={{
          width: wp(13),
          height: 5,
          backgroundColor: '#000000',
          marginTop: 2,
          marginBottom: hp(2),
          borderRadius:12,
          alignSelf: 'center',
        }}
      />
      <View style={{ marginTop: hp(3) }}>

        <View style={{  flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',  paddingHorizontal: wp(2), 
          marginBottom: hp(3),marginTop:hp(1) }}>

            <Text style={{ fontSize: wp(6), fontWeight: '700',marginBottom: hp(3) }}>
              Account and Security
            </Text>


            <Image source={require('../assets/icons/vector.png')} style={styles.vector} />

        </View>

       <View style={styles.Card}>
            <Text style={styles.lightTxt}> Full Name </Text>

           
            <View style={{ marginTop:wp(0.5),flexDirection: 'row',justifyContent:'space-evenly',gap:wp(27)}}>
            
                  <Text style={styles.name}>{user?.name}</Text>
                   <TouchableOpacity
                      onPress={()=>setShowUpdateModal(true)}
                    >
                       <Feather name="edit" color="#000" style={{ flex: 1, alignItems: 'flex-end' }} size={wp(5.5)} />
                    </TouchableOpacity>
            </View>
          
       </View>
      <View style={styles.Card}>
            <Text style={styles.lightTxt}> Email Address </Text>

           
            <View style={{ marginTop:wp(0.5),flexDirection: 'row',justifyContent:'space-evenly',gap:wp(27)}}>
            
                  <Text style={styles.name}>{user?.email} </Text>
                   <TouchableOpacity
                      onPress={() => setShowEmailModal(true)}
                    >
                  <Feather name="edit" color="#000" style={{ flex: 1, alignItems: 'flex-end' }} size={wp(5.5)} />
                </TouchableOpacity>
            </View>
          
       </View>
      <View style={styles.Card}>
            <Text style={styles.lightTxt}> Sex </Text>

           
            <View style={{ marginTop:wp(0.5),flexDirection: 'row',justifyContent:'space-evenly',gap:wp(27)}}>
            
                  <Text style={styles.name}>{gender}</Text>
                   <TouchableOpacity
                      onPress={()=>setShowGenderPicker(true)}
                    >
                  <Feather name="edit" color="#000" style={{ flex: 1, alignItems: 'flex-end' }} size={wp(5.5)} />
                </TouchableOpacity>
            </View>
          
       </View>

        <PrimaryButton
          title="Save Changes"
          onPress={handleSaveAccountInfo}
          style={{
            width: wp(40),
            height: wp(11),
            alignSelf: 'center',
            marginTop: hp(22),
            marginBottom: hp(10),
          }}
        />
      </View>


      
    </BottomSheetModal>  

    
    <BottomSheetModal visible={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
      <View
        style={{
          width: wp(13),
          height: 5,
          backgroundColor: '#000000',
          marginTop: 2,
          marginBottom: hp(2),
          borderRadius:12,
          alignSelf: 'center',
        }}
      />
      <View style={{ marginTop: hp(3) }}>

        <View style={{  flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',  paddingHorizontal: wp(2), 
          marginBottom: hp(3),marginTop:hp(1) }}>

            <Text style={{ fontSize: wp(6), fontWeight: '700',marginBottom: hp(3) }}>
              Update Contact
            </Text>
            <Image source={require('../assets/icons/vector.png')} style={styles.vector} />
        </View>


        <Text style={[styles.text18,{marginLeft:wp(3)}]}>First Name</Text>
        <TextInput
          value={firstName}
          style={styles.inputStyle}
          onChangeText={(text) => setFirstName(text)}
        />

        <Text style={[styles.text18,{marginLeft:wp(3),marginTop:hp(4)}]}>Last Name</Text>
        <TextInput
          value={lastName}
          style={styles.inputStyle}
          onChangeText={(text) => setLastName(text)}
        />

        <PrimaryButton
          title="Save"
          onPress={ handleSaveContact}
          style={{
            width: wp(40),
            height: wp(11),
            alignSelf: 'center',
            marginTop: hp(35),
            marginBottom: hp(18),
          }}
        />


      </View>
    </BottomSheetModal>
      

    <BottomSheetModal visible={showEmailModal} onClose={() => setShowEmailModal(false)}>
      <View
        style={{
          width: wp(13),
          height: 5,
          backgroundColor: '#000000',
          marginTop: 2,
          marginBottom: hp(2),
          borderRadius:12,
          alignSelf: 'center',
        }}
      />
      <View style={{ marginLeft:wp(1),marginTop: hp(3) }}>
        
        <View style={{  flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',  paddingHorizontal: wp(1), 
          marginBottom: hp(3),marginTop:hp(1) }}>

            <Text style={{ fontSize: wp(6), fontWeight: '700',marginBottom: hp(3) }}>
              Update Email
            </Text>
            <Image source={require('../assets/icons/vector.png')} style={styles.vector} />
        </View>

        <Text style={[styles.text18,{marginLeft:wp(2),marginTop:hp(4)}]}>Email Address</Text>

        <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.inputStyle, !isOtpVerified && styles.disabledInput]}
            // editable={isOtpVerified} // <--- disables editing until OTP is verified
        />

        <Text style={{marginLeft:wp(2),marginTop:hp(5),fontSize:wp(3.2),color:'#666666',fontWeight:700}}>
          Please Note
        </Text>

        <Text style={{marginLeft:wp(2),marginTop:hp(0.5),fontSize:wp(3.2),color:'#666666',fontWeight:700}}>
          You will get an OTP on the email mentioned above to for verification
        </Text>


        <PrimaryButton
          title="Get OTP"
          onPress={() => navigation.getParent()?.navigate('UpdateEmailOtp', {
            email: email.trim(), // trim to avoid trailing space issue
            name: fullName,
            age: '22',
            sex: gender,
          })}
          style={{
            width: wp(30),
            height: wp(11),
            alignSelf: 'center',
            marginTop: hp(32),
            marginBottom: hp(18),
          }}
        />
      </View>
    </BottomSheetModal>
      


      <CustomOptionPickerModal
        visible={showGenderPicker}
        // title="Choose Category"
        options={['Male', 'Female']}
        onClose={() => setShowGenderPicker(false)}
        onSelect={setGender} selected={''}     
      />

      
    </ScrollView>

    


  );
};

const styles = StyleSheet.create({
  text18:{
    fontSize:wp(4.5),
    color:'#2D2D2D',
    fontWeight:'500',
  },
  disabledInput: {
    backgroundColor: '#f2f2f2',
    color: '#999',
  },

  Card: {
        backgroundColor: '#FFFFFF',
        width: wp(88),
        height: wp(21),
        alignSelf: 'center',
        marginBottom:wp(2),
        marginTop:wp(2),
        borderRadius: wp(2.5),
        borderColor:'#2D2D2D',
        borderWidth:wp(0.1),
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 8,
    },
  name: { 
    fontSize: wp(4), 
    width: wp(45),
    fontWeight: '500',
    color: '#2D2D2D',
    
  },
  lightTxt: { 
    fontSize: wp(3.2), 
    fontWeight: '400',
    color: '#666666'
  },
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  profileImage: {
    width: wp(37),
    height: wp(37),
    borderRadius: wp(20),
    marginTop: wp(6),
    marginBottom: hp(1),
    backgroundColor:"#666"
  },
  userName: {
    fontSize: wp(8),
    fontWeight: '700',
    color: '#2D2D2D',
  },
  createdDate: {
    fontSize: wp(4),
    color: '#666666',
    fontWeight:400,
    marginBottom: hp(5),
  },
  card: {
    backgroundColor: '#FFFFFF',
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: wp(4),
  },
  optionText: {
    fontSize: wp(4.5),
    fontWeight:500,
    color: '#2D2D2D',
  },
  logoutButton: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(10),
    borderRadius: wp(2.5),
    marginTop: hp(5),
  },
  logoutText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
  },
  appVersion: {
    fontSize: wp(2.5),
    color: '#666666',
    marginTop:hp(2),
    fontWeight:400
  },
  title:{
    color:'#2D2D2D',
    fontSize:wp(6),
  },
  inputStyle : {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: wp(3),
      width:wp(88),
      paddingVertical: hp(1.5),
      fontSize: wp(4),
      backgroundColor: '#fff',
      marginTop:hp(1),
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
  },

  vector:{
    width:wp(5),
    height:wp(1),
  },
  bottomContainer:{  
    alignItems: 'center', 
    paddingHorizontal: wp(5), 
    marginBottom: hp(2) 
  },

});


export default ProfileScreen;
