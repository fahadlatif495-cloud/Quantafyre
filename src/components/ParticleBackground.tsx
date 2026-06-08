import { View, Animated, StyleSheet } from 'react-native';
import { Particle } from '../types';
import { getStateColor } from '../utils/quantumUtils';
import { QuantumState } from '../types';
import { PARTICLE_SIZE } from '../constants';

interface ParticleBackgroundProps {
  particles: Particle[];
  quantumState: QuantumState;
}

export const ParticleBackground = ({
  particles,
  quantumState,
}: ParticleBackgroundProps) => {
  const stateColor = getStateColor(quantumState);

  if (!particles || particles.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              left: particle.initialX,
              top: particle.initialY,
              opacity: particle.opacity,
              backgroundColor: stateColor,
              transform: [
                { translateX: particle.translateX },
                { translateY: particle.translateY },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: PARTICLE_SIZE,
    height: PARTICLE_SIZE,
    borderRadius: PARTICLE_SIZE / 2,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
});
