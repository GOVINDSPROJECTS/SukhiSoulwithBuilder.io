// src/components/CustomOptionPickerModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
  options: string[];
  selected: string;
  onClose: () => void;
  onSelect: (value: string) => void;
};

const CustomOptionPickerModal: React.FC<Props> = ({
  visible,
  options,
  selected,
  onClose,
  onSelect,
}) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Choose Option</Text>
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                item === selected && styles.selectedOption,
              ]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={item === selected ? styles.selectedText : styles.optionText}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default CustomOptionPickerModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#e6f0f8',
  },
  selectedText: {
    color: '#104256',
    fontWeight: '600',
  },
});
