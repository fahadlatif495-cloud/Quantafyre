import { View, Text, StyleSheet } from 'react-native';
import { QuantumState } from '../types';
import { getStateColor, getStateName } from '../utils/quantumUtils';

interface QuantumStateDisplayProps {
  state: QuantumState;
}

export const QuantumStateDisplay = ({ state }: QuantumStateDisplayProps) => {
  const stateColor = getStateColor(state);
  const stateName = getStateName(state);

  return (
    <View style={styles.container}>
      <View style={[styles.box, { borderColor: stateColor }]}>
        <Text style={[styles.label, { color: stateColor }]}>
          QUANTUM STATE
        </Text>
        <Text style={[styles.value, { color: stateColor }]}>{stateName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 30,
  },
  box: {
    width: '90%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 8,
    opacity: 0.8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});
