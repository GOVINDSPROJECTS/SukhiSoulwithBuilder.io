// src/components/CalendarPickerModal.tsx
import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate?: Date;
}

const CalendarPickerModal: React.FC<Props> = ({ visible, onClose, onSelectDate, initialDate }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(initialDate || new Date());

  const handleConfirm = () => {
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="inline"
            onChange={(_, date) => {
              if (date) setSelectedDate(date);
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarPickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('5%'),
    width: wp('80%'),
    alignItems: 'center',
    elevation: 10,
  },
  button: {
    backgroundColor: '#104256',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 6,
    marginTop: hp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  cancel: {
    color: '#999',
    marginTop: hp('1.5%'),
    fontSize: wp('3.5%'),
  },
});
