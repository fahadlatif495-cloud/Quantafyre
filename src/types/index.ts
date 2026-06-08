import { Animated } from 'react-native';

export type QuantumState = 'ground' | 'excited' | 'super';

export interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  translateX: Animated.Value;
  translateY: Animated.Value;
  opacity: Animated.Value;
}
