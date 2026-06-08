export const COLORS = {
  background: '#0A0E27',
  text: {
    primary: '#FFFFFF',
    secondary: '#8892B0',
  },
  quantum: {
    ground: '#00FF88',
    excited: '#00FFFF',
    super: '#FF00FF',
  },
  buttons: {
    boost: '#00FF88',
    release: '#FF6B6B',
    reset: '#8892B0',
  },
} as const;

export const QUANTUM_STATES = {
  GROUND: 'ground',
  EXCITED: 'excited',
  SUPER: 'super',
} as const;

export const ENERGY_THRESHOLDS = {
  EXCITED: 50,
  SUPER: 80,
} as const;

export const ENERGY_STEP = 10;
export const INITIAL_ENERGY = 50;
export const MIN_ENERGY = 0;
export const MAX_ENERGY = 100;

export const PARTICLE_COUNT = 20;
export const PARTICLE_SIZE = 4;
