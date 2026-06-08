import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitCategory, HabitStats } from '../types/habit';
import {
  generateId,
  getTodayString,
  calculateHabitStats,
  calculateStreak,
} from '../utils/habitUtils';
import { CATEGORY_CONFIG } from '../constants/theme';

const HABITS_STORAGE_KEY = '@habits_storage';

interface UseHabitsReturn {
  habits: Habit[];
  stats: HabitStats;
  isLoading: boolean;
  addHabit: (title: string, category: HabitCategory, description?: string) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitCompletion: (id: string, date?: string) => Promise<void>;
  getHabitById: (id: string) => Habit | undefined;
  getHabitStreak: (habit: Habit) => number;
}

export const useHabits = (): UseHabitsReturn => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load habits from AsyncStorage
  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const stored = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
      if (stored) {
        setHabits(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHabits = async (newHabits: Habit[]) => {
    try {
      await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(newHabits));
      setHabits(newHabits);
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  const addHabit = useCallback(
    async (title: string, category: HabitCategory, description?: string) => {
      const categoryConfig = CATEGORY_CONFIG[category];
      const newHabit: Habit = {
        id: generateId(),
        title,
        category,
        icon: categoryConfig.icon,
        color: categoryConfig.color,
        createdAt: new Date().toISOString(),
        completionHistory: [],
        description,
      };

      const updatedHabits = [...habits, newHabit];
      await saveHabits(updatedHabits);
    },
    [habits]
  );

  const updateHabit = useCallback(
    async (id: string, updates: Partial<Habit>) => {
      const updatedHabits = habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              ...updates,
              // Update icon and color if category changes
              ...(updates.category && {
                icon: CATEGORY_CONFIG[updates.category].icon,
                color: CATEGORY_CONFIG[updates.category].color,
              }),
            }
          : habit
      );
      await saveHabits(updatedHabits);
    },
    [habits]
  );

  const deleteHabit = useCallback(
    async (id: string) => {
      const updatedHabits = habits.filter((habit) => habit.id !== id);
      await saveHabits(updatedHabits);
    },
    [habits]
  );

  const toggleHabitCompletion = useCallback(
    async (id: string, date?: string) => {
      const targetDate = date || getTodayString();

      const updatedHabits = habits.map((habit) => {
        if (habit.id !== id) return habit;

        const existingRecordIndex = habit.completionHistory.findIndex(
          (record) => record.date === targetDate
        );

        let newHistory = [...habit.completionHistory];

        if (existingRecordIndex >= 0) {
          // Toggle existing record
          newHistory[existingRecordIndex] = {
            ...newHistory[existingRecordIndex],
            completed: !newHistory[existingRecordIndex].completed,
          };
        } else {
          // Add new record
          newHistory.push({ date: targetDate, completed: true });
        }

        return { ...habit, completionHistory: newHistory };
      });

      await saveHabits(updatedHabits);
    },
    [habits]
  );

  const getHabitById = useCallback(
    (id: string) => habits.find((habit) => habit.id === id),
    [habits]
  );

  const getHabitStreak = useCallback((habit: Habit) => {
    return calculateStreak(habit.completionHistory);
  }, []);

  const stats = calculateHabitStats(habits);

  return {
    habits,
    stats,
    isLoading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitById,
    getHabitStreak,
  };
};
