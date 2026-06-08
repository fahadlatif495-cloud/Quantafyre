import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { HabitStats } from '../../types/habit';
import { COLORS, BORDER_RADIUS, SPACING } from '../../constants/theme';

interface StatsCardProps {
  stats: HabitStats;
}

interface StatItemProps {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, color }) => (
  <View style={styles.statItem}>
    <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon as any} size={20} color={color} />
    </View>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const StatsCard: React.FC<StatsCardProps> = React.memo(({ stats }) => {
  return (
    <LinearGradient
      colors={[COLORS.surface, COLORS.surfaceLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Progress</Text>
        <View style={styles.progressRing}>
          <Text style={styles.progressText}>
            {stats.completedToday}/{stats.totalHabits}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsGrid}>
        <StatItem
          icon="checkmark-done"
          value={stats.completedToday}
          label="Completed"
          color={COLORS.success}
        />
        <StatItem
          icon="stats-chart"
          value={`${stats.completionRate}%`}
          label="Rate"
          color={COLORS.info}
        />
        <StatItem
          icon="flame"
          value={stats.currentStreak}
          label="Streak"
          color={COLORS.streak}
        />
        <StatItem
          icon="trophy"
          value={stats.longestStreak}
          label="Best"
          color={COLORS.secondary}
        />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  progressRing: {
    backgroundColor: COLORS.primary + '30',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.primary + '50',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
