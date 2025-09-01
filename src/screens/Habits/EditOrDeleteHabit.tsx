// src/screens/Habits/EditHabitScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimePickerModal from '@/components/TimePickerModal';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import CustomOptionPickerModal from '@/components/CustomOptionPickerModal';
import PrimaryButton from '@/components/PrimaryButton';
import { useAuthStore } from '@/store/authStore';
import SubscriptionPaymentModal from '../../components/SubscriptionPaymentModal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { HabitsStackParamList } from '@/navigation/HabitsStack';
import { AppTabsParamList } from '@/types/navigation';

const EditOrDeleteHabit = () => {
  const { params } =
    useRoute<RouteProp<HabitsStackParamList, 'EditOrDelete'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppTabsParamList>>();
  const user = useAuthStore(state => state.user);
  const { id } = params;

  const [habit_name, sethabit_name] = useState('');
  const [habit_description, sethabit_description] = useState('');
  const [habit_time, sethabit_time] = useState<Date | null>(null);
  const [habit_startdate, sethabit_startdate] = useState(new Date());
  const [habit_category, sethabit_category] = useState('');
  const [habit_frequency, sethabit_frequency] = useState('');
  const [duration, setDuration] = useState('');
  const [habit_progress_status, sethabit_progress_status] = useState(false);
  const [reminders, setReminders] = useState<Date[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showhabit_categoryPicker, setShowhabit_categoryPicker] =
    useState(false);
  const [showhabit_frequencyPicker, setShowhabit_frequencyPicker] =
    useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  const handleAddReminder = (time: Date) => {
    setReminders([...reminders, time]);
    setShowReminderPicker(false);
  };

  // 🧠 Fetch habit data
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Missing Token');
          return;
        }

        const response = await api.get(`/userhabits/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.habit;

        sethabit_name(data.habit_name);
        sethabit_description(data.habit_description);
        sethabit_time(new Date(`1970-01-01T${data.habit_time}`));
        sethabit_startdate(new Date(data.habit_startdate));
        sethabit_category(data.habit_category || '');
        sethabit_frequency(data.habit_frequency || '');
        setDuration(data.duration || '');
        sethabit_progress_status(data.habit_progress_status === 'true');
        setReminders(
          data.reminders
            ? JSON.parse(data.reminders).map(
                (t: string) => new Date(`1970-01-01T${t}`),
              )
            : [],
        );
      } catch (err) {
        console.error(err);
        Alert.alert('Error fetching habit');
      }
    };

    fetchHabit();
  }, [id]);

  // 🔄 Update habit
  const handleUpdateHabit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Missing Token');
        return;
      }

      const formData = new FormData();
      formData.append('habit_name', habit_name);
      formData.append('habit_description', habit_description);
      formData.append(
        'habit_time',
        habit_time ? habit_time.toTimeString().slice(0, 5) : '',
      );
      formData.append(
        'habit_startdate',
        habit_startdate.toISOString().split('T')[0],
      );
      formData.append('habit_category', habit_category);
      formData.append('habit_frequency', habit_frequency);
      formData.append('duration', duration);
      formData.append(
        'habit_progress_status',
        habit_progress_status ? 'true' : 'false',
      );
      formData.append(
        'reminders',
        JSON.stringify(reminders.map(r => r.toTimeString().slice(0, 5))),
      );
      formData.append('habit_status', 'inactive');

      await api.post(`/userhabits/${id}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Habit updated!');
      navigation.navigate('Habits');
    } catch (err) {
      console.error('Update failed', err);
      Alert.alert('Error', 'Could not update habit');
    }
  };

  const handleDelete = async () => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              Alert.alert('Error', 'User token not found.');
              return;
            }

            await api.delete(`/userhabits/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            Alert.alert('Success', 'Habit deleted successfully.');

            // Navigate back or to home and refresh
            navigation.navigate('Habits');
            // Or: navigation.goBack();
          } catch (error) {
            console.error('Failed to delete habit:', error);
            Alert.alert('Error', 'Failed to delete habit. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imagePlaceholder} />
      <Text style={styles.label}>{habit_name}</Text>

      <TouchableOpacity onPress={handleDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Name"
        style={[styles.input, styles.inputSized]}
        value={habit_name}
        onChangeText={sethabit_name}
      />
      <View style={styles.textAreaWrapper}>
        {!habit_description && (
          <Text style={styles.textAreaPlaceholder}>
            Why this habit? (optional)
          </Text>
        )}
        <TextInput
          style={styles.textAreaInput}
          value={habit_description}
          onChangeText={sethabit_description}
          multiline
        />
      </View>

      {/* Time Picker */}
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={[styles.input, styles.timeInput]}
      >
        <Text style={styles.timeLabel}>Time</Text>
        <View style={styles.timeValueBox}>
          <Text style={styles.timeValueText}>
            {habit_time
              ? habit_time.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '-- : -- AM'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Expand Advanced Edits */}
      <TouchableOpacity onPress={() => setShowAdvanced(!showAdvanced)}>
        <Text style={styles.advancedToggle}>
          Advance Edits {showAdvanced ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showAdvanced &&
        (user?.is_paid ? (
          <View style={styles.advancedBox}>
            {/* Category */}
            <TouchableOpacity
              onPress={() => setShowhabit_categoryPicker(true)}
              style={styles.advRow}
            >
              <Text style={styles.advLabel}>Category</Text>
              <View style={styles.advValueRow}>
                <Text style={styles.advValue}>{habit_category || 'None'}</Text>
                <Text style={styles.advArrow}>▼</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.advDivider} />

            {/* Start Date */}
            <TouchableOpacity
              onPress={() => setShowCalendar(true)}
              style={styles.advRow}
            >
              <Text style={styles.advLabel}>Start date</Text>
              <View style={styles.advValueRow}>
                <Text style={styles.advValue}>
                  {habit_startdate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={styles.advArrow}>▼</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.advDivider} />

            {/* Frequency */}
            <TouchableOpacity
              onPress={() => setShowhabit_frequencyPicker(true)}
              style={styles.advRow}
            >
              <Text style={styles.advLabel}>Frequency</Text>
              <View style={styles.advValueRow}>
                <Text style={styles.advValue}>
                  {habit_frequency || 'Daily'}
                </Text>
                <Text style={styles.advArrow}>▼</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.advDivider} />

            {/* Duration */}
            <TouchableOpacity
              onPress={() => setShowDurationPicker(true)}
              style={styles.advRow}
            >
              <Text style={styles.advLabel}>Duration</Text>
              <View style={styles.advValueRow}>
                <Text style={styles.advValue}>{duration || '30 Days'}</Text>
                <Text style={styles.advArrow}>▼</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.advDivider} />

            {/* Write Progress */}
            <View style={styles.advRow}>
              <Text style={styles.advLabel}>Write about progress.</Text>
              <Switch
                value={habit_progress_status}
                onValueChange={sethabit_progress_status}
              />
            </View>

            {/* Divider */}
            <View style={styles.advDivider} />

            {/* Reminders Collapsible */}
            <TouchableOpacity
              style={styles.advRow}
              onPress={() => setShowReminderPicker(true)}
            >
              <Text style={styles.advLabel}>Reminders</Text>
              <Text style={styles.advArrow}>▼</Text>
            </TouchableOpacity>

            {/* Reminders List  reminderList*/}
            <View style={[styles.reminderListBox]}>
              {/* <ScrollView style={{ maxHeight: 100 }} nestedScrollEnabled={true}> */}
              {reminders.length > 0 &&
                reminders.map((r, i) => (
                  <View key={i} style={styles.reminderPill}>
                    <Text style={styles.reminderPillText}>
                      {' '}
                      {r.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text style={styles.reminderPillFreq}>Everyday</Text>
                  </View>
                ))}
              {/* </ScrollView> */}
              <TouchableOpacity
                style={styles.reminderPillAdd}
                onPress={() => setShowReminderPicker(true)}
              >
                <Text style={styles.reminderPillAddText}>+ Add reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          //Add Payment Modal Here
          <SubscriptionPaymentModal />
        ))}

      {/* Create Habit Button */}
      <PrimaryButton
        title="Edit Habit"
        onPress={handleUpdateHabit}
        style={styles.editHabitBtn}
      />

      {/* Modals */}
      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onTimeSelect={sethabit_time}
      />

      <CalendarPickerModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={sethabit_startdate}
        initialDate={habit_startdate}
      />

      <CustomOptionPickerModal
        visible={showhabit_categoryPicker}
        // title="Choose Category"
        options={['Health', 'Work', 'Study', 'Personal']}
        onClose={() => setShowhabit_categoryPicker(false)}
        onSelect={sethabit_category}
        selected={''}
      />

      <CustomOptionPickerModal
        visible={showhabit_frequencyPicker}
        // title="Frequency"
        options={['Daily', 'Weekly', 'Monthly']}
        onClose={() => setShowhabit_frequencyPicker(false)}
        onSelect={sethabit_frequency}
        selected={''}
      />

      <CustomOptionPickerModal
        visible={showDurationPicker}
        // title="Duration"
        options={['7 Days', '14 Days', '30 Days', '60 Days']}
        onClose={() => setShowDurationPicker(false)}
        onSelect={setDuration}
        selected={''}
      />

      <TimePickerModal
        visible={showReminderPicker}
        onClose={() => setShowReminderPicker(false)}
        onTimeSelect={handleAddReminder}
      />
    </ScrollView>
  );
};

export default EditOrDeleteHabit;

const styles = StyleSheet.create({
  container: {
    padding: wp('4%'),
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: wp(24),
    height: wp(24),
    backgroundColor: '#ffffff', // white background for the image placeholder
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: hp('2%'),
    marginTop: hp(5),
    marginLeft: wp(2),

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Elevation for Android
    elevation: 4,
  },
  label: {
    fontSize: wp(9),
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#104256',
    marginBottom: hp(5),
    marginLeft: wp(2),
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#2D2D2D',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Elevation for Android
    elevation: 4,
  },

  //Why this habit?
  textAreaWrapper: {
    position: 'relative',
    width: wp(80),
    height: hp(12),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: wp(1.5),
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Elevation for Android
    elevation: 4,
  },
  textAreaPlaceholder: {
    position: 'absolute',
    top: wp(4),
    left: wp(4),
    color: '#888',
    fontSize: wp(3.5),
  },
  textAreaInput: {
    flex: 1,
    textAlignVertical: 'top', // Ensures text starts from top
    fontSize: wp(4),
  },

  //Expand Advanced Edits
  advancedToggle: {
    color: '#666666',
    fontSize: wp('4%'),
    marginVertical: hp('2.5%'),
    textAlign: 'center',
  },
  advancedBox: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: hp('2%'),
  },
  dropdown: {
    padding: wp('3%'),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: hp('1.5%'),
    backgroundColor: '#ffffff',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  reminderTitle: {
    fontSize: wp(4),
    fontWeight: '600',
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
  },
  reminderTime: {
    marginBottom: hp('0.5%'),
  },

  createBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 10,
    width: wp(40),
    height: wp(11),
    backgroundColor: '#104256',
  },
  createBtnText: {
    color: '#fff',
  },
  advRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  advLabel: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#2D2D2D',
  },
  advValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advValue: {
    fontSize: wp(4),
    color: '#2D2D2D',
    marginLeft: wp('1%'),
  },
  advArrow: {
    fontSize: wp(4),
    color: '#2D2D2D',
    marginLeft: wp('1%'),
  },
  advDivider: {
    height: 1,
    backgroundColor: '#0000004D',
    marginVertical: hp('1%'),
  },
  reminderListBox: {
    marginTop: hp('1%'),
  },
  reminderPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(69, 148, 165, 0.2)',
    borderRadius: 8,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('0.5%'),
    height: wp(9),
  },
  reminderPillText: {
    fontSize: wp(3.5),
    fontWeight: '600',
    width: wp(18),
    height: wp(5),
    color: '#2D2D2D',
    backgroundColor: '#FFFFFF',
  },
  reminderPillFreq: {
    fontSize: wp(3),
    fontWeight: 400,
    color: '#2D2D2D',
    marginLeft: wp('1%'),
  },
  reminderPillAdd: {
    alignSelf: 'center',
    width: wp(70),
    height: wp(9),
    marginTop: hp('1%'),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: 'rgba(69, 148, 165, 0.2)',
    borderRadius: 8,
  },
  reminderPillAddText: {
    fontSize: wp(4),
    color: '#2D2D2D',
    fontWeight: '600',
  },
  inputSized: { width: wp(80), height: wp(12) },
  timeInput: {
    width: wp(80),
    height: wp(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  timeLabel: { color: '#888888', fontSize: wp(3.5) },
  timeValueBox: {
    backgroundColor: '#DCEEF2',
    borderRadius: 6,
    width: wp(20),
    height: wp(5.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeValueText: { color: '#104256', fontWeight: '600', fontSize: wp(4) },
  editHabitBtn: {
    width: wp(40),
    height: wp(11),
    alignSelf: 'center',
    marginBottom: hp(22),
    marginTop: wp(8),
  },
});
