import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import AppText from '@/components/AppText';
import WeeklyTracker from './components/WeeklyTracker';
import InfoCard from './components/InfoCard'; // Placeholder for chart view
import GradientWrapper from '@/components/GradientWrapper';
import colors from '@/theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HabitsList from './components/HabitsList';
import GrowthChart from './components/GrowthChart';
import { useIsFocused } from '@react-navigation/native';


const TABS = ['Today', 'Week', 'Month'];

type DayDetailScreenRouteProp = RouteProp<RootStackParamList, 'DayDetail'>;

const DayDetailScreen = () => {
  const route = useRoute<DayDetailScreenRouteProp>();
  const { date } = route.params;

  
  const isFocused = useIsFocused();
  
  // if (!isFocused) return null; // Don't render until focused
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedDate, setSelectedDate] = useState(date);

  const [habits, setHabits] = useState([
    { id: '1', title: 'Cold Showers', completed: false, habit_progress_status: 'incomplete' },
    { id: '2', title: 'Exercise', completed: true, habit_progress_status: 'complete' },
    { id: '3', title: 'Meditation', completed: true, habit_progress_status: 'complete' },
    { id: '4', title: 'Journaling', completed: true, habit_progress_status: 'complete' },
    { id: '5', title: 'Reading', completed: true, habit_progress_status: 'complete' },
    { id: '6', title: 'Stretching', completed: true, habit_progress_status: 'complete' },
  ]);

  const habitCompletionMap = {
    '2024-06-29': { completed: 2, total: 3 },
    '2024-06-30': { completed: 1, total: 3 },
    '2024-07-01': { completed: 3, total: 3 },
    '2024-07-02': { completed: 2, total: 3 },
    '2024-07-03': { completed: 1, total: 3 },
    '2024-07-04': { completed: 2, total: 3 },
    '2024-07-05': { completed: 3, total: 3 },
  };

    // 2. Update state when date or focus changes
  useEffect(() => {
    if (isFocused) {
      setSelectedDate(date);
      setActiveTab('Today'); // Optional: reset tab to Today on new date
    }
  }, [date, isFocused]);

  const toggleHabitCompletion = (id: string) => {
    const updated = habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updated);
  };

  const progress = 0.65; // Dummy progress

 

  const renderTodayView = () => (
    <>
      <WeeklyTracker
        title="Know yourself to grow better"
        habitCompletionMap={habitCompletionMap}
      />

      <View style={styles.sectionTextWrap}>
        <AppText variant="body" style={styles.sectionTitle}>Each day Counts</AppText>
        <AppText variant="caption" style={styles.sectionDesc}>
          See habits you showed up for today. Reflect on your consistency and small wins that move you forward.
        </AppText>
      </View>

      <View style={[styles.progressBarWrap]}>     

        <View style={[styles.progressRow]}>
        
          <AppText variant="caption" style={styles.progressDate}>{selectedDate}</AppText>
          <AppText variant="caption" style={styles.progressPercent}>{Math.round(progress * 100)}%</AppText>
        
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <HabitsList
        habits={habits}
        onToggle={toggleHabitCompletion}
        maxItemsToShow={6}
      />
    </>
  );

  const renderWeekView = () => (
    <>
      <WeeklyTracker
        title="Know yourself to grow better"
        habitCompletionMap={habitCompletionMap}
      />

      <View style={styles.sectionTextWrap}>
        <AppText variant="body" style={styles.sectionTitle}>Your weekly rhythm</AppText>
        <AppText variant="caption" style={styles.sectionDesc}>
        Understand how your habits shaped your week. Spot what’s working and where you might want to realign.
        </AppText>
      </View>

      <GrowthChart
          title="Growth"
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          dataPoints={[10, 20, 30,80, 50, 60, 70]}
          category="Habits"
          isMonthly={false}
      />
      
    </>
  );

  const renderMonthView = () => (
    <>
    <WeeklyTracker
      title="Know yourself to grow better"
      habitCompletionMap={habitCompletionMap}
    />

    <View style={styles.sectionTextWrap}>
      <AppText variant="body" style={styles.sectionTitle}>Big picture, better progress</AppText>
      <AppText variant="caption" style={styles.sectionDesc}>
      Look back on your month to see trends, strongest streaks, and how far you’ve come. Growth is clearer in motion.
      </AppText>
    </View>

    <GrowthChart
      title="Growth"
      labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      dataPoints={[20, 30, 25, 50, 60, 70, 75, 80, 90, 85, 88, 100]}
      isMonthly={true}
    />


  </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff',paddingHorizontal: 20,paddingVertical: 40, }}>

        {/* Custom Tab Bar */}
        <View style={styles.tabBar}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <AppText variant="caption" style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Common Title */}
          <AppText variant="h2" style={styles.headerTitle}>Reflect. Realign. Repeat.</AppText>

          {/* Conditionally Render Based on Active Tab */}
          {activeTab === 'Today' && renderTodayView()}
          {activeTab === 'Week' && renderWeekView()}
          {activeTab === 'Month' && renderMonthView()}
        </ScrollView>

      </View>
  );
};

// flex: 1,
// // alignItems: 'center',
// paddingHorizontal: 20,
// paddingVertical: 40,  


const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: hp('5%'),
    paddingTop: hp('2%'),
  },
  tabBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 12,
    height: 32,
    margin: wp('1%'),
    marginBottom: hp('1%'),
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: wp('90%'),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: wp(5),
  },
  activeTab: {
    backgroundColor: '#E1F3F9', // Light blue highlight for active tab
  },
  tabText: {
    color: '#245C73',
    fontWeight: '500',
    fontSize: wp('3.5%'),
  },
  activeTabText: {
    color: '#245C73',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginBottom: hp('1.5%'),
    fontSize: wp('9%'),
  },
  sectionTextWrap: {
    width:wp(82),
    marginLeft: wp('4%'),
    marginBottom: hp('1.5%'),
    marginTop: hp('2%'),

  },
  sectionTitle: {
    color: colors.muted,
    fontWeight: '700',
    fontSize: wp('6%'),
    marginBottom: 4,
  },
  sectionDesc: {
    color: '#666666',
    fontSize: wp('3.5%'),
    marginTop: 2,
    maxWidth: wp('70%'),
    fontWeight:'400',
    
  },
  progressBarWrap: {
    width:wp(90),
    height:wp(8),
    marginBottom: hp('2%'),
    marginTop: hp('2.5%'),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('1%'),
    marginBottom:wp(1),
  },
  
  progressDate: {
    fontSize: wp('3.2%'),
    color: '#2D2D2D',
    fontWeight: '500',
    minWidth: wp('28%'),
  },
  
  progressPercent: {
    fontSize: wp('3.2%'),
    color: '#2D2D2D',
    fontWeight: '500',
    minWidth: wp('10%'),
    textAlign: 'right',
  },
  
  progressBarContainer: {
    flex: 1,
    marginHorizontal: wp('2%'),
  },
  
  progressBarBg: {
    height: 8,
    backgroundColor: '#A0A0A0', // Dark gray (background)
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  progressBarFill: {
    height: 8,
    backgroundColor: '#8BD2DF', // Light blue (fill)
    borderRadius: 20,
  },
});

export default DayDetailScreen;
