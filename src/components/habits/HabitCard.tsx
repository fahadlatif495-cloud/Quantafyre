import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Habit } from '../../types/habit';
import { COLORS, BORDER_RADIUS, SPACING, CATEGORY_CONFIG } from '../../constants/theme';
import { isCompletedToday, calculateStreak } from '../../utils/habitUtils';

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onPress: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = React.memo(
  ({ habit, onToggle, onPress }) => {
    const isCompleted = isCompletedToday(habit);
    const streak = calculateStreak(habit.completionHistory);
    const categoryConfig = CATEGORY_CONFIG[habit.category];

    const handleToggle = useCallback(() => {
      onToggle();
    }, [onToggle]);

    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.content}>
          {/* Icon with gradient background */}
          <LinearGradient
            colors={categoryConfig.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons
              name={categoryConfig.icon as any}
              size={22}
              color="#FFFFFF"
            />
          </LinearGradient>

          {/* Habit Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {habit.title}
            </Text>
            <Text style={styles.category}>
              {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
            </Text>
            {streak > 0 && (
              <View style={styles.streakContainer}>
                <Ionicons name="flame" size={14} color={COLORS.streak} />
                <Text style={styles.streakText}>
                  {streak} day{streak !== 1 ? 's' : ''} streak
                </Text>
              </View>
            )}
          </View>

          {/* Checkbox */}
          <TouchableOpacity
            onPress={handleToggle}
            style={styles.checkboxTouchable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View
              style={[
                styles.checkbox,
                isCompleted && styles.checkboxCompleted,
                isCompleted && { borderColor: categoryConfig.color },
              ]}
            >
              {isCompleted && (
                <LinearGradient
                  colors={categoryConfig.gradient}
                  style={styles.checkboxGradient}
                >
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                </LinearGradient>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Subtle completion indicator line */}
        {isCompleted && (
          <LinearGradient
            colors={[...categoryConfig.gradient, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.completionIndicator}
          />
        )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 12,
    color: COLORS.streak,
    marginLeft: 4,
    fontWeight: '500',
  },
  checkboxTouchable: {
    padding: SPACING.xs,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.checkboxInactive,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  checkboxCompleted: {
    borderWidth: 0,
  },
  checkboxGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionIndicator: {
    height: 3,
    width: '100%',
  },
});
