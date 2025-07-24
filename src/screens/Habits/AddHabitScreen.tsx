// src/screens/Habits/AddHabitScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TimePickerModal from '@/components/TimePickerModal';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import CustomOptionPickerModal from '@/components/CustomOptionPickerModal';
import { createHabit } from '@/types/habit';
import { useNavigation } from '@react-navigation/native';
import { useHabitsStore } from '@/store/habitStore';
const AddHabitScreen = () => {

  const navigation = useNavigation();
  const [habit_name, sethabit_name] = useState('');
  const [habit_description, sethabit_description] = useState('');
  const [habit_time, sethabit_time] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [habit_category, sethabit_category] = useState('');
  const [showhabit_categoryPicker, setShowhabit_categoryPicker] = useState(false);

  const [habit_startdate, sethabit_startdate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [habit_frequency, sethabit_frequency] = useState('');
  const [showhabit_frequencyPicker, setShowhabit_frequencyPicker] = useState(false);

  const [duration, setDuration] = useState('');
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const [habit_progress_status, sethabit_progress_status] = useState(false);
  const [reminders, setReminders] = useState<Date[]>([]);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  const handleAddReminder = (time: Date) => {
    setReminders([...reminders, time]);
    setShowReminderPicker(false);
  };

const handleCreateHabit = async () => {
  try {
    if (!habit_name) return Alert.alert('habit_name is required');

    const payload = {
      habit_name,
      habit_description,
      time: habit_time ? habit_time.toTimeString().slice(0, 5) : undefined, // HH:MM
      start_date: habit_startdate.toISOString().split('T')[0], // YYYY-MM-DD
      habit_category,
      habit_frequency,
      duration,
      write_progress: habit_progress_status,
      reminders: reminders.map(r => r.toTimeString().slice(0, 5)), // ['08:00', ...]
      habit_status:"inactive",
    };

    await createHabit(payload);
    Alert.alert('Habit created successfully!');
    // await fetchHabits(); // 👈 REFRESH habits after creation
    navigation.goBack(); // Or navigate('HabitsHome')
  } catch (error: any) {
    console.error('Create habit failed:', error.response?.data || error.message);
    Alert.alert('Failed to create habit.');
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.label}>New Habit</Text>

      <TextInput
        placeholder="habit_name"
        style={styles.input}
        value={habit_name}
        onChangeText={sethabit_name}
      />
      <TextInput
        placeholder="Why this habit? (optional)"
        style={[styles.input, { height: hp('10%') }]}
        value={habit_description}
        onChangeText={sethabit_description}
        multiline
      />

      {/* Time Picker */}
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text>{habit_time ? habit_time.toLocaleTimeString() : 'Time'}</Text>
      </TouchableOpacity>

      {/* Expand Advanced Edits */}
      <TouchableOpacity onPress={() => setShowAdvanced(!showAdvanced)}>
        <Text style={styles.advancedToggle}>
          Advance Edits {showAdvanced ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showAdvanced && (
        <View style={styles.advancedBox}>
          {/* habit_category */}
          <TouchableOpacity onPress={() => setShowhabit_categoryPicker(true)} style={styles.dropdown}>
            <Text>{habit_category || 'habit_category'}</Text>
          </TouchableOpacity>

          {/* Start Date */}
          <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.dropdown}>
            <Text>{habit_startdate.toDateString()}</Text>
          </TouchableOpacity>

          {/* habit_frequency */}
          <TouchableOpacity onPress={() => setShowhabit_frequencyPicker(true)} style={styles.dropdown}>
            <Text>{habit_frequency || 'habit_frequency'}</Text>
          </TouchableOpacity>

          {/* Duration */}
          <TouchableOpacity onPress={() => setShowDurationPicker(true)} style={styles.dropdown}>
            <Text>{duration || 'Duration'}</Text>
          </TouchableOpacity>

          {/* Write Progress */}
          <View style={styles.toggleRow}>
            <Text>Write about progress</Text>
            <Switch value={habit_progress_status} onValueChange={sethabit_progress_status} />
          </View>

          {/* Reminder(s) */}
          <Text style={styles.reminderTitle}>Reminders</Text>
          {reminders.map((r, i) => (
            <Text key={i} style={styles.reminderTime}>{r.toLocaleTimeString()}</Text>
          ))}
          <TouchableOpacity style={styles.reminderBtn} onPress={() => setShowReminderPicker(true)}>
            <Text>+ Add Reminder</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.createBtn} onPress={handleCreateHabit}>
        <Text style={{ color: '#fff' }}>Create Habit</Text>
      </TouchableOpacity>

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
        // title="Choose habit_category"
        options={['Health', 'Work', 'Study', 'Personal']}
        onClose={() => setShowhabit_categoryPicker(false)}
        onSelect={sethabit_category} selected={''}      />

      <CustomOptionPickerModal
        visible={showhabit_frequencyPicker}
        // title="habit_frequency"
        options={['Daily', 'Weekly', 'Monthly']}
        onClose={() => setShowhabit_frequencyPicker(false)}
        onSelect={sethabit_frequency} selected={''}      />

      <CustomOptionPickerModal
        visible={showDurationPicker}
        // title="Duration"
        options={['7 Days', '14 Days', '30 Days', '60 Days']}
        onClose={() => setShowDurationPicker(false)}
        onSelect={setDuration} selected={''}      />

      <TimePickerModal
        visible={showReminderPicker}
        onClose={() => setShowReminderPicker(false)}
        onTimeSelect={handleAddReminder}
      />
    </ScrollView>
  );
};

export default AddHabitScreen;

const styles = StyleSheet.create({
  container: {
    padding: wp('6%'),
    backgroundColor: '#f9f9f9',
  },
  imagePlaceholder: {
    width: wp('16%'),
    height: wp('16%'),
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('6%'),
    fontWeight: '600',
    textAlign: 'center',
    color: '#104256',
    marginBottom: hp('2%'),
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  advancedToggle: {
    color: '#104256',
    fontSize: wp('4%'),
    marginVertical: hp('1%'),
    textAlign: 'center',
  },
  advancedBox: {
    backgroundColor: '#fff',
    padding: wp('4%'),
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
    backgroundColor: '#f0f0f0',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  reminderTitle: {
    fontWeight: '600',
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
  },
  reminderTime: {
    marginBottom: hp('0.5%'),
  },
  reminderBtn: {
    alignSelf: 'flex-start',
    padding: wp('2%'),
    backgroundColor: '#e8f0f5',
    borderRadius: 6,
    marginTop: hp('1%'),
  },
  createBtn: {
    marginTop: hp('3%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 10,
    backgroundColor: '#104256',
    alignItems: 'center',
  },
});

