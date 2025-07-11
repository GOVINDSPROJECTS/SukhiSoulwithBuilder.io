// src/components/CustomOptionPickerModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
  visible: boolean;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const CustomOptionPickerModal = ({ visible, options, selected, onSelect, onClose }: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Select an Option</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.optionButton, selected === item && styles.selectedOption]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomOptionPickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    elevation: 10,
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#104256',
    marginBottom: hp('2%'),
  },
  optionButton: {
    paddingVertical: hp('1.2%'),
  },
  selectedOption: {
    backgroundColor: '#e0f4ff',
    borderRadius: 8,
  },
  optionText: {
    fontSize: wp('4%'),
    color: '#333',
  },
  cancelButton: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  cancelText: {
    fontSize: wp('4%'),
    color: '#888',
  },
});
