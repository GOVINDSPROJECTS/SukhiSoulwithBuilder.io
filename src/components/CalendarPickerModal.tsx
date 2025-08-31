import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  const [isPickerVisible, setPickerVisible] = useState(false);

  React.useEffect(() => {
    if (visible) {
      setPickerVisible(true);
    } else {
      setPickerVisible(false);
    }
  }, [visible]);

  const handleConfirm = (selectedDate: Date) => {
    setPickerVisible(false);
    setDate(selectedDate);
    onSelectDate(selectedDate);
    onClose();
  };

  const handleCancel = () => {
    setPickerVisible(false);
    onClose();
  };

  return (
    <DateTimePickerModal
      isVisible={isPickerVisible}
      mode="date"
      date={date}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

export default CalendarPickerModal;
