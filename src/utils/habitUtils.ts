import { Habit, HabitCompletionRecord, HabitStats } from '../types/habit';

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const isCompletedToday = (habit: Habit): boolean => {
  const today = getTodayString();
  return habit.completionHistory.some(
    (record) => record.date === today && record.completed
  );
};

export const calculateStreak = (completionHistory: HabitCompletionRecord[]): number => {
  if (completionHistory.length === 0) return 0;

  // Sort by date descending
  const sortedHistory = [...completionHistory]
    .filter((record) => record.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedHistory.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentDate = today;
  const todayStr = getTodayString();

  // Check if today is completed
  const todayCompleted = sortedHistory.some((r) => r.date === todayStr);
  
  // If today is not completed, start checking from yesterday
  if (!todayCompleted) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  for (let i = 0; i < 365; i++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const completed = sortedHistory.some((r) => r.date === dateStr);
    
    if (completed) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const calculateLongestStreak = (completionHistory: HabitCompletionRecord[]): number => {
  if (completionHistory.length === 0) return 0;

  const completedDates = completionHistory
    .filter((record) => record.completed)
    .map((record) => new Date(record.date))
    .sort((a, b) => a.getTime() - b.getTime());

  if (completedDates.length === 0) return 0;

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < completedDates.length; i++) {
    const prevDate = completedDates[i - 1];
    const currDate = completedDates[i];
    const diffDays = Math.round(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
};

export const calculateHabitStats = (habits: Habit[]): HabitStats => {
  const today = getTodayString();
  const completedToday = habits.filter((habit) =>
    habit.completionHistory.some(
      (record) => record.date === today && record.completed
    )
  ).length;

  const totalCompletions = habits.reduce((sum, habit) => {
    return sum + habit.completionHistory.filter((r) => r.completed).length;
  }, 0);

  const totalPossible = habits.reduce((sum, habit) => {
    const daysSinceCreation = Math.max(
      1,
      Math.ceil(
        (new Date().getTime() - new Date(habit.createdAt).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    return sum + daysSinceCreation;
  }, 0);

  const completionRate = totalPossible > 0 
    ? Math.round((totalCompletions / totalPossible) * 100) 
    : 0;

  const allStreaks = habits.map((habit) => calculateStreak(habit.completionHistory));
  const currentStreak = Math.max(0, ...allStreaks);

  const allLongestStreaks = habits.map((habit) =>
    calculateLongestStreak(habit.completionHistory)
  );
  const longestStreak = Math.max(0, ...allLongestStreaks);

  return {
    totalHabits: habits.length,
    completedToday,
    completionRate,
    currentStreak,
    longestStreak,
  };
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getWeekDates = (weeksBack: number = 0): string[] => {
  const dates: string[] = [];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() - weeksBack * 7);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
};

export const getDayName = (dateString: string, short: boolean = true): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: short ? 'short' : 'long' };
  return date.toLocaleDateString('en-US', options);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
