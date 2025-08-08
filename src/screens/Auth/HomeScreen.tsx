import React, { useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  // Dimensions,
  PanResponder,
  LayoutChangeEvent,
  Alert,
} from 'react-native';  
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import GradientWrapper from '../../components/GradientWrapper';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/types/navigation';
import HabitsList from '../Habits/components/HabitsList';
import { Habit } from '@/types/habit';
import api from '@/services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HabitsStackParamList } from '@/types/navigation';
// import MoodSliderCard from '@/components/MoodSliderCard';
import { useAuthStore } from '@/store/authStore';
import ProgressInputModal from '../Habits/components/ProgressInputModal';
// import AddHabitScreen from '../Habits/AddHabitScreen';

// const { width } = Dimensions.get('window');

// Sample data for habits, tasks.
// const habits = ['Cold Showers', 'Exercise', 'Meditation'];
// const tasks = ['Drink Water', 'Read 10 pages', 'No Social Media'];
const discoverPosts = [
  {
    id: '1',
    title: 'Go Natural',
    author: '@sukhisoul',
    image: require('../../assets/images/nature.png'),
  },
  {
    id: '2',
    title: 'Be Like Water',
    author: '@sukhisoul',
    image: require('../../assets/images/water.png'),
  },
];



export default function HomeScreen() {
  const route = useRoute<any>();
  const [moodValue, setMoodValue] = useState(0.5);
  const [habits, setHabits] = useState<Habit[]>([]);

    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
    const [showProgressModal, setShowProgressModal] = useState(false);

  const [sliderLeft, setSliderLeft] = useState(0);

    const navigation = useNavigation<NativeStackNavigationProp<HabitsStackParamList>>();
      const progressMapRef = useRef<Record<string, any>>({}); // 👈 Add this at the top (before useEffect)
    
  
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // For the slider, we use a custom implementation or a library like @react-native-community/slider.
  // const SLIDER_WIDTH = width - 64;
  // const THUMB_SIZE = 28;

  // const handleSliderPress = (evt: any) => {
  //   const x = evt.nativeEvent.locationX;
  //   let value = x / SLIDER_WIDTH;
  //   value = Math.max(0, Math.min(1, value));
  //   setMoodValue(value);
  // };

  // PanResponder for smooth slider
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const x = gestureState.moveX - sliderLeft;
        let value = x / 270; // 270 is slider width
        value = Math.max(0, Math.min(1, value));
        setMoodValue(value);
      },
    })
  ).current;

    //For navigation highlighting
    const scrollViewRef = useRef<ScrollView>(null);


    const moodRef = useRef(null);
    const activityRef = useRef(null);
    // const habitsRef = useRef(null);
    const educateRef = useRef(null);


    const sectionPositions = useRef<{ [key: string]: number }>({}); 

    const [activeTab, setActiveTab] = useState('Mood');

    const handleLayout = (name: string, event: LayoutChangeEvent) => {
      sectionPositions.current[name] = event.nativeEvent.layout.y;
    };

    const handleScroll = (event: any) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      const threshold = 100;

      const entries = Object.entries(sectionPositions.current);
      let activeKey: string | null = null;

      for (let i = entries.length - 1; i >= 0; i--) {
        const [key, y] = entries[i];
        if (scrollY + threshold >= y) {
          activeKey = key;
          break;
        }
      }

      if (activeKey && activeKey !== activeTab) {
        setActiveTab(activeKey);
      }
    };
    useEffect(() => {
      if (route.params?.scrollToDiscover && scrollViewRef.current && sectionPositions.current['Educate']) {
        scrollViewRef.current.scrollTo({
          y: sectionPositions.current['Educate'],
          animated: true,
        });
      }
    }, [route.params]);

    
