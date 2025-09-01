import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import AppText from '@/components/AppText';
import WeeklyTracker from './components/WeeklyTracker';
import colors from '@/theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HabitsList from './components/HabitsList';
import GrowthChart from './components/GrowthChart';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import SubscriptionPaymentModal from '@/components/SubscriptionPaymentModal';

const TABS = ['Today', 'Week', 'Month'];

type DayDetailScreenRouteProp = RouteProp<RootStackParamList, 'DayDetail'>;

type Habit = {
  id: string;
  title: string;
  completed: boolean;
  progress_status: boolean;
};

type GrowthChartData = {
  habits: string[];
  reports: Record<string, Record<string, number[]>>;
};

const DayDetailScreen = () => {
  const route = useRoute<DayDetailScreenRouteProp>();
  const { date } = route.params;
  const token = useAuthStore.getState().token;
  const [activePlan, setActivePlan] = useState(false);

  // if (!isFocused) return null; // Don't render until focused
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedDate, setSelectedDate] = useState(date);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [growthChartData, setGrowthChartData] = useState<GrowthChartData>({
    habits: [],
    reports: {},
  });
  const [habitCompletionMap, setHabitCompletionMap] = useState<
    Record<string, { completed: number; total: number }>
  >({});

  const progressMapRef = useRef<Record<string, any>>({});

  // ✅ Fetch habits & reports
  const fetchHabits = useCallback(async () => {
    try {
      console.log('📡 Fetching habits + progress reports...');
      const [habitRes, progressRes] = await Promise.all([
        api.get('/userhabits'),
        api.get('/userhabitreports'),
      ]);

      console.log('✅ Habits API:', habitRes.data);
      console.log('✅ Reports API:', progressRes.data);

      const rawHabits = habitRes.data.habits || [];
      const progressReports = progressRes.data.habitreport || [];

      if (!Array.isArray(progressReports)) {
        console.error('❌ progressReports is not an array:', progressReports);
        return;
      }

      const latestProgressMap: Record<string, any> = {};
      const completionMap: Record<
        string,
        { completed: number; total: number }
      > = {};

      const totalHabits = rawHabits.length;
      console.log('📊 Total habits:', totalHabits);

      progressReports.forEach((report: any) => {
        const habitId = report.habit_id.toString();

        if (
          !latestProgressMap[habitId] ||
          new Date(report.updated_at) >
            new Date(latestProgressMap[habitId].updated_at)
        ) {
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

      console.log('📅 CompletionMap built:', completionMap);

      progressMapRef.current = latestProgressMap;
      setHabitCompletionMap(completionMap);

      updateHabitsForDate(rawHabits, progressReports, selectedDate);
    } catch (error) {
      console.error('❌ Error fetching habits or progress reports:', error);
    }
  }, [selectedDate]);

  // ✅ Update habits list for selectedDate
  const updateHabitsForDate = (
    rawHabits: any[],
    progressReports: any[],
    date: string,
  ) => {
    console.log(`🔄 Updating habits for date: ${date}`);
    const habitsForDate: Habit[] = rawHabits.map((habit: any) => {
      const report = progressReports.find(
        (r: any) =>
          r.habit_id.toString() === habit.id.toString() &&
          r.tracked_date === date,
      );
      return {
        id: habit.id.toString(),
        title: habit.habit_name,
        completed: report?.status === 'true',
        progress_status: habit.habit_progress_status === 'true',
      };
    });

    console.log('📋 Habits for selected date:', habitsForDate);
    setHabits(habitsForDate);
  };

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // ✅ Fetch habits graph for GrowthChart
  const fetchHabitsGraph = useCallback(async () => {
    try {
      console.log('📡 Fetching habits graph data...');
      const [habitRes, progressRes] = await Promise.all([
        api.get('/userhabits'),
        api.get('/userhabitreports'),
      ]);

      console.log('📈 Graph Habits API:', habitRes.data);
      console.log('📈 Graph Reports API:', progressRes.data);

      const rawHabits = habitRes.data.habits || [];
      const progressReports = progressRes.data.habitreport || [];

      if (!Array.isArray(progressReports)) {
        console.error('❌ progressReports is not an array:', progressReports);
        return;
      }

      const habitMap: Record<string, string> = {};
      rawHabits.forEach((habit: any) => {
        habitMap[habit.id.toString()] = habit.title || habit.habit_name;
      });

      const habits: string[] = rawHabits.map(
        (h: any) => h.title || h.habit_name,
      );
      const reports: Record<string, Record<string, number[]>> = {};

      progressReports.forEach((report: any) => {
        const habitId = report.habit_id.toString();
        const habitTitle = habitMap[habitId];
        if (!habitTitle) return;

        const date = new Date(report.tracked_date);
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const formatDate = (d: Date) =>
          d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

        const weekLabel = `${formatDate(startOfWeek)} - ${formatDate(
          endOfWeek,
        )}`;

        if (!reports[habitTitle]) reports[habitTitle] = {};
        if (!reports[habitTitle][weekLabel])
          reports[habitTitle][weekLabel] = Array(7).fill(0);

        const dayIndex = date.getDay();
        reports[habitTitle][weekLabel][dayIndex] =
          report.status === 'true' || report.status === true ? 1 : 0;
      });

      console.log('✅ Final GrowthChartData:', { habits, reports });
      setGrowthChartData({ habits, reports });
    } catch (error) {
      console.error('❌ Error fetching habits graph:', error);
    }
  }, []);

  // useEffect(() => {
  //   fetchHabitsGraph();
  //   hasSubscription();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabitsGraph();
      hasSubscription();
    }, [fetchHabitsGraph, hasSubscription]),
  );

  // ✅ Handle Date Press
  const handleDatePress = async (newDate: string) => {
    try {
      console.log('📅 Date pressed:', newDate);
      setSelectedDate(newDate);

      const [habitRes, progressRes] = await Promise.all([
        api.get('/userhabits'),
        api.get('/userhabitreports'),
      ]);

      const rawHabits = habitRes.data.habits || [];
      const progressReports = progressRes.data.habitreport || [];

      const totalHabits = rawHabits.length;

      const completionMap: Record<
        string,
        { completed: number; total: number }
      > = {};
      progressReports.forEach((report: any) => {
        const day = report.tracked_date;
        if (!completionMap[day]) {
          completionMap[day] = { completed: 0, total: totalHabits };
        }
        if (report.status === 'true') {
          completionMap[day].completed += 1;
        }
      });

      console.log('📊 Updated CompletionMap after date press:', completionMap);

      setHabitCompletionMap(completionMap);
      updateHabitsForDate(rawHabits, progressReports, newDate);
    } catch (err) {
      console.error('❌ Error handling date press:', err);
    }
  };

  const hasSubscription = useCallback(async () => {
    try {
      const res = await api.get('/activesubscriptions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      res.data.subscription.is_active
        ? setActivePlan(res.data.subscription.is_active)
        : setActivePlan(false);
    } catch (error) {
      console.error('Error fetching active subscriptions:', error);
    }
  }, [token]);

  // ✅ Tab Views
  const renderTodayView = () => {
    const completion = habitCompletionMap[selectedDate] || {
      completed: 0,
      total: habits.length || 1,
    };
    const progress =
      completion.total > 0 ? completion.completed / completion.total : 0;

    console.log('🔍 TodayView Completion map:', habitCompletionMap);
    console.log('📊 TodayView Completion for', selectedDate, completion);

    return (
      <>
        <WeeklyTracker
          title="Know yourself to grow better"
          habitCompletionMap={habitCompletionMap}
          onDayPress={handleDatePress}
        />
        <View style={styles.sectionTextWrap}>
          <AppText variant="body" style={styles.sectionTitle}>
            Each day Counts
          </AppText>
          <AppText variant="caption" style={styles.sectionDesc}>
            See habits you showed up for today. Reflect on your consistency and
            small wins that move you forward.
          </AppText>
        </View>
        <View style={styles.progressBarWrap}>
          <View style={styles.progressRow}>
            <AppText variant="caption" style={styles.progressDate}>
              {selectedDate}
            </AppText>
            <AppText variant="caption" style={styles.progressPercent}>
              {Math.round(progress * 100)}%
            </AppText>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
            />
          </View>
        </View>
        <HabitsList
          habits={habits}
          onToggle={id => {
            setHabits(prev =>
              prev.map(h =>
                h.id === id ? { ...h, completed: !h.completed } : h,
              ),
            );
          }}
          maxItemsToShow={6}
        />
      </>
    );
  };

  const renderWeekView = () =>
    activePlan ? (
      <>
        <WeeklyTracker
          title="Know yourself to grow better"
          habitCompletionMap={habitCompletionMap}
          onDayPress={handleDatePress}
        />
        <View style={styles.sectionTextWrap}>
          <AppText variant="body" style={styles.sectionTitle}>
            Your weekly rhythm
          </AppText>
          <AppText variant="caption" style={styles.sectionDesc}>
            Understand how your habits shaped your week. Spot what’s working and
            where you might want to realign.
          </AppText>
        </View>
        <GrowthChart
          title="Growth"
          habits={growthChartData?.habits || []}
          reports={growthChartData?.reports || {}}
        />
      </>
    ) : (
      <SubscriptionPaymentModal />
    );

  const renderMonthView = () => (
    <>
      <WeeklyTracker
        title="Know yourself to grow better"
        habitCompletionMap={habitCompletionMap}
        onDayPress={handleDatePress}
      />
      <View style={styles.sectionTextWrap}>
        <AppText variant="body" style={styles.sectionTitle}>
          Big picture, better progress
        </AppText>
        <AppText variant="caption" style={styles.sectionDesc}>
          Look back on your month to see trends, strongest streaks, and how far
          you’ve come. Growth is clearer in motion.
        </AppText>
      </View>
      <GrowthChart
        title="Growth"
        habits={growthChartData?.habits || []}
        reports={growthChartData?.reports || {}}
      />
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}
    >
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <AppText
              variant="caption"
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="h2" style={styles.headerTitle}>
          Reflect. Realign. Repeat.
        </AppText>
        {activeTab === 'Today' && renderTodayView()}
        {activeTab === 'Week' && renderWeekView()}
        {activeTab === 'Month' && renderMonthView()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: hp('5%'), paddingTop: hp('2%') },
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
  activeTab: { backgroundColor: '#E1F3F9' },
  tabText: { color: '#245C73', fontWeight: '500', fontSize: wp('3.5%') },
  activeTabText: { color: '#245C73' },
  headerTitle: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginBottom: hp('1.5%'),
    fontSize: wp('9%'),
  },
  sectionTextWrap: {
    width: wp(82),
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
    color: '#666',
    fontSize: wp('3.5%'),
    marginTop: 2,
    maxWidth: wp('70%'),
    fontWeight: '400',
  },
  progressBarWrap: {
    width: wp(90),
    height: wp(8),
    marginBottom: hp('2%'),
    marginTop: hp('2.5%'),
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('1%'),
    marginBottom: wp(1),
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
  progressBarBg: {
    height: 8,
    backgroundColor: '#A0A0A0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBarFill: { height: 8, backgroundColor: '#8BD2DF', borderRadius: 20 },
});

export default DayDetailScreen;
