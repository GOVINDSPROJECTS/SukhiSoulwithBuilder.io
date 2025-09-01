import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

const InSyncHomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.header}>InSync</Text>
      <Text style={styles.subHeader}>Create conversations that last</Text>

      {/* Plan Something Together Card */}
      <View style={styles.primaryCard}>
        <Text style={styles.primaryCardTitle}>Plan Something Together</Text>
        <Text style={styles.primaryCardSubtitle}>
          Add the little things you love to do with your partner
        </Text>
        <TouchableOpacity style={styles.plusButton}>
          <Text style={styles.plusButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Our Journal Card */}
      <TouchableOpacity style={styles.journalCard}>
        <View>
          <Text style={styles.journalTitle}>Our Journal</Text>
          <Text style={styles.journalDate}>06 Nov 2025</Text>
        </View>
        <View style={styles.alignEnd}>
          <Text style={styles.journalMetric}>60</Text>
          <Text style={styles.journalMetricUnit}>mins</Text>
        </View>
      </TouchableOpacity>

      {/* Reflections Section */}
      <Text style={styles.reflectionsTitle}>Reflections</Text>
      <Text style={styles.reflectionsSubtitle}>We grow best together</Text>

      {[
        {
          title: 'Know Your Person Better',
          subtitle: 'Not just where to laugh; full of figures in your head',
        },
        {
          title: 'Write It Out',
          subtitle: 'A space to understand yourself and your heart',
        },
        {
          title: 'Talk To Therapist',
          subtitle: 'Talk it out. Understand more. Heal deeper with therapy',
        },
        {
          title: 'Understand Your Relations',
          subtitle: 'Learn what helps conversations last',
        },
      ].map(({title, subtitle}, idx) => (
        <TouchableOpacity key={idx} style={styles.reflectionCard}>
          <View style={styles.reflectionTextWrapper}>
            <Text style={styles.reflectionTitle}>{title}</Text>
            <Text style={styles.reflectionSubtitle}>{subtitle}</Text>
          </View>
          <Text style={styles.arrow}>&#8250;</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default InSyncHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F9FAFC',
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#004C99',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 25,
  },
  primaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 4,
  },
  primaryCardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 8,
  },
  primaryCardSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  plusButton: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    backgroundColor: '#006699',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 28,
  },
  journalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 3,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
  },
  journalDate: {
    fontSize: 13,
    color: '#666666',
  },
  journalMetric: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222222',
  },
  journalMetricUnit: {
    fontSize: 12,
    color: '#999999',
  },
  alignEnd: { alignItems: 'flex-end' },
  reflectionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
  },
  reflectionsSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  reflectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  reflectionTextWrapper: {
    flex: 1,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  reflectionSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  arrow: {
    fontSize: 22,
    color: '#999999',
    marginLeft: 12,
  },
});



// // App.tsx — React Native (TypeScript) single-screen UI matching the provided design
// import AppText from "@/components/AppText";
// import React from "react";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import {
//   SafeAreaView,
//   StatusBar,
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Pressable,
// } from "react-native";

// const colors = {
//   bg: "#F5F8FB",
//   card: "#FFFFFF",
//   brand: "#0EA5E9",
//   brandDark: "#0284C7",
//   text: "#0F172A",
//   subtext: "#64748B",
//   border: "#E5E7EB",
//   shadow: "rgba(2, 8, 23, 0.06)",
// };

// export default function App() {
//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="dark-content" />
//       <ScrollView contentContainerStyle={styles.container}>
//         <Header />

//         <View style={styles.stack24}>
//           <LargeCard
//             title="Plan Something Together"
//             description="Pick the date, invite your person."
//             rightSlot={
//               <CircleIcon
//                 label="+"
//                 onPress={() => {}}
//                 bg={colors.text}
//                 fg="#FFFFFF"
//               />
//             }
//           />
//           <LargeCard
//             title="Our Journal"
//             description="Oct 19, 2026"
//             footerRight={<Text style={styles.badgeMuted}>60 entries</Text>}
//           />
//         </View>

//         <Section
//           title="Reflections"
//           subtitle="Prompts to grow closer together"
//         />

//         <View style={styles.stack12}>
//           <ListItem
//             title="Know Your Person Better"
//             subtitle="Answer thoughtful questions together"
//             onPress={() => {}}
//           />
//           <ListItem
//             title="Write It Out"
//             subtitle="Express feelings openly and honestly"
//             onPress={() => {}}
//           />
//           <ListItem
//             title="Talk To Therapist"
//             subtitle="Find clarity with professional guidance"
//             onPress={() => {}}
//           />
//           <ListItem
//             title="Understand Your Relation"
//             subtitle="Discover patterns and communication styles"
//             onPress={() => {}}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function Header() {
//   return (
//     <View style={styles.header}>
//       <View>
//         <AppText variant="h1" style={[styles.header]}>Momentum</AppText>
//         <AppText variant="caption" style={styles.header}>Create habits that stick</AppText>
//       </View>
//       <CircleIcon label="•••" onPress={() => {}} />
//     </View>
//   );
// }

