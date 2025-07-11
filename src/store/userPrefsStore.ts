// store/userPrefsStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserPrefsState = {
  hasSeenHabitsIntro: boolean;
  setHasSeenHabitsIntro: (value: boolean) => void;
};

export const useUserPrefsStore = create<UserPrefsState>((set) => ({
  hasSeenHabitsIntro: false,
  setHasSeenHabitsIntro: (value) => {
    AsyncStorage.setItem('hasSeenHabitsIntro', JSON.stringify(value));
    set({ hasSeenHabitsIntro: value });
  },
}));

// Load from AsyncStorage on app init
export const loadUserPrefs = async () => {
  const seen = await AsyncStorage.getItem('hasSeenHabitsIntro');
  if (seen !== null) {
    useUserPrefsStore.getState().setHasSeenHabitsIntro(JSON.parse(seen));
  }
};
