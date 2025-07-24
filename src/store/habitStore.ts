// src/store/useHabitsStore.ts
import { create } from 'zustand';
import api from '../services/api';
import { Habit } from '../types/habit';

interface HabitsStore {
  habits: Habit[];
  loading: boolean;
  fetchHabits: () => Promise<void>;
  addHabit: (newHabit: Habit) => void;
  toggleHabitCompletion: (id: string) => void;
}

export const useHabitsStore = create<HabitsStore>((set) => ({
  habits: [],
  loading: false,

  fetchHabits: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/userhabits');
      const rawHabits = response.data.habits;
      const formatted: Habit[] = rawHabits.map((habit: any) => ({
        id: habit.id.toString(),
        title: habit.habit_name,
        completed: habit.habit_progress_status === 'true',
      }));
      set({ habits: formatted });
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      set({ loading: false });
    }
  },

  addHabit: (newHabit: Habit) => {
    set((state) => ({
      habits: [newHabit, ...state.habits], // prepend for latest
    }));
  },

  toggleHabitCompletion: (id: string) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      ),
    })),
}));