// function LargeCard({
//   title,
//   description,
//   rightSlot,
//   footerRight,
// }: {
//   title: string;
//   description: string;
//   rightSlot?: React.ReactNode;
//   footerRight?: React.ReactNode;
// }) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.cardTopRow}>
//         <View style={{ flex: 1, paddingRight: 12 }}>
//           <Text style={styles.cardTitle}>{title}</Text>
//           <Text style={styles.cardDescription}>{description}</Text>
//         </View>
//         {rightSlot}
//       </View>
//       {footerRight ? (
//         <View style={styles.cardFooterRow}>
//           <View style={styles.progressTrack}>
//             <View style={styles.progressFill} />
//           </View>
//           <View style={{ flex: 1 }} />
//           {footerRight}
//         </View>
//       ) : null}
//     </View>
//   );
// }

// function Section({ title, subtitle }: { title: string; subtitle?: string }) {
//   return (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
//     </View>
//   );
// }

// function ListItem({
//   title,
//   subtitle,
//   onPress,
// }: {
//   title: string;
//   subtitle?: string;
//   onPress: () => void;
// }) {
//   return (
//     <Pressable onPress={onPress} style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.itemTitle}>{title}</Text>
//         {subtitle ? <Text style={styles.itemSubtitle}>{subtitle}</Text> : null}
//       </View>
//       <View style={styles.chevron}>
//         <Text style={styles.chevronText}>›</Text>
//       </View>
//     </Pressable>
//   );
// }

// function CircleIcon({
//   label,
//   onPress,
//   bg = colors.card,
//   fg = colors.text,
// }: {
//   label: string;
//   onPress: () => void;
//   bg?: string;
//   fg?: string;
// }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [
//         styles.circle,
//         { backgroundColor: bg },
//         pressed && { transform: [{ scale: 0.98 }] },
//       ]}
//       accessibilityRole="button"
//       accessibilityLabel={label}
//     >
//       <Text style={[styles.circleText, { color: fg }]}>{label}</Text>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: colors.bg },
//   container: { padding: 20, paddingBottom: 40 },
//   stack24: { gap: 24 },
//   stack12: { gap: 12 },

//   header: {
//     marginLeft: wp('5%'),
//   },
//   brand: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: colors.text,
//     letterSpacing: 0.3,
//   },
//   tagline: {
//     fontSize: 14,
//     color: colors.subtext,
//     marginTop: 4,
//   },

//   card: {
//     backgroundColor: colors.card,
//     borderRadius: 18,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: colors.border,
//     shadowColor: colors.shadow,
//     shadowOpacity: 1,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 6,
//   },
//   cardTopRow: { flexDirection: "row", alignItems: "center" },
//   cardTitle: { fontSize: 18, fontWeight: "700", color: colors.text, marginBottom: 6 },
//   cardDescription: { fontSize: 14, color: colors.subtext },
//   cardFooterRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 16,
//   },

//   progressTrack: {
//     height: 6,
//     width: 120,
//     backgroundColor: "#E2E8F0",
//     borderRadius: 999,
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: 6,
//     width: 72,
//     backgroundColor: colors.brand,
//     borderRadius: 999,
//   },

//   badgeMuted: {
//     fontSize: 13,
//     color: colors.subtext,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 999,
//     overflow: "hidden",
//   },

//   section: { marginTop: 28, marginBottom: 8 },
//   sectionTitle: { fontSize: 18, fontWeight: "800", color: colors.text },
//   sectionSubtitle: { fontSize: 14, color: colors.subtext, marginTop: 6 },

//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.card,
//     borderRadius: 16,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: colors.border,
//     shadowColor: colors.shadow,
//     shadowOpacity: 1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//     elevation: 4,
//   },
//   itemPressed: { opacity: 0.95 },
//   itemTitle: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 4 },
//   itemSubtitle: { fontSize: 13, color: colors.subtext },
//   chevron: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#F1F5F9",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 12,
//   },
//   chevronText: { fontSize: 20, color: colors.brandDark, lineHeight: 20 },

//   circle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: colors.border,
//     borderWidth: 1,
//   },
//   circleText: { fontSize: 18, fontWeight: "800" },
// });
