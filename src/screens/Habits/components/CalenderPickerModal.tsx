// src/components/CalendarPickerModal.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate: Date;
};

const CalendarPickerModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectDate,
  initialDate,
}) => {
  const [date, setDate] = useState(initialDate || new Date());

  const handleConfirm = () => {
    onSelectDate(date);
    onClose();
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Pick a Start Date</Text>
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={(_, selectedDate) => setDate(selectedDate || date)}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
            <Text style={{ color: '#fff' }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarPickerModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelBtn: {
    padding: 10,
  },
  confirmBtn: {
    padding: 10,
    backgroundColor: '#104256',
    borderRadius: 6,
  },
});
