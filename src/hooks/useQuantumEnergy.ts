import { useState, useCallback } from 'react';
import { QuantumState } from '../types';
import {
  INITIAL_ENERGY,
  MIN_ENERGY,
  MAX_ENERGY,
  ENERGY_STEP,
} from '../constants';
import { getQuantumState, calculateEnergyLevel } from '../utils/quantumUtils';

export const useQuantumEnergy = () => {
  const [energyLevel, setEnergyLevel] = useState<number>(INITIAL_ENERGY);
  const [quantumState, setQuantumState] = useState<QuantumState>(
    getQuantumState(INITIAL_ENERGY)
  );

  const updateEnergy = useCallback((change: number) => {
    setEnergyLevel((prevLevel) => {
      const newLevel = calculateEnergyLevel(
        prevLevel,
        change,
        MIN_ENERGY,
        MAX_ENERGY
      );
      const newState = getQuantumState(newLevel);
      setQuantumState(newState);
      return newLevel;
    });
  }, []);

  const handleBoost = useCallback(() => {
    updateEnergy(ENERGY_STEP);
  }, [updateEnergy]);

  const handleRelease = useCallback(() => {
    updateEnergy(-ENERGY_STEP);
  }, [updateEnergy]);

  const handleReset = useCallback(() => {
    setEnergyLevel(INITIAL_ENERGY);
    setQuantumState(getQuantumState(INITIAL_ENERGY));
  }, []);

  return {
    energyLevel,
    quantumState,
    handleBoost,
    handleRelease,
    handleReset,
  };
};
