import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setAuthToken } from '../services/api';

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  name: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  restoreSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set: (arg0: { isLoggedIn: boolean; token: any; name: any; }) => void) => ({
  isLoggedIn: false,
  token: null,
  name: null,

  login: async (email: any, password: any) => {
    try {
      const response = await api.post('/login', { email, password });

      if (response.data.success) {
        const { token, name } = response.data.data;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('name', name);

        setAuthToken(token);

        set({ isLoggedIn: true, token, name });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  },

  logout: () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
    set({ isLoggedIn: false, token: null, name: null });
  },

  restoreSession: async () => {
    const token = await AsyncStorage.getItem('token');
    const name = await AsyncStorage.getItem('name');

    if (token) {
      setAuthToken(token);
      set({ isLoggedIn: true, token, name });
    }
  },
}));
