import { QuantumState } from '../types';
import { COLORS, QUANTUM_STATES, ENERGY_THRESHOLDS } from '../constants';

export const getQuantumState = (energyLevel: number): QuantumState => {
  const safeLevel = Math.max(0, Math.min(100, energyLevel));
  
  if (safeLevel >= ENERGY_THRESHOLDS.SUPER) {
    return QUANTUM_STATES.SUPER;
  }
  if (safeLevel >= ENERGY_THRESHOLDS.EXCITED) {
    return QUANTUM_STATES.EXCITED;
  }
  return QUANTUM_STATES.GROUND;
};

export const getStateColor = (state: QuantumState): string => {
  switch (state) {
    case QUANTUM_STATES.SUPER:
      return COLORS.quantum.super;
    case QUANTUM_STATES.EXCITED:
      return COLORS.quantum.excited;
    default:
      return COLORS.quantum.ground;
  }
};

export const getStateName = (state: QuantumState): string => {
  switch (state) {
    case QUANTUM_STATES.SUPER:
      return 'SUPERPOSITION';
    case QUANTUM_STATES.EXCITED:
      return 'EXCITED';
    default:
      return 'GROUND';
  }
};

export const calculateEnergyLevel = (
  currentLevel: number,
  change: number,
  min: number,
  max: number
): number => {
  const newLevel = currentLevel + change;
  return Math.max(min, Math.min(max, newLevel));
};
