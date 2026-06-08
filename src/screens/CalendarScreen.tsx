import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Habit } from '../types/habit';
import { useHabits } from '../hooks/useHabits';
import { COLORS, SPACING, BORDER_RADIUS, CATEGORY_CONFIG } from '../constants/theme';

type CalendarScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Calendar'>;
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface CalendarDay {
  date: number;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasCompletions: boolean;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const { habits } = useHabits();
  const today = new Date();
  
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split('T')[0]
  );

  // Get all completion dates
  const completionDates = useMemo(() => {
    const dates = new Set<string>();
    habits.forEach((habit) => {
      habit.completionHistory.forEach((record) => {
        if (record.completed) {
          dates.add(record.date);
        }
      });
    });
    return dates;
  }, [habits]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const todayString = today.toISOString().split('T')[0];

    // Previous month days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = prevMonthLastDay - i;
      const month = currentMonth === 0 ? 11 : currentMonth - 1;
      const year = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      
      days.push({
        date,
        dateString,
        isCurrentMonth: false,
        isToday: false,
        hasCompletions: completionDates.has(dateString),
      });
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      
      days.push({
        date,
        dateString,
        isCurrentMonth: true,
        isToday: dateString === todayString,
        hasCompletions: completionDates.has(dateString),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let date = 1; date <= remainingDays; date++) {
      const month = currentMonth === 11 ? 0 : currentMonth + 1;
      const year = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      
      days.push({
        date,
        dateString,
        isCurrentMonth: false,
        isToday: false,
        hasCompletions: completionDates.has(dateString),
      });
    }

    return days;
  }, [currentMonth, currentYear, completionDates]);

  // Get completed habits for selected date
  const completedHabitsForDate = useMemo(() => {
    return habits.filter((habit) =>
      habit.completionHistory.some(
        (record) => record.date === selectedDate && record.completed
      )
    );
  }, [habits, selectedDate]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderDayItem = useCallback(
    ({ item }: { item: CalendarDay }) => {
      const isSelected = item.dateString === selectedDate;

      return (
        <TouchableOpacity
          style={[
            styles.dayCell,
            isSelected && styles.dayCellSelected,
            item.isToday && !isSelected && styles.dayCellToday,
          ]}
          onPress={() => setSelectedDate(item.dateString)}
        >
          <Text
            style={[
              styles.dayText,
              !item.isCurrentMonth && styles.dayTextMuted,
              isSelected && styles.dayTextSelected,
              item.isToday && !isSelected && styles.dayTextToday,
            ]}
          >
            {item.date}
          </Text>
          {item.hasCompletions && !isSelected && (
            <View style={styles.completionDot} />
          )}
        </TouchableOpacity>
      );
    },
    [selectedDate]
  );

  const renderHabitItem = useCallback(
    ({ item }: { item: Habit }) => {
      const categoryConfig = CATEGORY_CONFIG[item.category];

      return (
        <View style={styles.habitItem}>
          <LinearGradient
            colors={categoryConfig.gradient}
            style={styles.habitIcon}
          >
            <Ionicons name={categoryConfig.icon as any} size={18} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.habitInfo}>
            <Text style={styles.habitTitle}>{item.title}</Text>
            <Text style={styles.habitCategory}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
          </View>
          <View style={styles.checkMark}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          </View>
        </View>
      );
    },
    []
  );

  return (
    <LinearGradient
      colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendar</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          {/* Calendar Header */}
          <View style={styles.calendarHeader}>
            <View style={styles.calendarIconContainer}>
              <Ionicons name="calendar" size={24} color={COLORS.textPrimary} />
            </View>
            <View style={styles.calendarHeaderText}>
              <Text style={styles.calendarTitle}>Habit Calendar</Text>
              <Text style={styles.calendarSubtitle}>Track your daily progress</Text>
            </View>
          </View>

          {/* Month Navigation */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
              <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {MONTHS[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
              <Ionicons name="chevron-forward" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Day Headers */}
          <View style={styles.dayHeaders}>
            {DAYS.map((day) => (
              <Text key={day} style={styles.dayHeader}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <FlatList
            data={calendarDays}
            renderItem={renderDayItem}
            keyExtractor={(item) => item.dateString}
            numColumns={7}
            scrollEnabled={false}
            contentContainerStyle={styles.calendarGrid}
          />
        </View>

        {/* Completed Habits Section */}
        <View style={styles.completedSection}>
          <View style={styles.completedHeader}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.completedTitle}>
              Completed on {formatSelectedDate(selectedDate)}
            </Text>
          </View>

          {completedHabitsForDate.length > 0 ? (
            <FlatList
              data={completedHabitsForDate}
              renderItem={renderHabitItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.habitsList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>No habits completed on this day</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  calendarCard: {
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  calendarIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  calendarHeaderText: {
    flex: 1,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  calendarSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  navButton: {
    padding: SPACING.xs,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  calendarGrid: {
    alignItems: 'center',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  dayCellToday: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.full,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  dayTextMuted: {
    color: COLORS.textMuted,
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dayTextToday: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  completionDot: {
    position: 'absolute',
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.success,
  },
  completedSection: {
    flex: 1,
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
  },
  completedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  habitsList: {
    paddingBottom: SPACING.lg,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  habitIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  habitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  habitCategory: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  checkMark: {
    marginLeft: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
});
