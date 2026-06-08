export type HabitCategory = 
  | 'health'
  | 'fitness'
  | 'mindfulness'
  | 'productivity'
  | 'learning'
  | 'social'
  | 'finance'
  | 'creativity'
  | 'other';

export interface HabitCompletionRecord {
  date: string; // ISO date string YYYY-MM-DD
  completed: boolean;
}

export interface Habit {
  id: string;
  title: string;
  category: HabitCategory;
  icon: string;
  color: string;
  createdAt: string;
  completionHistory: HabitCompletionRecord[];
  reminderTime?: string;
  description?: string;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
}

export type RootStackParamList = {
  Home: undefined;
  AddHabit: { habitId?: string } | undefined;
  HabitDetail: { habitId: string };
  Calendar: undefined;
  Profile: undefined;
};
