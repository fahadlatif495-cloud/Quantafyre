import { HabitCategory } from '../types/habit';

export const COLORS = {
  // Primary palette - Deep teal/emerald
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  primaryDark: '#0F766E',
  
  // Secondary palette - Warm amber
  secondary: '#F59E0B',
  secondaryLight: '#FBBF24',
  secondaryDark: '#D97706',
  
  // Background gradients
  backgroundStart: '#0F172A',
  backgroundMiddle: '#1E293B',
  backgroundEnd: '#0F172A',
  
  // Surface colors
  surface: '#1E293B',
  surfaceLight: '#334155',
  surfaceLighter: '#475569',
  
  // Card colors
  cardBackground: 'rgba(30, 41, 59, 0.8)',
  cardBorder: 'rgba(71, 85, 105, 0.5)',
  
  // Text colors
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  
  // Status colors
  success: '#10B981',
  successLight: '#34D399',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Checkbox/toggle
  checkboxActive: '#10B981',
  checkboxInactive: '#475569',
  
  // Streaks
  streak: '#F59E0B',
  streakGlow: 'rgba(245, 158, 11, 0.3)',
};

export const CATEGORY_CONFIG: Record<HabitCategory, { icon: string; color: string; gradient: [string, string] }> = {
  health: {
    icon: 'heart',
    color: '#EF4444',
    gradient: ['#EF4444', '#DC2626'],
  },
  fitness: {
    icon: 'fitness',
    color: '#F97316',
    gradient: ['#F97316', '#EA580C'],
  },
  mindfulness: {
    icon: 'leaf',
    color: '#10B981',
    gradient: ['#10B981', '#059669'],
  },
  productivity: {
    icon: 'flash',
    color: '#3B82F6',
    gradient: ['#3B82F6', '#2563EB'],
  },
  learning: {
    icon: 'book',
    color: '#8B5CF6',
    gradient: ['#8B5CF6', '#7C3AED'],
  },
  social: {
    icon: 'people',
    color: '#EC4899',
    gradient: ['#EC4899', '#DB2777'],
  },
  finance: {
    icon: 'wallet',
    color: '#14B8A6',
    gradient: ['#14B8A6', '#0D9488'],
  },
  creativity: {
    icon: 'color-palette',
    color: '#F59E0B',
    gradient: ['#F59E0B', '#D97706'],
  },
  other: {
    icon: 'star',
    color: '#64748B',
    gradient: ['#64748B', '#475569'],
  },
};

export const FONTS = {
  // Using system fonts for best performance
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  }),
};
