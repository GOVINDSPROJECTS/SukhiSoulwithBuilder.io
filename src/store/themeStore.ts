import { create } from 'zustand';

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: false,
  toggleTheme: () => set({ isDarkMode: !get().isDarkMode }),
}));
