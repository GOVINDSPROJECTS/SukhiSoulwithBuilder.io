import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(61, 136, 167, ${opacity})`,
  labelColor: () => '#888',
  fillShadowGradient: '#3D88A7',
  fillShadowGradientOpacity: 0.2,
  propsForBackgroundLines: {
    stroke: '#e0e0e0',
  },
  propsForDots: {
    r: '3',
    strokeWidth: '1',
    stroke: '#fff',
    fill: '#245C73',
  },
};

interface GrowthChartProps {
  title?: string;
  habits: string[];
  reports: {
    [habit: string]: { [week: string]: number[] };
  };
}

// ✅ generate last 4 week ranges for dropdown
const getWeekRanges = () => {
  const today = new Date();
  const ranges: string[] = [];

  for (let i = 0; i < 4; i++) {
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) - i * 7);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (date: Date) =>
      `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;

    ranges.push(`${format(monday)} - ${format(sunday)}`);
  }

  return ranges;
};

// ✅ helper: find closest week key from reports that overlaps selectedWeek
const findMatchingWeek = (availableWeeks: string[], selectedWeek: string) => {
  const [selStart, selEnd] = selectedWeek.split(' - ');
  const selStartNum = parseInt(selStart.split(' ')[0]);

  // crude match: pick the first available week where start/end is within 1–2 days diff
  return (
    availableWeeks.find((w) => {
      const [repStart] = w.split(' - ');
      const repStartNum = parseInt(repStart.split(' ')[0]);
      return Math.abs(repStartNum - selStartNum) <= 1; // ✅ tolerant match
    }) || selectedWeek
  );
};

const GrowthChart: React.FC<GrowthChartProps> = ({
  title = 'Habit Growth',
  habits,
  reports,
}) => {
  const weekRanges = getWeekRanges();
  const [selectedHabit, setSelectedHabit] = useState<string>('All');
  const [selectedWeek, setSelectedWeek] = useState<string>(weekRanges[0]);
  const [labels] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const [dataPoints, setDataPoints] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    console.log('📊 Filters changed:', { selectedHabit, selectedWeek });
    console.log('📂 Available reports:', reports);

    if (!habits.length || !reports) return;

    if (selectedHabit === 'All') {
      let combined = [0, 0, 0, 0, 0, 0, 0];
      habits.forEach((habit) => {
        const weekKeys = Object.keys(reports[habit] || {});
        const matchedWeek = findMatchingWeek(weekKeys, selectedWeek);
        const weekData = reports[habit]?.[matchedWeek];
        console.log(`🔍 Habit ${habit} → Selected "${selectedWeek}" → Matched "${matchedWeek}" →`, weekData);
        combined = combined.map((val, idx) => val + (weekData?.[idx] || 0));
      });
      console.log('✅ Combined dataPoints:', combined);
      setDataPoints(combined);
    } else {
      const weekKeys = Object.keys(reports[selectedHabit] || {});
      const matchedWeek = findMatchingWeek(weekKeys, selectedWeek);
      const weekData = reports[selectedHabit]?.[matchedWeek];
      console.log(`🔍 Week dataPoints for ${selectedHabit} (Selected "${selectedWeek}" → Matched "${matchedWeek}") :`, weekData);
      setDataPoints(weekData || [0, 0, 0, 0, 0, 0, 0]);
    }
  }, [selectedHabit, selectedWeek, habits, reports]);

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(61, 136, 167, ${opacity})`,
      },
    ],
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.pickerRow}>
          <Picker
            selectedValue={selectedHabit}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedHabit(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            {habits.map((habit) => (
              <Picker.Item key={habit} label={habit} value={habit} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedWeek}
            style={[styles.picker, { width: 150 }]}
            onValueChange={(itemValue) => setSelectedWeek(itemValue)}
          >
            {weekRanges.map((range) => (
              <Picker.Item key={range} label={range} value={range} />
            ))}
          </Picker>
        </View>
      </View>

      <LineChart
        key={JSON.stringify(dataPoints)} // force redraw
        data={data}
        width={screenWidth - 32}
        height={260}
        chartConfig={chartConfig}
        bezier
        withDots
        withShadow
        fromZero={true}       // ✅ Y-axis starts at zero
        yAxisInterval={1}     // ✅ step size
        yLabelsOffset={12}    // ✅ spacing for Y labels
        verticalLabelRotation={0}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: 8,
    flexDirection: 'row',
    marginTop: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  title: {
    fontWeight: '600',
    fontSize: wp(4),
    marginLeft: wp(2),
    color: '#1A1A1A',
    flexShrink: 1,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: 36,
    width: 110,
    fontSize: 12,
    color: '#1A1A1A',
  },
  chart: {
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignSelf: 'center',
  },
});

export default GrowthChart;
