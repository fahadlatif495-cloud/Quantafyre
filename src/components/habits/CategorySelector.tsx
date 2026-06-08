import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { HabitCategory } from '../../types/habit';
import { COLORS, BORDER_RADIUS, SPACING, CATEGORY_CONFIG } from '../../constants/theme';

interface CategorySelectorProps {
  selectedCategory: HabitCategory;
  onSelectCategory: (category: HabitCategory) => void;
}

const categories: HabitCategory[] = [
  'health',
  'fitness',
  'mindfulness',
  'productivity',
  'learning',
  'social',
  'finance',
  'creativity',
  'other',
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category];
          const isSelected = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              onPress={() => onSelectCategory(category)}
              activeOpacity={0.7}
            >
              {isSelected ? (
                <LinearGradient
                  colors={config.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryItem}
                >
                  <Ionicons name={config.icon as any} size={20} color="#FFFFFF" />
                  <Text style={styles.categoryTextSelected}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.categoryItem}>
                  <View
                    style={[
                      styles.iconBackground,
                      { backgroundColor: config.color + '20' },
                    ]}
                  >
                    <Ionicons name={config.icon as any} size={18} color={config.color} />
                  </View>
                  <Text style={styles.categoryText}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  scrollContent: {
    paddingRight: SPACING.md,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
    fontWeight: '500',
  },
  categoryTextSelected: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: SPACING.sm,
    fontWeight: '600',
  },
});