const fetchHabits = async () => {
  try {
    const [habitRes, progressRes] = await Promise.all([
      api.get('/userhabits'),
      api.get('/userhabitreports'),
    ]);

    const rawHabits = habitRes.data.habits;
    const progressReports = progressRes.data.habitreport;

    if (!Array.isArray(progressReports)) {
      console.error("progressReports is not an array:", progressReports);
      return;
    }

    const latestProgressMap: Record<string, any> = {};

    progressReports.forEach((report: any) => {
      const habitId = report.habit_id.toString();

      if (
        !latestProgressMap[habitId] ||
        new Date(report.updated_at) > new Date(latestProgressMap[habitId].updated_at)
      ) {
        latestProgressMap[habitId] = report;
      }
    });

    progressMapRef.current = latestProgressMap;

    const today = new Date().toISOString().split('T')[0];

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
    console.error('Error fetching habits or progress reports:', error);
  }
};


  useEffect(() => {
    fetchHabits();
  }, []);

    const checkAlreadySubmitted = async (habitId: string): Promise<boolean> => {
    try {
      const token = useAuthStore.getState().token;
      const response = await api.get(`/userhabitreportswithfrequency/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      return response.data.already_submitted === true;
    } catch (error) {
      console.error('Error checking submission:', error);
      return false; // fallback to allow
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
const fetchHabits = async () => {
  try {
    const [habitRes, progressRes] = await Promise.all([
      api.get('/userhabits'),
      api.get('/userhabitreports'),
    ]);

    const rawHabits = habitRes.data.habits;
    const progressReports = progressRes.data.habitreport;

    if (!Array.isArray(progressReports)) {
      console.error("progressReports is not an array:", progressReports);
      return;
    }

    const latestProgressMap: Record<string, any> = {};

    progressReports.forEach((report: any) => {
      const habitId = report.habit_id.toString();

      if (
        !latestProgressMap[habitId] ||
        new Date(report.updated_at) > new Date(latestProgressMap[habitId].updated_at)
      ) {
        latestProgressMap[habitId] = report;
      }
    });

    progressMapRef.current = latestProgressMap;

    const today = new Date().toISOString().split('T')[0];

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
    console.error('Error fetching habits or progress reports:', error);
  }
};
  const token = useAuthStore.getState().token;
  const isCurrentlyCompleted = habit.completed;
  const newStatus = !isCurrentlyCompleted;
  const todayDate = new Date().toISOString().split('T')[0];

  try {
    const alreadySubmitted = await checkAlreadySubmitted(habit.id);

    // ✅ If already submitted —> DELETE and toggle off
    if (alreadySubmitted && isCurrentlyCompleted) {
      const existingProgress = progressMapRef.current?.[habit.id];
      if (existingProgress) {
        await api.delete(`/userhabitreports/${existingProgress.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update UI
        const updated = habits.map(h =>
          h.id === id ? { ...h, completed: false } : h
        );
        setHabits(updated);
        fetchHabits();
      }

      togglingHabits.current.delete(id);
      return;
    }
// Alert.alert('Progress Status', habit.progress_status?.toString() ?? 'undefined');

    // ✅ If modal is required and not yet completed → open modal
    if (habit.progress_status && !isCurrentlyCompleted) {
  setSelectedHabit(habit);
  setShowProgressModal(true);
  togglingHabits.current.delete(id);
  return;
}

    // ✅ Otherwise, directly submit progress for today
    const formData = new FormData();
    formData.append('habit_id', habit.id);
    formData.append('status', newStatus.toString());
    formData.append('tracked_date', todayDate);
    formData.append('description', '.'); // Default note if no modal

    await api.post('/userhabitreports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    const updated = habits.map(h =>
      h.id === id ? { ...h, completed: newStatus } : h
    );
    setHabits(updated);
    fetchHabits();
  } catch (error) {
    console.error('Toggle Error:', error);
    Alert.alert('Error', 'Unable to update habit');
  } finally {
    togglingHabits.current.delete(id);
  }
};


  const handleAllHabit = () => {
    // 🚧 To be implemented later
    // Alert.alert('hittingggg')
    navigation.navigate("HabitsHome"); // 🔁 Navigates to AddHabitScreen
    // navigation.navigate({ name: 'HabitsHome' } as any); // 🔁 Navigates to AddHabitScreen

    // console.log('Add Habit Pressed');
  };


  return (
    <GradientWrapper>
<View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16 , marginHorizontal:5, marginTop:0}}>
  {['Mood','Habits','Activity', 'Educate'].map((tab) => (
    <TouchableOpacity
      key={tab}
      onPress={() => {
        const y = sectionPositions.current[tab];
        if (y !== undefined && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
        setActiveTab(tab);
      }}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        marginHorizontal: 6,
        backgroundColor: activeTab === tab ? '#245C73' : 'transparent',
      }}
    >
      <Text
        style={{
          color: activeTab === tab ? '#fff' : '#1B3C3E',
          fontSize: 14,
          fontWeight: '500',
        }}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

      {/* Mood */}
      <View
          ref={moodRef}
          onLayout={(e) => handleLayout('Mood', e)}
          style={[styles.section, { width: 209, height: 140 }]}
      >
        <Text style={[styles.heading, {fontSize: 36}]}>How are you{'\n'}feeling{'\n'}today?</Text>
      </View>

                  {/* Mood Slider Card */}
        <View style={[styles.moodCardSlider, { width: 354, height: 136, alignSelf: 'center' }]}>
                  <Text style={[styles.moodCardTitle, { fontSize: 20, fontWeight: '600', color: '#2d4c5a', marginBottom: 10 }]}>
                    Take a moment to check in
                  </Text>

                  <View style={{ flexDirection: 'row', width: 270, alignSelf: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
                    <Text style={styles.sliderLabel}>Dukhi</Text>
                    <Text style={styles.sliderLabel}>Sukhi</Text>
                  </View>
                  
                  <View
                    style={[styles.sliderTrack, { backgroundColor: 'transparent', height: 32, width: 270, alignSelf: 'center', marginTop: 0 }]}
                    onLayout={e => setSliderLeft(e.nativeEvent.layout.x)}
                  >
                    <LinearGradient
                      colors={['#4594A5', '#FCF7B4']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={{
                        position: 'absolute',
                        width: 270,
                        height: 16,
                        borderRadius: 8,
                        left: 0,
                        top: 8,
                      }}
                    />
                    <View
                      style={[
                        styles.sliderThumb,
                        { left: moodValue * (270 - 28), top: 2 },
                      ]}
                      {...panResponder.panHandlers}
                    />
                  </View>
                  
                  <Text style={styles.sliderHint}>Drag to reflect your mood.</Text>
      </View>
      {/* <MoodSliderCard /> */}


     
        <HabitsList
          title="Today's Habits"
          habits={habits}
          onToggle={toggleHabitCompletion}  
          onAllHabitPress={handleAllHabit} 
          maxItemsToShow={5}
        />

        {/* Tasks*/}
      <View
          ref={activityRef}
          onLayout={(e) => handleLayout('Activity', e)}
          style={[styles.card, { width: 354, alignSelf: 'center', padding: 0, height: 111, backgroundColor: '#fff' }]} // added backgroundColor
      >
      <View style={{ padding: 18, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={[styles.cardTitle, { fontSize: 32, color: '#3D88A7', marginBottom: 0, alignSelf: 'flex-start' }]}>
          Connections
        </Text>
        <TouchableOpacity style={[styles.allHabitsBtn, { marginBottom: 0 }]}>
          <Text style={[styles.allHabitsText, { color: '#666666' }]}>Explore Activities</Text>
          <Icon name="chevron-right" size={18} color="#3D88A7" />
        </TouchableOpacity>
      </View>
    </View>

      {/* Discover Feed */}
      <View
        ref={educateRef}
        onLayout={(e) => handleLayout('Educate', e)}
        style={styles.section}
      >
        <Text style={[styles.heading,{fontSize:48,marginBottom:0,marginTop:0}]}>Discover</Text>

        <Text style={[{fontSize:16, color: '#000000',marginBottom: 24,marginTop: 0 }]}>Mindful Reads</Text>

        {discoverPosts.map((item) => (
        <View key={item.id} style={{ marginBottom: 32 }}>
          {/* Username and avatar row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginLeft: 4 }}>
            <View style={{
              width: 16, height: 16, borderRadius: 8, backgroundColor: '#B6E388', marginRight: 6
            }} />
            <Text style={{ fontWeight: '600', color: '#222', fontSize: 13 }}>{item.author}</Text>
          </View>

          {/* Card */}
          <View style={styles.postCard}>
            {item.image ? (
              <View>
                <Image
                  source={item.image}
                  style={styles.postImage}
                  resizeMode="cover"
                />
                {/* Overlay title */}
                <Text style={{
                  position: 'absolute',
                  top: '45%',
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 32,
                  fontWeight: 'bold',
                  textShadowColor: 'rgba(0,0,0,0.3)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 6,
                }}>
                  {item.title}
                </Text>
              </View>
            ) : (
              <View style={styles.textPostCard}>
                <Text style={{ color: '#222', fontWeight: '600', fontSize: 15 }}>{item.author}</Text>
                {/*..Error fixed (item.text) to (item.author) */}
              </View>
            )}

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>

                {/* Left Text */}
                <Text style={{ color: '#252525', fontSize: 12 ,marginLeft: 15}}>
                  Breathing from art!
                </Text>

                {/* Right Icons */}
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginRight: 16}}>
                    <Icon name="heart" size={22} color="#222" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 16}}>
                    <Icon name="bookmark" size={22} color="#222" />
                  </TouchableOpacity>
                </View>

          </View>

          
          </View>        
        </View>
      ))}
        {/* Comments Section (after Discover) */}
        <View
          ref={educateRef}
          onLayout={(e) => handleLayout('Educate', e)}
          style={styles.commentCard}
        >

          {/* Top Row: Avatar + Username */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#D0F288', // dummy avatar color
              marginRight: 10,
            }} />
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Slimjopesh11</Text>
          </View>

          {/* Comment Content */}
          <View style={{ marginBottom: 12 ,}}>
            <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 4 }}>
              Want to gain healthy body fat? 🍽️
            </Text>
            <Text style={{ color: '#252525', fontSize: 14, lineHeight: 20,textAlign: 'justify' }}>
              Try adding calorie-dense foods like creamy avocados, crunchy nuts, and rich olive oil to your meals! 🥑🥜 Don’t forget to up your meal frequency and hit the gym for some strength training! 💪 Always check with a healthcare pro before making big changes!
              {'\n'}
              #HealthyGains #NutritionTips
            </Text>
          </View>

          {/* Action Icons */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Icon name="heart" size={22} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 8 }}>
              <Icon name="bookmark" size={22} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
       <ProgressInputModal
          visible={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          habit={selectedHabit}
          onSubmitSuccess={() => {
            if (!selectedHabit) return;
            const updated = habits.map(h =>
              h.id === selectedHabit.id ? { ...h, completed: !h.completed } : h
            );
            setHabits(updated);
            setSelectedHabit(null);
            fetchHabits(); // ✅ Re-fetch from API after progress submission
            setSelectedHabit(null);
            // Refresh habits after submission
          }}
        />
    
     </ScrollView>
    
    {/* </LinearGradient> */}
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 16,
  },
