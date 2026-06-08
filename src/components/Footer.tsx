import { View, Text, StyleSheet } from 'react-native';
import { QuantumState } from '../types';
import { COLORS } from '../constants';

interface FooterProps {
  quantumState: QuantumState;
}

export const Footer = ({ quantumState }: FooterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Quantum particles in {quantumState} state
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    color: COLORS.text.secondary,
    opacity: 0.6,
    letterSpacing: 1,
  },
});
