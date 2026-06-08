import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING } from '../../constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  icon?: string;
  colors?: [string, string];
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  icon,
  colors,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const getColors = (): [string, string] => {
    if (colors) return colors;
    switch (variant) {
      case 'secondary':
        return [COLORS.surfaceLight, COLORS.surface];
      case 'danger':
        return ['#EF4444', '#DC2626'];
      default:
        return [COLORS.primary, COLORS.primaryDark];
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[disabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={getColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={variant === 'secondary' ? COLORS.textPrimary : '#FFFFFF'}
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.text,
            variant === 'secondary' && styles.textSecondary,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textSecondary: {
    color: COLORS.textPrimary,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});
