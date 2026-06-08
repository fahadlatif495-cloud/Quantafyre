import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Habit } from '../types/habit';
import { useHabits } from '../hooks/useHabits';
import { HabitCard, StatsCard, WeekCalendar, EmptyState } from '../components/habits';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { getTodayString } from '../utils/habitUtils';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { habits, stats, isLoading, toggleHabitCompletion } = useHabits();
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  const handleAddHabit = useCallback(() => {
    navigation.navigate('AddHabit');
  }, [navigation]);

  const handleOpenCalendar = useCallback(() => {
    navigation.navigate('Calendar');
  }, [navigation]);

  const handleOpenProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const handleHabitPress = useCallback(
    (habitId: string) => {
      navigation.navigate('AddHabit', { habitId });
    },
    [navigation]
  );

  const handleToggleHabit = useCallback(
    (habitId: string) => {
      toggleHabitCompletion(habitId, selectedDate);
    },
    [toggleHabitCompletion, selectedDate]
  );

  const completedDates = habits.flatMap((habit) =>
    habit.completionHistory
      .filter((record) => record.completed)
      .map((record) => record.date)
  );

  const renderHabitItem = useCallback(
    ({ item }: { item: Habit }) => (
      <HabitCard
        habit={item}
        onToggle={() => handleToggleHabit(item.id)}
        onPress={() => handleHabitPress(item.id)}
      />
    ),
    [handleToggleHabit, handleHabitPress]
  );

  const keyExtractor = useCallback((item: Habit) => item.id, []);

  if (isLoading) {
    return (
      <LinearGradient
        colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello there! 👋</Text>
            <Text style={styles.title}>QUANTAFYRE</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={handleOpenCalendar}
            >
              <View style={styles.calendarButtonInner}>
                <Ionicons name="calendar" size={22} color={COLORS.textPrimary} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleOpenProfile}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.profileGradient}
              >
                <Ionicons name="person" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {habits.length === 0 ? (
          <EmptyState onAddHabit={handleAddHabit} />
        ) : (
          <FlatList
            data={habits}
            renderItem={renderHabitItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <>
                <StatsCard stats={stats} />
                <WeekCalendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  completedDates={[...new Set(completedDates)]}
                />
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Your Habits</Text>
                  <Text style={styles.habitCount}>{habits.length} habits</Text>
                </View>
              </>
            }
          />
        )}

        {/* FAB */}
        {habits.length > 0 && (
          <TouchableOpacity
            style={styles.fabContainer}
            onPress={handleAddHabit}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.fab}
            >
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarButton: {
    marginRight: SPACING.sm,
  },
  calendarButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  profileButton: {
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  habitCount: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  fabContainer: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
    borderRadius: 30,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
