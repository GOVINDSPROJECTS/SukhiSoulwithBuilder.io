import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const generateNumbers = (count: number, pad = true) => {
  return Array.from({ length: count }, (_, i) => (pad && i < 10 ? `0${i}` : `${i}`));
};

const hours = generateNumbers(12, true); // 01 to 12
const minutes = generateNumbers(60, true); // 00 to 59
const meridiem = ['AM', 'PM'];

type Props = {
  visible: boolean;
  onClose: () => void;
  onTimeSelect: (time: Date) => void; // ⬅️ update this line
  initialTime?: string; // e.g. '02:30 PM'
};

const TimePickerModal = ({ visible, onClose, onTimeSelect, initialTime = '12:00 PM' }: Props) => {
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedMeridiem, setSelectedMeridiem] = useState('AM');

 const confirmTime = () => {
  const timeString = `${selectedHour}:${selectedMinute} ${selectedMeridiem}`;
  
  // Convert string to Date object
  const now = new Date();
  const [hour, minute] = [parseInt(selectedHour), parseInt(selectedMinute)];
  const isPM = selectedMeridiem === 'PM';

  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    isPM ? (hour % 12) + 12 : hour % 12,
    minute
  );

  onTimeSelect(date); // ✅ Pass correct Date type
  onClose();
};


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Time</Text>
          <View style={styles.pickerRow}>
            {[hours, minutes, meridiem].map((list, idx) => (
              <ScrollView
                key={idx}
                style={styles.scrollColumn}
                contentContainerStyle={{ alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
              >
                {list.map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={styles.option}
                    onPress={() => {
                      if (idx === 0) setSelectedHour(val);
                      else if (idx === 1) setSelectedMinute(val);
                      else setSelectedMeridiem(val);
                    }}
                  >
                    <Text
                      style={
                        (idx === 0 && val === selectedHour) ||
                        (idx === 1 && val === selectedMinute) ||
                        (idx === 2 && val === selectedMeridiem)
                          ? styles.selectedText
                          : styles.text
                      }
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ))}
          </View>
          <TouchableOpacity onPress={confirmTime} style={styles.button}>
            <Text style={styles.buttonText}>Set Time</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  scrollColumn: {
    height: hp('20%'),
    width: wp('20%'),
  },
  option: {
    paddingVertical: hp('1%'),
  },
  text: {
    fontSize: wp('4.5%'),
    color: '#777',
    textAlign: 'center',
  },
  selectedText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#104256',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#104256',
    paddingVertical: hp('1.5%'),
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
  },
});
