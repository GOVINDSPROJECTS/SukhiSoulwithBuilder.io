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
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TimePickerModal from '@/components/TimePickerModal';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import CustomOptionPickerModal from '@/components/CustomOptionPickerModal';

const AddHabitScreen = () => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [category, setCategory] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [frequency, setFrequency] = useState('');
  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);

  const [duration, setDuration] = useState('');
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const [writeProgress, setWriteProgress] = useState(false);
  const [reminders, setReminders] = useState<Date[]>([]);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  const handleAddReminder = (time: Date) => {
    setReminders([...reminders, time]);
    setShowReminderPicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imagePlaceholder} />
      <Text style={styles.label}>New Habit</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Why this habit? (optional)"
        style={[styles.input, { height: hp('10%') }]}
        value={reason}
        onChangeText={setReason}
        multiline
      />

      {/* Time Picker */}
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text>{selectedTime ? selectedTime.toLocaleTimeString() : 'Time'}</Text>
      </TouchableOpacity>

      {/* Expand Advanced Edits */}
      <TouchableOpacity onPress={() => setShowAdvanced(!showAdvanced)}>
        <Text style={styles.advancedToggle}>
          Advance Edits {showAdvanced ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showAdvanced && (
        <View style={styles.advancedBox}>
          {/* Category */}
          <TouchableOpacity onPress={() => setShowCategoryPicker(true)} style={styles.dropdown}>
            <Text>{category || 'Category'}</Text>
          </TouchableOpacity>

          {/* Start Date */}
          <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.dropdown}>
            <Text>{startDate.toDateString()}</Text>
          </TouchableOpacity>

          {/* Frequency */}
          <TouchableOpacity onPress={() => setShowFrequencyPicker(true)} style={styles.dropdown}>
            <Text>{frequency || 'Frequency'}</Text>
          </TouchableOpacity>

          {/* Duration */}
          <TouchableOpacity onPress={() => setShowDurationPicker(true)} style={styles.dropdown}>
            <Text>{duration || 'Duration'}</Text>
          </TouchableOpacity>

          {/* Write Progress */}
          <View style={styles.toggleRow}>
            <Text>Write about progress</Text>
            <Switch value={writeProgress} onValueChange={setWriteProgress} />
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

      <TouchableOpacity style={styles.createBtn}>
        <Text style={{ color: '#fff' }}>Create Habit</Text>
      </TouchableOpacity>

      {/* Modals */}
      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onTimeSelect={setSelectedTime}
      />

      <CalendarPickerModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={setStartDate}
        initialDate={startDate}
      />

      <CustomOptionPickerModal
        visible={showCategoryPicker}
        // title="Choose Category"
        options={['Health', 'Work', 'Study', 'Personal']}
        onClose={() => setShowCategoryPicker(false)}
        onSelect={setCategory} selected={''}      />

      <CustomOptionPickerModal
        visible={showFrequencyPicker}
        // title="Frequency"
        options={['Daily', 'Weekly', 'Monthly']}
        onClose={() => setShowFrequencyPicker(false)}
        onSelect={setFrequency} selected={''}      />

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
