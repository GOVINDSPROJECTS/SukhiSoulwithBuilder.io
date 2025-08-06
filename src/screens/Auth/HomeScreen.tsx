import React, { useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';  
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import GradientWrapper from '../../components/GradientWrapper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

// Sample data for habits, tasks.
const habits = ['Cold Showers', 'Exercise', 'Meditation'];
const tasks = ['Drink Water', 'Read 10 pages', 'No Social Media'];
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
  const [habits, setHabits] = useState([
    { name: 'Cold Showers', done: true },
    { name: 'Exercise', done: false },
    { name: 'Meditation', done: false },
  ]);
  const [sliderLeft, setSliderLeft] = useState(0);

  // For the slider, we use a custom implementation or a library like @react-native-community/slider.
  const SLIDER_WIDTH = width - 64;
  const THUMB_SIZE = 28;

  const handleSliderPress = (evt: any) => {
    const x = evt.nativeEvent.locationX;
    let value = x / SLIDER_WIDTH;
    value = Math.max(0, Math.min(1, value));
    setMoodValue(value);
  };

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
    const habitsRef = useRef(null);
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

  return (
    <GradientWrapper>
<View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: wp(4) ,marginTop:0}}>
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
        paddingHorizontal: wp(3),
        paddingVertical: wp(1),
        borderRadius: wp(4),
        marginHorizontal: wp(1.2),
        backgroundColor: activeTab === tab ? '#245C73' : 'transparent',
      }}
    >
      <Text
        style={{
          color: activeTab === tab ? '#fff' : '#1B3C3E',
          fontSize: wp(3.5),
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
          style={[styles.section, { width: wp(53), height: wp(34) }]}
      >
        <Text style={[styles.heading, {fontSize:wp(8.5)}]}>How are you{'\n'}feeling{'\n'}today?</Text>
      </View>

                  {/* Mood Slider Card */}
        <View style={[styles.moodCardSlider, { width: wp(89), height: wp(34), alignSelf: 'center' }]}>
                  <Text style={[styles.moodCardTitle, { fontSize: wp(5), fontWeight: '600', color: '#2d4c5a', marginBottom: wp(2.5) }]}>
                    Take a moment to check in
                  </Text>

                  {/* Labels Row */}
                  <View style={{ flexDirection: 'row', width: wp(68), alignSelf: 'center', justifyContent: 'space-between', marginBottom: wp(0) }}>
                    <Text style={styles.sliderLabel}>Dukhi</Text>
                    <Text style={styles.sliderLabel}>Sukhi</Text>
                  </View>
                  
                  {/* Slider Row */}
                  <View
                    style={[styles.sliderTrack, { backgroundColor: 'transparent', height: 32, width: wp(68), alignSelf: 'center', marginTop: 0 }]}
                    onLayout={e => setSliderLeft(e.nativeEvent.layout.x)}
                  >
                    <LinearGradient
                      colors={['#4594A5', '#FCF7B4']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={{
                        position: 'absolute',
                        width: wp(68),
                        height: wp(4),
                        borderRadius: wp(2),
                        left: wp(0),
                        top: wp(2),
                      }}
                    />
                    <View
                      style={[
                        styles.sliderThumb,
                        { left: moodValue * (270 - 28), top: wp(0.5)},
                      ]}
                      {...panResponder.panHandlers}
                    />
                  </View>
                  
                  <Text style={styles.sliderHint}>Drag to reflect your mood.</Text>
      </View>



      

        {/* Today's Habits */}
       <View
          ref={habitsRef}
          onLayout={(e) => handleLayout('Habits', e)}
          style={[styles.card, { width: wp(89), alignSelf: 'center', padding: 0 }]}
        >
          <View style={{ padding: 18 }}>
            <Text style={[styles.cardTitle, { fontSize: 32 }]}>Today’s {'\n'}Habits</Text>
            {habits.map((habit, idx) => (
              <View key={habit.name} style={styles.habitRow}>
                <Text style={[styles.habitText, { marginTop: 4 }]}>{habit.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    const updated = habits.map((h, i) =>
                      i === idx ? { ...h, done: !h.done } : h
                    );
                    setHabits(updated);
                  }}
                  style={styles.habitCircle}
                  activeOpacity={0.7}
                >
                  {habit.done && <View style={styles.habitCircleDot} />}
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.allHabitsBtn}>
              <Text style={styles.allHabitsText}>All habits</Text>
              <Icon name="chevron-right" size={18} color="#2D2D2D" style={{marginTop:wp(1)}}/>
            </TouchableOpacity>
          </View>
        </View>


        {/* Tasks*/}
      <View
          ref={activityRef}
          onLayout={(e) => handleLayout('Activity', e)}
          style={[styles.card, { width: wp(89), alignSelf: 'center', padding: 0, height: wp(28), backgroundColor: '#fff' }]} // added backgroundColor
      >
      <View style={{ padding: wp(4.5), flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={[styles.cardTitle, { fontSize: wp(8), color: '#3D88A7', marginBottom: 0, alignSelf: 'flex-start' }]}>
          Connections
        </Text>
        <TouchableOpacity style={[styles.allHabitsBtn, { marginBottom: 0 }]}>
          <Text style={[styles.allHabitsText, { color: '#666666' }]}>Explore Activities</Text>
          <Icon name="chevron-right" size={18} color="#2D2D2D" style={{marginTop:wp(1)}} />
        </TouchableOpacity>
      </View>
    </View>

      {/* Discover Feed */}
      <View
        ref={educateRef}
        onLayout={(e) => handleLayout('Educate', e)}
        style={styles.section}
      >
        <Text style={[styles.heading,{fontSize:wp(12),marginBottom:0,marginTop:0}]}>Discover</Text>

        <Text style={[{fontSize:wp(4), color: '#000000',marginBottom: wp(6),marginTop: 0 }]}>Mindful Reads</Text>

        {discoverPosts.map((item) => (
        <View key={item.id} style={{ marginBottom: wp(8) }}>
          {/* Username and avatar row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:wp(2), marginLeft: wp(1) }}>
            <View style={{
              width: wp(4), height: wp(4), borderRadius: wp(2), backgroundColor: '#B6E388', marginRight: 6
            }} />
            <Text style={{ fontWeight: '600', color: '#222', fontSize: wp(3.2) }}>{item.author}</Text>
          </View>

            {item.image ? (
              <View>
                <Image
                  source={item.image}
                  style={styles.postImage}
                  resizeMode="cover"
                />
                {/* Overlay title
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
                </Text> */}
              </View>
            ) : (
              <View style={styles.textPostCard}>
                <Text style={{ color: '#222', fontWeight: '600', fontSize: wp(4) }}>{item.author}</Text>
                {/*..Error fixed (item.text) to (item.author) */}
              </View>
            )}
          {/* Card */}
          


          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: wp(2.5),
            paddingHorizontal: wp(2.5),
          }}>

                {/* Left Text */}
                <Text style={{ color: '#252525', fontSize: wp(3) ,marginLeft: wp(4.5)}}>
                  Breathing from art!
                </Text>

                {/* Right Icons */}
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginRight: wp(4)}}>
                    <Icon name="heart" size={22} color="#222" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 16}}>
                    <Icon name="bookmark" size={22} color="#222" />
                  </TouchableOpacity>
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
              width: wp(8),
              height: wp(8),
              borderRadius: wp(4),
              backgroundColor: '#D0F288', // dummy avatar color
              marginRight: wp(2.5),
            }} />
            <Text style={{ fontWeight: 'bold', fontSize: wp(3.8) }}>Slimjopesh11</Text>
          </View>

          {/* Comment Content */}
          <View style={{ marginBottom: wp(3)}}>
            <Text style={{ fontSize:wp(3.9), fontWeight: '600', marginBottom: wp(1.5) }}>
              Want to gain healthy body fat? 
            </Text>
            <Text style={{ color: '#252525', fontSize: wp(3.5), lineHeight: wp(5),textAlign: 'justify' }}>
              Try adding calorie-dense foods like creamy avocados, crunchy nuts, and rich olive oil to your meals! 🥑🥜 Don’t forget to up your meal frequency and hit the gym for some strength training! 💪 Always check with a healthcare pro before making big changes!
              {'\n'}
              #HealthyGains #NutritionTips
            </Text>
          </View>

          {/* Action Icons */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
            <TouchableOpacity style={{ marginRight: wp(4) }}>
              <Icon name="heart" size={22} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: wp(2) }}>
              <Icon name="bookmark" size={22} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    
     </ScrollView>
    
    {/* </LinearGradient> */}
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: wp(4),
  },
