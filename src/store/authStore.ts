import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setAuthToken } from '@/services/api';

interface User {
  name: string | null;
  age: string | null;
  gender: string | null;
  display_photo: string | null;
  email: string  |undefined;
  mobile_no: string | null;
  google_id: string | null;
  apple_id: string | null;
  remember_token: string | null;
  current_team_id: string | null;
  expo_token: string | null;
  api_token: string | null;
  device_token: string | null;
  profile_status: string | null;
  is_paid: string | null;
  created_at: string | null;
}
interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  restoreSession: () => Promise<void>;
  introShown: boolean;
  habit: any;
  setHabit: (habit: any) => void;
  setIntroShown: (value: boolean) => void;
  loadIntroStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  habit: null,
  introShown: false,


  setHabit: (habit) => {
    AsyncStorage.setItem('habit', JSON.stringify(habit));
    set({ habit });
  },

  setIntroShown: async (value) => {
    await AsyncStorage.setItem('introShown', JSON.stringify(value));
    set({ introShown: value });
  },

  loadIntroStatus: async () => {
    const value = await AsyncStorage.getItem('introShown');
    if (value !== null) {
      set({ introShown: JSON.parse(value) });
    }
  },

  setToken: (token) => {
    AsyncStorage.setItem('token', token);
    set({ token });
  },

  setUser: (user) => {
    AsyncStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  // ✅ Login combines both token + user setting
  login: (token, user) => {
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token); // ✅ <-- attach token to axios
    set({ token, user });
  },


  logout: async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      await GoogleSignin.revokeAccess(); // <-- revokes token on Google's end
      await GoogleSignin.signOut();      // <-- signs out locally
    } catch (error) {
      console.warn('Google logout error:', error);
    }

    set({ token: null, user: null });
  },

  restoreSession: async () => {
    const [token, user] = await AsyncStorage.multiGet(['token', 'user']);
    if (token[1])
      setAuthToken(token[1]); // ✅ <-- attach token on app load
    set({ token: token[1] });
    if (user[1]) set({ user: JSON.parse(user[1]) });
  },
}));