commentCard: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 16,
  marginBottom: 32,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
},
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
topNavText: {
  fontSize: 16,
  color: '#888',
  marginRight: 20,
},
topNavTextActive: {
  fontWeight: 'bold',
  fontSize: 16,
  color: '#222',
  marginRight: 20,
  textDecorationLine: 'underline',
},

  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2D2D2D',
  },
  moodScroll: {
    marginBottom: 12,
  },
moodCardSlider: {
  backgroundColor: '#FFFFFFCC',  // white with 80% opacity
  borderRadius: 24,
  padding: 18,
  marginBottom: 24,
  alignItems: 'center',
  shadowColor: '#b0c4d4',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
},
  moodCard: {
    backgroundColor: '#245C73',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
moodCardTitle: {
  fontSize: 20,
  fontWeight: '600',
  color: '#2d4c5a',
  marginBottom: 10,
},
  moodCardActive: {
    backgroundColor: '#0e3c61',
  },
  moodCardText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quoteBox: {
    backgroundColor: '#c6dbe8',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  quoteText: {
    color: '#333',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 20,
  },
sliderRow: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginBottom: 6,
  justifyContent: 'space-between',
},
sliderLabel: {
  fontSize: 12,
  color: '#2d4c5a',
  width: 48,
  textAlign: 'center',
  fontWeight: '500',
},
sliderTrack: {
  flex: 1,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
  position: 'relative',
},
  sliderBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#b6d6c9',
    width: '100%',
    position: 'absolute',
  },
