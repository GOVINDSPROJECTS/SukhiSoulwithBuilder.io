import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  PanResponder,
  LayoutChangeEvent,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import GradientWrapper from '../../components/GradientWrapper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HabitsList from '../Habits/components/HabitsList';
import { Habit } from '@/types/habit';
import api from '@/services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HabitsStackParamList } from '@/types/navigation';
import ProgressInputModal from '../Habits/components/ProgressInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/authStore';
import Notification from '@/components/Notification';

export default function HomeScreen({ goToHabits, goToInsync }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [moodValue, setMoodValue] = useState(0.5);
  const [activeTab, setActiveTab] = useState('Mood');
  const scrollViewRef = useRef<ScrollView>(null);
  const moodRef = useRef(null);
  const activityRef = useRef(null);
  const habitsRef = useRef(null);
  const educateRef = useRef(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});
  const progressMapRef = useRef<Record<string, any>>({});
  const togglingHabits = useRef<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const navigation = useRef<NativeStackNavigationProp<HabitsStackParamList>>();

  // ---------------- Fetch Posts ----------------
  useEffect(() => {
    fetchPosts();
    fetchHabits();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return Alert.alert('Error', 'Token missing.');

      const res = await api.get('/posts', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      console.log('Fetched posts:', res.data);
      if (res.data.message) {
        const formatted = res.data.posts.map((item: any) => ({
          id: String(item.id),
          title: item.title,
          caption: item.caption,
          user_id: item.user_id || '@sukhisoul',
          image: item.image || null,
        }));
        setPosts(formatted);
        console.log('Success Fetched posts:', res.data.posts);
      }
    } catch (err: any) {
      console.error('Error fetching posts:', err.message);
      Alert.alert('Error', 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Fetch Habits ----------------
  const fetchHabits = async () => {
    try {
      const [habitRes, progressRes] = await Promise.all([
        api.get('/userhabits'),
        api.get('/userhabitreports'),
      ]);
      const rawHabits = habitRes.data.habits;
      const progressReports = progressRes.data.habitreport || [];
      const latestProgressMap: Record<string, any> = {};

      progressReports.forEach((report: any) => {
        const habitId = report.habit_id.toString();
        if (!latestProgressMap[habitId] || new Date(report.updated_at) > new Date(latestProgressMap[habitId].updated_at)) {
          latestProgressMap[habitId] = report;
        }
      });

      progressMapRef.current = latestProgressMap;
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

      const formattedHabits: Habit[] = rawHabits.map((habit: any) => {
        const habitId = habit.id.toString();
        const progress = latestProgressMap[habitId];
        const isToday = progress?.tracked_date === today;
        const completed = progress?.status === 'true' && isToday;

        return {
          id: habitId,
          title: habit.habit_name,
          completed,
          progress_status: habit.habit_progress_status === 'true',
        };
      });

      setHabits(formattedHabits);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  // ---------------- Toggle Habit ----------------
  const toggleHabitCompletion = async (id: string) => {
    if (togglingHabits.current.has(id)) return;
    togglingHabits.current.add(id);

    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const token = await AsyncStorage.getItem('token');
    const isCurrentlyCompleted = habit.completed;
    const newStatus = !isCurrentlyCompleted;
    const todayDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

    try {
      // Check if already submitted
      const alreadySubmittedRes = await api.get(`/habitalreadysubmitted/${habit.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const alreadySubmitted = alreadySubmittedRes.data.already_submitted;

      if (alreadySubmitted && isCurrentlyCompleted) {
        const existingProgress = progressMapRef.current?.[habit.id];
        if (existingProgress) {
          await api.delete(`/userhabitreports/${existingProgress.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setHabits(prev => prev.map(h => (h.id === id ? { ...h, completed: false } : h)));
        }
        togglingHabits.current.delete(id);
        return;
      }

      // If modal required
      if (habit.progress_status && !isCurrentlyCompleted) {
        setSelectedHabit(habit);
        setShowProgressModal(true);
        togglingHabits.current.delete(id);
        return;
      }

      // Submit progress
      const formData = new FormData();
      formData.append('habit_id', habit.id);
      formData.append('status', newStatus.toString());
      formData.append('tracked_date', todayDate);
      formData.append('description', '.');

      await api.post('/userhabitreports', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      setHabits(prev => prev.map(h => (h.id === id ? { ...h, completed: newStatus } : h)));
    } catch (error) {
      console.error('Toggle Error:', error);
      Alert.alert('Error', 'Unable to update habit');
    } finally {
      togglingHabits.current.delete(id);
    }
  };

  // ---------------- Mood Slider ----------------
  const [sliderLeft, setSliderLeft] = useState(0);
  const panResponder = useRef( PanResponder.create({ onStartShouldSetPanResponder: () => true, onPanResponderMove: (evt, gestureState) => { const x = gestureState.moveX - sliderLeft; let value = x / 270;  value = Math.max(0, Math.min(1, value)); setMoodValue(value);  }, onPanResponderRelease: (evt, gestureState) => { const x = gestureState.moveX - sliderLeft; let value = x / 270; value = Math.max(0, Math.min(1, value)); setMoodValue(value); (value);  handleMoodSubmit(value);}, }) ).current;

  const handleMoodSubmit = async (value: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const moodInt = Math.round(value * 10);
      const res = await api.post('/moods', { mood_value: moodInt }, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
      if (res.data.success) Alert.alert('Mood Saved', res.data.message);
    } catch (err) {
      console.error('Error saving mood:', err);
    }
  };

  // ---------------- Scroll / Tabs ----------------
  const handleLayout = (name: string, e: LayoutChangeEvent) => { sectionPositions.current[name] = e.nativeEvent.layout.y; };
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y + 100;
    const keys = Object.keys(sectionPositions.current);
    for (let i = keys.length - 1; i >= 0; i--) {
      if (scrollY >= sectionPositions.current[keys[i]]) { setActiveTab(keys[i]); break; }
    }
  };

  return (
    
    <GradientWrapper>
      <Notification/>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: wp(4) }}>
        {['Mood', 'Habits', 'Activity', 'Educate'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => {
            const y = sectionPositions.current[tab];
            if (y !== undefined && scrollViewRef.current) scrollViewRef.current.scrollTo({ y, animated: true });
            setActiveTab(tab);
          }} style={{ paddingHorizontal: wp(3), paddingVertical: wp(1), borderRadius: wp(4), marginHorizontal: wp(1.2), backgroundColor: activeTab === tab ? '#245C73' : 'transparent' }}>
            <Text style={{ color: activeTab === tab ? '#fff' : '#1B3C3E', fontSize: wp(3.5), fontWeight: '500' }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16} style={styles.container} showsVerticalScrollIndicator={false} >

        {/* Mood */}
        <View ref={moodRef} onLayout={(e) => handleLayout('Mood', e)} style={[styles.section, { width: wp(53), height: wp(34) }]}>
          <Text style={[styles.heading, { fontSize: wp(8.5) }]}>How are you{'\n'}feeling{'\n'}today?</Text>
        </View>

        {/* Mood Slider Card */} 
        <View style={[styles.moodCardSlider, { width: wp(89), height: wp(34), alignSelf: 'center' }]}>
          <Text style={[styles.moodCardTitle, { fontSize: wp(5), fontWeight: '600', color: '#2d4c5a', marginBottom: wp(2.5) }]}>
            Take a moment to check in
          </Text> {/* Labels Row */} 
          <View style={{ flexDirection: 'row', width: wp(68), alignSelf: 'center', justifyContent: 'space-between', marginBottom: wp(0) }}>
            <Text style={styles.sliderLabel}>Dukhi</Text>
            <Text style={styles.sliderLabel}>Sukhi</Text>
          </View>
          <View style={[styles.sliderTrack, { backgroundColor: 'transparent', height: 32, width: wp(68), alignSelf: 'center', marginTop: 0 }]} onLayout={e => setSliderLeft(e.nativeEvent.layout.x)} >
            <LinearGradient colors={['#4594A5', '#FCF7B4']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ position: 'absolute', width: wp(68), height: wp(4), borderRadius: wp(2), left: wp(0), top: wp(2), }} />
          <View style={[styles.sliderThumb, { left: moodValue * (270 - 28), top: wp(0.5) },]} {...panResponder.panHandlers} /> 
          </View> 
          <Text style={styles.sliderHint}>
            Drag to reflect your mood.
            </Text>
        </View> {/* <MoodSliderCard /> */}


        {/* Habits */}
        <View ref={habitsRef} onLayout={(e) => handleLayout('Habits', e)} />
        <HabitsList title="Today's Habits" habits={habits} onToggle={toggleHabitCompletion} onAllHabitPress={goToHabits} maxItemsToShow={5} />

        {/* Activities */}
        <View ref={activityRef} onLayout={(e) => handleLayout('Activity', e)} style={[styles.card, { width: wp(89), alignSelf: 'center', padding: 0, height: wp(28), backgroundColor: '#fff' }]}>
          <View style={{ padding: wp(4.5), flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={[styles.cardTitle, { fontSize: wp(8), color: '#3D88A7' }]}>Connections</Text>
            <TouchableOpacity style={[styles.allHabitsBtn]} onPress={goToInsync}>
              <Text style={[styles.allHabitsText, { color: '#666666' }]}>Explore Activities</Text>
              <Icon name="chevron-right" size={18} color="#2D2D2D" style={{ marginTop: wp(1) }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Discover / Posts */}
        <View ref={educateRef} onLayout={(e) => handleLayout('Educate', e)} style={styles.section}>
          <Text style={[styles.heading, { fontSize: wp(12) }]}>Discover</Text>
          <Text style={{ fontSize: wp(4), color: '#000', marginBottom: wp(6) }}>Mindful Reads</Text>

          {posts.map(item => (
            <View key={item.id} style={{ marginBottom: wp(8) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: wp(2), marginLeft: wp(1) }}>
                <View style={{ width: wp(4), height: wp(4), borderRadius: wp(2), backgroundColor: '#B6E388', marginRight: 6 }} />
                <Text style={{ fontWeight: '600', color: '#222', fontSize: wp(3.2) }}>@sukhisoul</Text>
              </View>

              {item.image ? (
                <Image
                  source={{ uri: `http://3.6.142.117/postimages/${item.image}` }}
                  style={styles.postImage}
                  resizeMode="cover"
                />

              ) : (
                <View style={styles.textPostCard}>
                  <Text style={{ color: '#222', fontWeight: '600', fontSize: wp(4) }}>{item.caption}</Text>
                </View>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(2.5), paddingHorizontal: wp(2.5) }}>
                <Text style={{ color: '#252525', fontSize: wp(3), marginLeft: wp(4.5) }}>{item.caption}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginRight: wp(4) }}><Icon name="heart" size={22} color="#222" /></TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 16 }}><Icon name="bookmark" size={22} color="#222" /></TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Progress Modal */}
        <ProgressInputModal
          visible={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          habit={selectedHabit}
          onSubmitSuccess={() => {
            if (!selectedHabit) return;
            setHabits(prev => prev.map(h => (h.id === selectedHabit.id ? { ...h, completed: !h.completed } : h)));
            fetchHabits();
            setSelectedHabit(null);
          }}
        />
      </ScrollView>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: wp(4) },
  heading: { fontWeight: '600', marginBottom: wp(2.5), color: '#2D2D2D' },
  moodCardSlider: { backgroundColor: '#FFFFFFCC', borderRadius: wp(6), padding: wp(4.5), marginBottom: wp(6), alignItems: 'center', shadowColor: '#b0c4d4', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  moodCardTitle: { fontSize: wp(5), fontWeight: '600', color: '#2d4c5a', marginBottom: wp(2.5) },
  sliderLabel: { fontSize: wp(3), color: '#2d4c5a', width: wp(12), textAlign: 'center', fontWeight: '500' },
  sliderTrack: { flex: 1, height: wp(8), justifyContent: 'center', alignItems: 'center', marginHorizontal: 6, position: 'relative' },
  sliderThumb: { position: 'absolute', width: wp(6), height: wp(6), borderRadius: wp(3.2), backgroundColor: '#DCEFf2', borderWidth: wp(0.5), borderColor: '#fff', top: -4, shadowColor: '#b0c4d4', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4, elevation: 2 },
  sliderHint: { fontSize: wp(2.5), color: '#245C73', marginTop: wp(2.5), textAlign: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: wp(4.5), padding: wp(4.5), marginBottom: wp(5), shadowColor: '#245C73', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2, overflow: 'hidden' },
  cardTitle: { fontSize: wp(8), fontWeight: '700', color: '#3D88A7', marginBottom: wp(4.5) },
  allHabitsBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: wp(1.3) },
  allHabitsText: { color: '#666666', fontWeight: '500', fontSize: wp(4), marginRight: 2, marginTop: 2 },
  postImage: { width: wp(84), height: wp(110), borderRadius: wp(6) },
  textPostCard: { borderRadius: wp(4.5), padding: wp(4.5), minHeight: wp(20), justifyContent: 'center' },
  section: { marginBottom: wp(5) },
});
