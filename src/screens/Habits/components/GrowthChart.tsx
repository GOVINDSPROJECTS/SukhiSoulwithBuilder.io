import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Get screen width
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
    r: '4',                            // radius of dot
    strokeWidth: '1',
    stroke: '#fff',
    fill: '#245C73',                  // <-- your custom color
  },
};

interface GrowthChartProps {
  title?: string;
  labels: string[];
  dataPoints: number[];
  isMonthly?: boolean;
  category?: string;
}

const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;

  return `${format(monday)} - ${format(sunday)}`;
};

const GrowthChart: React.FC<GrowthChartProps> = ({
  title = 'Monthly Habit Growth',
  labels,
  dataPoints,
  isMonthly = false,
  category = 'Habits',
}) => {
  const dynamicRange = isMonthly ? '2025' : getCurrentWeekRange();

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        strokeWidth: 1.5,
        color: (opacity = 1) => `rgba(61, 136, 167, ${opacity})`,
        withDots: true,                // <-- show the dots
      },
    ],
  };

  return (
    <View >
      <View>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.dropdownRow}>
            <Text style={[styles.subtext,{alignSelf:"center"}]}>{category} ▼</Text>
            <Text style={[styles.subtext, { marginLeft: 12 }]}>{dynamicRange} ▼</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={data}
        width={screenWidth - 32}
        height={200}
        chartConfig={chartConfig}
        bezier
        withDots={false}
        withShadow={true}
        withInnerLines={true}
        withOuterLines={false}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignSelf: 'center',
  },
  headerRow: {
    marginBottom: 12,
    flexDirection: 'row',
    marginTop:wp(7),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp(5),
    marginLeft:wp(3.5),
    color: '#1A1A1A',
    flexShrink: 1,
  },
  dropdownRow: {
    flexDirection: 'row',
    gap:wp(4),
  },
  subtext: {
    color: '#666',
    fontSize: 13,
    marginRight:wp(5),
  },
  chart: {
    borderRadius: 12,
    marginTop: 4,
    marginVertical: 16,
    backgroundColor: '#fff',
    // borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignSelf: 'center',
  },
});

export default GrowthChart;
