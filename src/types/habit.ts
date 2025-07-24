import api from "../services/api";

// src/types/habit.ts
export interface Habit {
  id: string;
  title: string;
  completed: boolean;
}


export interface CreateHabitPayload {
  habit_name: string;
  habit_description?: string;
  habit_time?: string; // e.g. '08:30'
  habit_startdate?: string; // e.g. '2025-07-25'
  habit_category?: string;
  habit_frequency?: string;
  duration?: string;
  habit_progress_status?: boolean;
  reminders?: string[]; // e.g. ['09:00', '18:00']
  habit_status?:String;
}
export const createHabit = async (data: CreateHabitPayload) => {
  const response = await api.post('/userhabits', data);
  return response.data;
};