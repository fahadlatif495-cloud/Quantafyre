import { View, Text, StyleSheet } from 'react-native';
import { QuantumState } from '../types';
import { getStateColor } from '../utils/quantumUtils';
import { COLORS } from '../constants';

interface EnergyLevelIndicatorProps {
  energyLevel: number;
  quantumState: QuantumState;
}

export const EnergyLevelIndicator = ({
  energyLevel,
  quantumState,
}: EnergyLevelIndicatorProps) => {
  const stateColor = getStateColor(quantumState);
  const safeEnergyLevel = Math.max(0, Math.min(100, energyLevel));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ENERGY LEVEL</Text>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            { width: `${safeEnergyLevel}%`, backgroundColor: stateColor },
          ]}
        />
      </View>
      <Text style={[styles.value, { color: stateColor }]}>
        {safeEnergyLevel}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  barContainer: {
    width: '100%',
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bar: {
    height: '100%',
    borderRadius: 12,
    shadowColor: COLORS.quantum.excited,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
});
