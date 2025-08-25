import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, TouchableOpacity, Text } from 'react-native';
import WeeklyTracker from './components/WeeklyTracker';
import HabitsList from './components/HabitsList';
import GradientWrapper from '../../components/GradientWrapper';
import AppText from '../../components/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CoachCard from './components/CoachCard';
import InfoCard from './components/InfoCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import colors from '@/theme/colors';
import BuildHabitTogetherCard from './components/BuildHabitTogetherCard';
import PrimaryButton from '../../components/PrimaryButton';
import BottomSheetModal from '../../components/BottomSheetModal';
import api from '@/services/api';
import { Habit } from '@/types/habit';
import ProgressInputModal from './components/ProgressInputModal';
import { useAuthStore } from '@/store/authStore';
import RazorpayCheckout from 'react-native-razorpay';

const HabitsHomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showTogetherHabbit, setShowTogetherHabbit] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const progressMapRef = useRef<Record<string, any>>({});
  const [habitCompletionMap, setHabitCompletionMap] = useState<Record<string, { completed: number; total: number }>>({});

  const fetchHabits = async () => {
    try {
      console.log("📡 Fetching habits + progress reports...");
      const [habitRes, progressRes] = await Promise.all([api.get('/userhabits'), api.get('/userhabitreports')]);
      console.log("✅ Habits API:", habitRes.data);
      console.log("✅ Reports API:", progressRes.data);

      const rawHabits = habitRes.data.habits || [];
      const progressReports = progressRes.data.habitreport || [];

      if (!Array.isArray(progressReports)) {
        console.error('❌ progressReports is not an array:', progressReports);
        return;
      }

      const latestProgressMap: Record<string, any> = {};
      const completionMap: Record<string, { completed: number; total: number }> = {};
      const totalHabits = rawHabits.length;
      console.log("📊 Total habits:", totalHabits);

      progressReports.forEach((report: any) => {
        const habitId = report.habit_id.toString();
        if (!latestProgressMap[habitId] || new Date(report.updated_at) > new Date(latestProgressMap[habitId].updated_at)) {
          latestProgressMap[habitId] = report;
        }
        const day = report.tracked_date;
        if (!completionMap[day]) {
          completionMap[day] = { completed: 0, total: totalHabits };
        }
        if (report.status === 'true') {
          completionMap[day].completed += 1;
        }
      });

      console.log("📅 CompletionMap built:", completionMap);
      progressMapRef.current = latestProgressMap;
      setHabitCompletionMap(completionMap);

      const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
      const formattedHabits: Habit[] = rawHabits.map((habit: any) => {
        const habitId = habit.id.toString();
        const progress = latestProgressMap[habitId];
        const isToday = progress?.tracked_date === today;
        const completed = progress?.status === 'true' && isToday;
        return { id: habitId, title: habit.habit_name, completed, progress_status: habit.habit_progress_status === 'true' };
      });
      setHabits(formattedHabits);
    } catch (error) {
      console.error('❌ Error fetching habits or progress reports:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const checkAlreadySubmitted = async (habitId: string): Promise<boolean> => {
    try {
      const token = useAuthStore.getState().token;
      const response = await api.get(`/userhabitreportswithfrequency/${habitId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      return response.data.already_submitted === true;
    } catch (error) {
      console.error('Error checking submission:', error);
      return false;
    }
  };

  const togglingHabits = useRef<Set<string>>(new Set());

  const toggleHabitCompletion = async (id: string) => {
    if (togglingHabits.current.has(id)) return;
    togglingHabits.current.add(id);

    const habit = habits.find(h => h.id === id);
    if (!habit) {
      togglingHabits.current.delete(id);
      return;
    }

    const token = useAuthStore.getState().token;
    const isCurrentlyCompleted = habit.completed;
    const newStatus = !isCurrentlyCompleted;
    const todayDate = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

    try {
      const alreadySubmitted = await checkAlreadySubmitted(habit.id);
      if (alreadySubmitted && isCurrentlyCompleted) {
        const existingProgress = progressMapRef.current?.[habit.id];
        if (existingProgress) {
          await api.delete(`/userhabitreports/${existingProgress.id}`, { headers: { Authorization: `Bearer ${token}` } });
          setHabits(habits.map(h => (h.id === id ? { ...h, completed: false } : h)));
          fetchHabits();
        }
        togglingHabits.current.delete(id);
        return;
      }

      if (habit.progress_status && !isCurrentlyCompleted) {
        setSelectedHabit(habit);
        setShowProgressModal(true);
        togglingHabits.current.delete(id);
        return;
      }

      const formData = new FormData();
      formData.append('habit_id', habit.id);
      formData.append('status', newStatus.toString());
      formData.append('tracked_date', todayDate);
      formData.append('description', '.');

      await api.post('/userhabitreports', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      setHabits(habits.map(h => (h.id === id ? { ...h, completed: newStatus } : h)));
      fetchHabits();
    } catch (error) {
      console.error('Toggle Error:', error);
      Alert.alert('Error', 'Unable to update habit');
    } finally {
      togglingHabits.current.delete(id);
    }
  };

  const handleAddHabit = () => {
    navigation.navigate({ name: 'AddHabit' } as any);
  };

  const createOrder = async (amount: number) => {
    try {
      const response = await api.post('/create-order', { amount });
      console.log('Order Create', response.data);
      return response.data;
    } catch (error) {
      console.log('Error creating order:', error);
      throw error;
    }
  };

  const startPayment = async () => {
    const token = useAuthStore.getState().token;
    try {
      const orderData = await createOrder(1499);
      const options = {
        description: 'Personal Habit trainer',
        image: 'https://yourlogo.com/logo.png',
        currency: orderData.currency,
        key: orderData.key,
        amount: orderData.amount,
        order_id: orderData.order_id,
        name: 'Sukhisoul Wellness Hub',
        prefill: { email: 'test@example.com', contact: '9999999999', name: 'Test User' },
        theme: { color: '#F37254' },
      };

      RazorpayCheckout.open(options)
        .then(async (data) => {
          console.log('Payment Success:', data);
          await api.post('/verify-payment', {
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            amount: orderData.amount,
          },{
    headers: {
      Authorization: `Bearer ${token}`, // replace with your token
      Accept: 'application/json',
    },});
          setShowPaymentModal(true);
        })
        .catch((error) => {
          console.log('Payment Failed:', error);
          alert(`Error: ${error.description}`);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GradientWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppText variant="h2" style={[styles.header, styles.title]}>Momentum</AppText>
        <AppText variant="caption" style={styles.header}>Create habits that stick</AppText>

        <WeeklyTracker
          title="Here's how far you've come >"
          habitCompletionMap={habitCompletionMap}
          onDayPress={(date) => navigation.navigate('DayDetail', { date })}
        />

        <HabitsList
          title="Let's kick off Your routine"
          habits={habits}
          onToggle={toggleHabitCompletion}
          showAddButton
          onAddHabitPress={handleAddHabit}
          maxItemsToShow={50}
        />

        <AppText variant="h1" style={styles.text}>Building habbits don't have to be hard</AppText>
        <AppText variant="caption" style={[styles.subtext, colors.muted]}>Quick tools to support your habit journey</AppText>

        <CoachCard
          title="Not sure where to begin? Let's figure it out together "
          subtitle=""
          buttonText="Talk to a Habit Coach"
          onPress={() => setShowModal(true)}
        />

        <BottomSheetModal visible={showModal} onClose={() => setShowModal(false)}>
          <View style={{ width: wp(13), height: 5, backgroundColor: '#000000', marginTop: 2, marginBottom: hp(2), borderRadius: 12, alignSelf: 'center' }} />
          <Text style={[styles.coachModalTitle, { width: wp(70) }]}>Go Premium, Grow Faster</Text>
          <Text style={[styles.coachModalSubtitle, { width: wp(68) }]}>Want to build habits faster and smarter? Get personal guidance, accountability, and tips tailored just for you</Text>
          <Text style={[styles.text18, { marginTop: hp(8) }]}>Your coach will help turn efforts into real progress.</Text>
          <View style={styles.grayBox} />
          <PrimaryButton title="Unlock Your Coach" onPress={startPayment} style={{ width: wp(50), height: wp(11), alignSelf: 'center', marginBottom: hp(5) }} />
        </BottomSheetModal>

        <BottomSheetModal visible={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
          <View style={{ width: wp(13), height: 5, backgroundColor: '#000000', marginTop: 2, marginBottom: hp(2), borderRadius: 12, alignSelf: 'center' }} />
          <Image source={require('../../assets/icons/correct.png')} style={styles.image} />
          <View style={{ alignSelf: 'center' }}>
            <Text style={[styles.coachModalTitle, { alignSelf: 'center', width: wp(40) }]}>Payment Received</Text>
            <Text style={[styles.text18, { marginTop: hp(5) }]}>Thank you for upgrading to Premium! </Text>
            <Text style={[styles.text18, { width: wp(75), marginTop: hp(10) }]}>We’ve received your payment, and our team will reach out to you within 3 days to get you started.</Text>
            <Text style={[styles.text18, { width: wp(75), marginBottom: hp(12) }]}>We’re excited to support your habit journey!</Text>
          </View>
          <PrimaryButton title="Thank You" onPress={() => { setShowModal(false); setShowPaymentModal(false); }} style={{ width: wp(35), height: wp(11), alignSelf: 'center', marginBottom: hp(5) }} />
        </BottomSheetModal>

        <ProgressInputModal
          visible={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          habit={selectedHabit}
          onSubmitSuccess={() => {
            if (!selectedHabit) return;
            setHabits(habits.map(h => (h.id === selectedHabit.id ? { ...h, completed: !h.completed } : h)));
            setSelectedHabit(null);
            fetchHabits();
          }}
        />

        <InfoCard
          title="Understand Your Habits"
          subtitle="Learn what helps habits last."
          onPress={() => navigation.navigate('HomeScreen', { scrollToDiscover: true })}
        />

        <View style={styles.card}>
          <Text style={styles.desc}>Team up for better habits. Consistency loves company.</Text>
          <TouchableOpacity onPress={() => setShowTogetherHabbit(true)}>
            <View style={styles.ctaRow}>
              <Text style={styles.cta}>Build a Habit Together</Text>
              <Text style={styles.arrow}>{' >'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheetModal visible={showTogetherHabbit} onClose={() => setShowTogetherHabbit(false)}>
          <View>
            <View style={{ width: wp(73), height: hp(30) }}>
              <Text style={styles.heading}>Team Up to Stay On Track</Text>
              <Text style={styles.subHeading}>Create your Habit Circle, a group to start your habit journey. Track progress together, send nudges, and celebrate wins!</Text>
            </View>
            <View style={styles.grayBox} />
            <Text style={[styles.desc, { marginVertical: wp(7) }]}>Stick to habits 95% better—together</Text>
            <PrimaryButton title="Create Habit Circle" onPress={() => navigation.navigate('GetEnterCode')} style={{ width: wp(50), height: wp(11), alignSelf: "center", marginBottom: hp(7) }} />
          </View>
        </BottomSheetModal>
      </ScrollView>
    </GradientWrapper>
  );
};

export default HabitsHomeScreen;

const styles = StyleSheet.create({
  heading: { fontSize: wp(9), fontWeight: '700', marginBottom: 10, color: '#171717', marginTop: 20 },
  subHeading: { fontSize: wp(3.5), fontWeight: '500', color: 'rgba(23, 23, 23, 0.54)', marginBottom: 16 },
  card: { backgroundColor: '#f9f9f9', borderRadius: wp('3%'), padding: wp('5%'), marginVertical: hp('1%'), shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, marginHorizontal: wp('2%') },
  desc: { fontSize: wp('3.5%'), color: '#2D2D2D', marginRight: wp(2), marginBottom: hp('1%') },
  ctaRow: { flexDirection: 'row', alignItems: 'flex-end', marginLeft: wp(18), marginTop: hp('2%') },
  cta: { fontSize: wp('5%'), fontWeight: 'bold', color: '#222' },
  arrow: { fontSize: wp('5%'), fontWeight: 'bold', color: '#2D2D2D' },
  container: { paddingBottom: hp('5%'), paddingTop: hp('1%') },
  title: { fontSize: wp(12), fontWeight: 'bold', color: '#245C73', marginBottom: hp(1) },
  subtitle: { fontSize: wp(4), color: '#245C73', textAlign: 'center', marginBottom: hp(5) },
  header: { marginLeft: wp('5%'), color: '#104256' },
  subtext: { marginLeft: wp('5%'), fontSize: wp(4), marginBottom: wp(11) },
  text: { color: '#2D2D2D', marginLeft: wp('5%'), marginTop: wp(11), fontSize: wp(8) },
  modalTitle: { fontSize: wp(6), fontWeight: '600', marginBottom: hp(2), color: '#2D2D2D' },
  tipGroup: { paddingBottom: hp(3) },
  tipTitle: { fontSize: wp(4.2), fontWeight: '600', color: '#2D2D2D', marginBottom: hp(0.5) },
  tipText: { fontSize: wp(3.6), color: '#2D2D2D' },
  closeTips: { width: wp(5), height: hp(5), alignSelf: "flex-end" },
  coachModalTitle: { fontSize: wp(9), fontWeight: '700', marginBottom: hp(2), marginTop: hp(2), color: '#2D2D2D' },
  coachModalSubtitle: { fontSize: wp(3.5), color: 'rgba(0, 0, 0, 0.54)', fontWeight: '500' },
  text18: { fontSize: wp(4.5), color: '#2D2D2D', marginBottom: hp(1), fontWeight: '500' },
  grayBox: { marginLeft: wp(6), marginRight: wp(6), width: wp(82), height: wp(62), backgroundColor: '#686868', marginBottom: wp(10), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, borderRadius: wp(2.5), marginTop: hp(2), elevation: 5 },
  image: { width: wp(13), height: wp(13), marginTop: hp(5), alignSelf
: 'center',
    resizeMode: 'contain',
  },
});