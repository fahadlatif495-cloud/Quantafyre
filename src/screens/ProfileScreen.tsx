import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/habit';
import { useHabits } from '../hooks/useHabits';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

interface SettingItemProps {
  icon: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconColor,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress && !rightElement}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={[styles.settingIconContainer, { backgroundColor: iconColor + '20' }]}>
      <Ionicons name={icon as any} size={20} color={iconColor} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement || (showArrow && onPress && (
      <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
    ))}
  </TouchableOpacity>
);

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => (
  <View style={styles.statCard}>
    <LinearGradient
      colors={[color + '30', color + '10']}
      style={styles.statIconBg}
    >
      <Ionicons name={icon as any} size={22} color={color} />
    </LinearGradient>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { habits, stats } = useHabits();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);

  // Calculate total completions
  const totalCompletions = useMemo(() => {
    return habits.reduce((sum, habit) => {
      return sum + habit.completionHistory.filter((r) => r.completed).length;
    }, 0);
  }, [habits]);

  // Calculate days since first habit
  const daysSinceStart = useMemo(() => {
    if (habits.length === 0) return 0;
    const firstHabit = habits.reduce((oldest, habit) => {
      return new Date(habit.createdAt) < new Date(oldest.createdAt) ? habit : oldest;
    });
    const days = Math.floor(
      (new Date().getTime() - new Date(firstHabit.createdAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return Math.max(days, 1);
  }, [habits]);

  // Get achievement level
  const achievementLevel = useMemo(() => {
    if (totalCompletions >= 100) return { level: 'Master', icon: 'trophy', color: '#F59E0B' };
    if (totalCompletions >= 50) return { level: 'Expert', icon: 'medal', color: '#8B5CF6' };
    if (totalCompletions >= 20) return { level: 'Pro', icon: 'ribbon', color: '#3B82F6' };
    if (totalCompletions >= 5) return { level: 'Rising', icon: 'star', color: '#10B981' };
    return { level: 'Beginner', icon: 'leaf', color: '#64748B' };
  }, [totalCompletions]);

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
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="settings-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.avatarContainer}
            >
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.userName}>Habit Builder</Text>
            <Text style={styles.userTagline}>Building better habits daily</Text>
            
            {/* Achievement Badge */}
            <View style={[styles.achievementBadge, { backgroundColor: achievementLevel.color + '20' }]}>
              <Ionicons name={achievementLevel.icon as any} size={16} color={achievementLevel.color} />
              <Text style={[styles.achievementText, { color: achievementLevel.color }]}>
                {achievementLevel.level}
              </Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              icon="checkmark-done"
              value={totalCompletions}
              label="Completions"
              color={COLORS.success}
            />
            <StatCard
              icon="flame"
              value={stats.longestStreak}
              label="Best Streak"
              color={COLORS.streak}
            />
            <StatCard
              icon="list"
              value={habits.length}
              label="Habits"
              color={COLORS.info}
            />
            <StatCard
              icon="calendar"
              value={daysSinceStart}
              label="Days Active"
              color={COLORS.secondary}
            />
          </View>

          {/* Progress Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Overall Completion Rate</Text>
                <Text style={styles.progressValue}>{stats.completionRate}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryLight]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: `${Math.min(stats.completionRate, 100)}%` }]}
                />
              </View>
              <Text style={styles.progressHint}>
                {stats.completionRate >= 80
                  ? "🔥 Amazing! Keep it up!"
                  : stats.completionRate >= 50
                  ? "💪 Good progress! Stay consistent!"
                  : "🌱 You're building momentum!"}
              </Text>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.settingsCard}>
              <SettingItem
                icon="notifications"
                iconColor={COLORS.secondary}
                title="Notifications"
                subtitle="Daily reminders"
                rightElement={
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                    thumbColor={notificationsEnabled ? COLORS.primary : COLORS.textMuted}
                  />
                }
                showArrow={false}
              />
              <View style={styles.settingDivider} />
              <SettingItem
                icon="moon"
                iconColor={COLORS.info}
                title="Dark Mode"
                subtitle="Always on"
                rightElement={
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                    thumbColor={darkModeEnabled ? COLORS.primary : COLORS.textMuted}
                  />
                }
                showArrow={false}
              />
            </View>
          </View>

          {/* More Options Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More</Text>
            <View style={styles.settingsCard}>
              <SettingItem
                icon="bar-chart"
                iconColor="#8B5CF6"
                title="Statistics"
                subtitle="View detailed analytics"
                onPress={() => {}}
              />
              <View style={styles.settingDivider} />
              <SettingItem
                icon="cloud-upload"
                iconColor="#10B981"
                title="Backup Data"
                subtitle="Sync your habits"
                onPress={() => {}}
              />
              <View style={styles.settingDivider} />
              <SettingItem
                icon="share-social"
                iconColor="#3B82F6"
                title="Share App"
                subtitle="Invite friends"
                onPress={() => {}}
              />
              <View style={styles.settingDivider} />
              <SettingItem
                icon="help-circle"
                iconColor="#F59E0B"
                title="Help & Support"
                subtitle="FAQs and contact"
                onPress={() => {}}
              />
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <LinearGradient
              colors={[COLORS.primary + '20', COLORS.primaryDark + '10']}
              style={styles.appLogo}
            >
              <Ionicons name="sparkles" size={24} color={COLORS.primary} />
            </LinearGradient>
            <Text style={styles.appName}>Quantafyre</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.appTagline}>Build Better Habits 💫</Text>
          </View>
        </ScrollView>
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
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userTagline: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  achievementText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressHint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  settingDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginLeft: 68,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  appLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  appVersion: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  appTagline: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
