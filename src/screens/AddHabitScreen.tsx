import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, HabitCategory } from '../types/habit';
import { useHabits } from '../hooks/useHabits';
import { CategorySelector } from '../components/habits';
import { GradientButton } from '../components/common';
import { COLORS, SPACING, BORDER_RADIUS, CATEGORY_CONFIG } from '../constants/theme';

type AddHabitScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddHabit'>;
  route: RouteProp<RootStackParamList, 'AddHabit'>;
};

export const AddHabitScreen: React.FC<AddHabitScreenProps> = ({
  navigation,
  route,
}) => {
  const habitId = route.params?.habitId;
  const { addHabit, updateHabit, deleteHabit, getHabitById } = useHabits();
  
  const existingHabit = habitId ? getHabitById(habitId) : undefined;
  const isEditing = !!existingHabit;

  const [title, setTitle] = useState(existingHabit?.title || '');
  const [category, setCategory] = useState<HabitCategory>(
    existingHabit?.category || 'health'
  );
  const [description, setDescription] = useState(existingHabit?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingHabit) {
      setTitle(existingHabit.title);
      setCategory(existingHabit.category);
      setDescription(existingHabit.description || '');
    }
  }, [existingHabit]);

  const handleSubmit = useCallback(async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a habit title');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && habitId) {
        await updateHabit(habitId, {
          title: title.trim(),
          category,
          description: description.trim() || undefined,
        });
      } else {
        await addHabit(title.trim(), category, description.trim() || undefined);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save habit');
    } finally {
      setIsSubmitting(false);
    }
  }, [title, category, description, isEditing, habitId, addHabit, updateHabit, navigation]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (habitId) {
              await deleteHabit(habitId);
              navigation.goBack();
            }
          },
        },
      ]
    );
  }, [habitId, deleteHabit, navigation]);

  const selectedCategoryConfig = CATEGORY_CONFIG[category];

  return (
    <LinearGradient
      colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isEditing ? 'Edit Habit' : 'New Habit'}
            </Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <LinearGradient
                colors={selectedCategoryConfig.gradient}
                style={styles.heroIcon}
              >
                <Ionicons
                  name={selectedCategoryConfig.icon as any}
                  size={40}
                  color="#FFFFFF"
                />
              </LinearGradient>
              <Text style={styles.heroTitle}>
                {isEditing ? 'Update Your Habit' : 'Create a New Habit'}
              </Text>
              <Text style={styles.heroSubtitle}>
                {isEditing
                  ? 'Make changes to keep improving'
                  : 'Start building better habits today'}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Title Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Habit Title</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={COLORS.textMuted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Workout 30 minutes"
                    placeholderTextColor={COLORS.textMuted}
                    value={title}
                    onChangeText={setTitle}
                    autoFocus={!isEditing}
                  />
                </View>
              </View>

              {/* Category Selector */}
              <CategorySelector
                selectedCategory={category}
                onSelectCategory={setCategory}
              />

              {/* Description Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description (Optional)</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Add notes or details about this habit..."
                    placeholderTextColor={COLORS.textMuted}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Tips Card */}
              <View style={styles.tipsCard}>
                <View style={styles.tipsHeader}>
                  <Ionicons name="bulb" size={20} color={COLORS.secondary} />
                  <Text style={styles.tipsTitle}>Quick Tips</Text>
                </View>
                <Text style={styles.tipText}>
                  • Be specific about what you want to achieve
                </Text>
                <Text style={styles.tipText}>
                  • Start small and build up gradually
                </Text>
                <Text style={styles.tipText}>
                  • Link habits to existing routines
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            {isEditing && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Ionicons name="trash-outline" size={22} color={COLORS.error} />
              </TouchableOpacity>
            )}
            <View style={styles.submitButtonContainer}>
              <GradientButton
                title={isEditing ? 'Save Changes' : 'Create Habit'}
                onPress={handleSubmit}
                icon={isEditing ? 'checkmark' : 'add'}
                disabled={isSubmitting || !title.trim()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  form: {
    paddingHorizontal: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.md,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingTop: SPACING.md,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 0,
  },
  tipsCard: {
    backgroundColor: COLORS.secondary + '15',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.secondary + '30',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    marginLeft: SPACING.xs,
  },
  tipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundEnd,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.error + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  submitButtonContainer: {
    flex: 1,
  },
});
