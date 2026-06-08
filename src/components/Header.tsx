import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUANTAFYRE</Text>
      <Text style={styles.subtitle}>Quantum Energy System</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    letterSpacing: 4,
    textShadowColor: COLORS.quantum.excited,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    letterSpacing: 2,
    fontWeight: '300',
  },
});
