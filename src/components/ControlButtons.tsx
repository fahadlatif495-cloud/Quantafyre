import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { QuantumState } from '../types';
import { getStateColor } from '../utils/quantumUtils';
import { COLORS } from '../constants';

interface ControlButtonsProps {
  quantumState: QuantumState;
  onBoost: () => void;
  onRelease: () => void;
  onReset: () => void;
}

export const ControlButtons = ({
  quantumState,
  onBoost,
  onRelease,
  onReset,
}: ControlButtonsProps) => {
  const stateColor = getStateColor(quantumState);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.boostButton, { borderColor: stateColor }]}
        onPress={onBoost}
        activeOpacity={0.8}
        accessibilityLabel="Boost Energy"
        accessibilityRole="button"
      >
        <Text style={[styles.buttonText, { color: stateColor }]}>
          ⚡ BOOST
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.releaseButton]}
        onPress={onRelease}
        activeOpacity={0.8}
        accessibilityLabel="Release Energy"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>🔻 RELEASE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.resetButton]}
        onPress={onReset}
        activeOpacity={0.8}
        accessibilityLabel="Reset Energy"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>🔄 RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginVertical: 20,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  boostButton: {
    borderColor: COLORS.buttons.boost,
  },
  releaseButton: {
    borderColor: COLORS.buttons.release,
  },
  resetButton: {
    borderColor: COLORS.buttons.reset,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    letterSpacing: 2,
  },
});
