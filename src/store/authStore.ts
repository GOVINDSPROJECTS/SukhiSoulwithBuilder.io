import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setAuthToken } from '@/services/api';


interface AuthState {
  token: string | null;
  user: { name: string; email: string } | null;
  setToken: (token: string) => void;
  setUser: (user: { name: string; email: string }) => void;
  login: (token: string, user: { name: string; email: string }) => void;
  logout: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

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