commentCard: {
  backgroundColor: '#fff',
  borderRadius: wp(4),
  padding: wp(4),
  marginBottom: wp(8),
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
},
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: wp(4),
  },
topNavText: {
  fontSize: wp(4),
  color: '#888',
  marginRight: wp(5),
},
topNavTextActive: {
  fontWeight: 'bold',
  fontSize: wp(4),
  color: '#222',
  marginRight: wp(5),
  textDecorationLine: 'underline',
},

  heading: {
    fontSize: wp(4.5),
    fontWeight: '600',
    marginBottom: wp(2.5),
    color: '#2D2D2D',
  },
  moodScroll: {
    marginBottom: wp(3),
  },
moodCardSlider: {
  backgroundColor: '#FFFFFFCC',  // white with 80% opacity
  borderRadius: wp(6),
  padding: wp(4.5),
  marginBottom: wp(6),
  alignItems: 'center',
  shadowColor: '#b0c4d4',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
},
  moodCard: {
    backgroundColor: '#245C73',
    paddingVertical: wp(2.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    marginRight: wp(2.5),
  },
moodCardTitle: {
  fontSize: wp(5),
  fontWeight: '600',
  color: '#2d4c5a',
  marginBottom: wp(2.5),
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
    padding: wp(3),
    borderRadius: wp(3),
    marginBottom: wp(5),
  },
  quoteText: {
    color: '#333',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: wp(5),
  },
sliderRow: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginBottom: wp(1.5),
  justifyContent: 'space-between',
},
sliderLabel: {
  fontSize: wp(3),
  color: '#2d4c5a',
  width: wp(12),
  textAlign: 'center',
  fontWeight: '500',
},
sliderTrack: {
  flex: 1,
  height: wp(8),
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
  position: 'relative',
},
  sliderBg: {
    height:wp(2),
    borderRadius: wp(1),
    backgroundColor: '#b6d6c9',
    width: '100%',
    position: 'absolute',
  },
