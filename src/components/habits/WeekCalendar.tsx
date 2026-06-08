import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING } from '../../constants/theme';
import { getWeekDates, getDayName, getTodayString } from '../../utils/habitUtils';

interface WeekCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  completedDates?: string[];
}

export const WeekCalendar: React.FC<WeekCalendarProps> = React.memo(
  ({ selectedDate, onDateSelect, completedDates = [] }) => {
    const weekDates = useMemo(() => getWeekDates(), []);
    const today = getTodayString();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>This Week</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.daysContainer}>
          {weekDates.map((date) => {
            const isSelected = date === selectedDate;
            const isToday = date === today;
            const hasCompletions = completedDates.includes(date);
            const dayNum = new Date(date).getDate();

            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dayItem,
                  isSelected && styles.dayItemSelected,
                  isToday && !isSelected && styles.dayItemToday,
                ]}
                onPress={() => onDateSelect(date)}
              >
                <Text
                  style={[
                    styles.dayName,
                    isSelected && styles.dayNameSelected,
                  ]}
                >
                  {getDayName(date)}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    isSelected && styles.dayNumberSelected,
                    isToday && !isSelected && styles.dayNumberToday,
                  ]}
                >
                  {dayNum}
                </Text>
                {hasCompletions && !isSelected && (
                  <View style={styles.completionDot} />
                )}
                {isSelected && hasCompletions && (
                  <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  calendarButton: {
    padding: SPACING.xs,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 44,
  },
  dayItemSelected: {
    backgroundColor: COLORS.primary,
  },
  dayItemToday: {
    backgroundColor: COLORS.surfaceLight,
  },
  dayName: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dayNameSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dayNumberSelected: {
    color: '#FFFFFF',
  },
  dayNumberToday: {
    color: COLORS.textPrimary,
  },
  completionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
});