sliderThumb: {
  position: 'absolute',
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: '#DCEFf2',
  borderWidth: 2,
  borderColor: '#fff',
  top: -6,
  shadowColor: '#b0c4d4',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 4,
  elevation: 2,
},
sliderHint: {
  fontSize: 10,
  color: '#245C73',
  marginTop: 10,
  textAlign: 'center',
},
  card: {
    // Gradient background for Habits section
    backgroundColor:'#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#245C73',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3D88A7',
    marginBottom: 18,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
habitCircle: {
  width: 26,
  height: 26,
  borderRadius: 18,
  borderWidth: 4,
  borderColor: '#3D88A7',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
},
  habitCircleActive: {
    backgroundColor: '#fff',
    borderColor: '#2d4c5a',
  },
  allHabitsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  allHabitsText: {
    color: '#666666',
    fontWeight: '500',
    fontSize: 15,
    marginRight: 2,
    marginTop: 2,
  },
  habitText: {
    color: '#245C73',
    fontWeight: '700',
    fontSize: 24,
    flex: 1,
  },
  habitCircleDot: {
    width: 26,
    height: 26,
    borderRadius: 14,
    backgroundColor: '#3D88A7', // dark center    #3D88A7
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    color: '#333',
  },
postCard: {
  backgroundColor: '#fff',
  borderRadius: 24,
  width: 354,
  alignSelf: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  paddingBottom: 12,
  overflow: 'hidden',
},
textPostCard: {
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 18,
  minHeight: 80,
  justifyContent: 'center',
},
postImage: {
  width: 354,
  height: 443,
  borderRadius: 24,
},
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  postAuthor: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
  },
  postText: {
    color: '#444',
    marginBottom: 10,
  },
actions: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
  marginLeft: 8,
  gap: 18,
},
actionIcon: {
  marginRight: 18,
},
});