sliderThumb: {
  position: 'absolute',
  width: wp(7),
  height: wp(7),
  borderRadius: wp(3.2),
  backgroundColor: '#DCEFf2',
  borderWidth: wp(0.5),
  borderColor: '#fff',
  top: -6,
  shadowColor: '#b0c4d4',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 4,
  elevation: 2,
},
sliderHint: {
  fontSize: wp(2.5),
  color: '#245C73',
  marginTop: wp(2.5),
  textAlign: 'center',
},
  card: {
    // Gradient background for Habits section
    backgroundColor:'#FFFFFF',
    borderRadius: wp(4.5),
    padding: wp(4.5),
    marginBottom: wp(5),
    shadowColor: '#245C73',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: wp(8),
    fontWeight: '700',
    color: '#3D88A7',
    marginBottom: wp(4.5),
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(3),
  },
habitCircle: {
  width: wp(6.5),
  height: wp(6.5),
  borderRadius: wp(4.5),
  borderWidth: wp(1),
  borderColor: '#3D88A7',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: wp(2.5),
},
  habitCircleActive: {
    backgroundColor: '#fff',
    borderColor: '#2d4c5a',
  },
  allHabitsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop:wp(1.3),
  },
  allHabitsText: {
    color: '#666666',
    fontWeight: '500',
    fontSize: wp(4),
    marginRight: 2,
    marginTop: 2,
  },
  habitText: {
    color: '#245C73',
    fontWeight: '700',
    fontSize: wp(6),
    flex: 1,
  },
  habitCircleDot: {
    width: wp(6.5),
    height: wp(6.5),
    borderRadius: 14,
    backgroundColor: '#3D88A7', // dark center    #3D88A7
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: wp(3.5),
    borderRadius: wp(2.5),
    marginBottom: wp(2.5),
  },
  taskText: {
    color: '#333',
  },
// postCard: {
//   backgroundColor: '#fff',
//   borderRadius: wp(6),
//   width: wp(89),
//   alignSelf: 'center',
//   marginBottom: wp(5),
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.08,
//   shadowRadius: 8,
//   elevation: 3,
//   paddingBottom: wp(3),
//   overflow: 'hidden',
// },
textPostCard: {
  borderRadius: wp(4.5),
  padding: wp(4.5),
  minHeight: wp(20),
  justifyContent: 'center',
},
postImage: {
  width: wp(84),
  height: wp(110),
  borderRadius: wp(6),
  justifyContent: 'center',
  // marginRight:wp(8)
},
  postTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#222',
  },
  postAuthor: {
    fontSize: wp(3),
    color: '#777',
    marginBottom: wp(1.5),
  },
  postText: {
    color: '#444',
    marginBottom: wp(2.5),
  },
actions: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: wp(2),
  marginLeft: wp(2),
  gap: wp(4.5),
},
actionIcon: {
  marginRight: wp(4.5),
},
});