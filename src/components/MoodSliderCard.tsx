// components/MoodSliderCard.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const moodStates = [
  {
    label: 'This too shall pass, you’re not alone in this',
    color: ['#A1C4FD', '#C2E9FB'],
  },
  {
    label: 'It’s okay to pause and breathe',
    color: ['#89F7FE', '#66A6FF'],
  },
  {
    label: 'A little check in goes a long way',
    color: ['#FBD786', '#f7797d'],
  },
  {
    label: 'Keep that energy going',
    color: ['#FFDEE9', '#B5FFFC'],
  },
  {
    label: 'Joy looks good on you..',
    color: ['#C6FFDD', '#FBD786'],
  },
];

const MoodSliderCard = () => {
  const [sliderValue, setSliderValue] = useState(2);
  const [note, setNote] = useState('');
  const [expanded, setExpanded] = useState(false);

  const heightValue = useSharedValue(160);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(heightValue.value, { duration: 400 }),
    };
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
    heightValue.value = expanded ? 160 : height;
  };

  const moodIndex = Math.round(sliderValue);
  const mood = moodStates[moodIndex];

  return (
    <Pressable onPress={toggleExpand}>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <LinearGradient colors={mood.color} style={styles.gradient}>
          <View style={styles.cardContent}>
            <Text style={styles.moodText}>{mood.label}</Text>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={4}
              step={1}
              value={sliderValue}
              onValueChange={(value) => setSliderValue(value)}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
              thumbTintColor="#000"
            />

            <View style={styles.labelRow}>
              <Text style={styles.label}>Dukhi</Text>
              <Text style={styles.label}>Sukhi</Text>
            </View>

            {expanded && (
              <>
                <Text style={styles.noteText}>Want to add a quick note?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type here..."
                  placeholderTextColor="#999"
                  value={note}
                  onChangeText={setNote}
                />
              </>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 16,
    alignSelf: 'center',
    elevation: 5,
  },
  gradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  noteText: {
    fontSize: 14,
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
    color: '#000',
  },
});

export default MoodSliderCard;
