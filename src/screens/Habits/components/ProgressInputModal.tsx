// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, StyleSheet } from 'react-native';
// import BottomSheetModal from '@/components/BottomSheetModal';
// import PrimaryButton from '@/components/PrimaryButton';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Habit } from '@/types/habit';
// import api from '@/services/api';

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   habit: Habit | null;
//   onSubmitSuccess: () => void;
// };

// const ProgressInputModal = ({ visible, onClose, habit, onSubmitSuccess }: Props) => {
//   const [note, setNote] = useState('');

//   useEffect(() => {
//     if (visible) setNote('');
//   }, [visible]);

//   const submitProgress = async () => {
//     if (!habit) return;

//     try {
//       const formData = new FormData();
      
//       formData.append('habit_id', habit.id);
//       formData.append('title', habit.title);
//       formData.append('description', note || '.');
//       formData.append('status', (!habit.completed).toString());

//       await api.post('/userhabitprogressreports', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       onSubmitSuccess();
//       onClose();

//     } catch (error) {
//       console.error('Progress submission error:', error);
//     }
//   };

//   return (
//     <BottomSheetModal visible={visible} onClose={onClose}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Add Progress for {habit?.title}</Text>

//         <TextInput
//           placeholder="Enter your progress..."
//           value={note}
//           onChangeText={setNote}
//           multiline
//           style={styles.input}
//         />

//         <PrimaryButton
//           title="Submit Progress"
//           onPress={submitProgress}
//           style={styles.button}
//         />
//       </View>
//     </BottomSheetModal>
//   );
// };

// export default ProgressInputModal;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: wp(5),
//     fontWeight: '600',
//     marginBottom: hp(2),
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: wp(3),
//     width: wp(80),
//     minHeight: hp(10),
//     textAlignVertical: 'top',
//     marginBottom: hp(2),
//   },
//   button: {
//     width: wp(50),
//     height: wp(11),
//     alignSelf: 'center',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import BottomSheetModal from '@/components/BottomSheetModal';
import PrimaryButton from '@/components/PrimaryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Habit } from '@/types/habit';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';

type Props = {
  visible: boolean;
  onClose: () => void;
  habit: Habit | null;
  onSubmitSuccess: () => void;
};

const ProgressInputModal = ({ visible, onClose, habit, onSubmitSuccess }: Props) => {
  const [note, setNote] = useState('');

  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (visible) setNote('');
  }, [visible]);

  const submitProgress = async () => {
    if (!habit) return;

    try {
      const formData = new FormData();
      formData.append('habit_id', habit.id);
      formData.append('title', habit.title);
      formData.append('description', note.trim() || '.');
      formData.append('status', 'true'); // always submitting progress as complete
      formData.append('tracked_date', new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })); // Format as YYYY-MM-DD


      await api.post('/userhabitprogressreports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // ✅ Add token here
        },
      });

      await api.post('/userhabitreports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

      onSubmitSuccess();
      onClose();

    } catch (error) {
      console.error('Progress submission error:', error);
    }
  };

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Progress for {habit?.title}</Text>

        <TextInput
          placeholder="Enter your progress..."
          value={note}
          onChangeText={setNote}
          multiline
          style={styles.input}
        />

        <PrimaryButton
          title="Submit Progress"
          onPress={submitProgress}
          style={styles.button}
        />
      </View>
    </BottomSheetModal>
  );
};

export default ProgressInputModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    fontWeight: '600',
    marginBottom: hp(2),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: wp(3),
    width: wp(80),
    minHeight: hp(10),
    textAlignVertical: 'top',
    marginBottom: hp(2),
  },
  button: {
    width: wp(50),
    height: wp(11),
    alignSelf: 'center',
  },
});
