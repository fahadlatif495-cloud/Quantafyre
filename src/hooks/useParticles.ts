import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { Particle } from '../types';
import { PARTICLE_COUNT } from '../constants';

export const useParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRefs = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    const dimensions = Dimensions.get('window');
    const width = dimensions.width || 375;
    const height = dimensions.height || 667;

    if (width <= 0 || height <= 0) {
      return;
    }

    const newParticles: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const initialX = Math.random() * width;
      const initialY = Math.random() * height;
      
      newParticles.push({
        id: i,
        initialX,
        initialY,
        translateX: new Animated.Value(0),
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0.3 + Math.random() * 0.4),
      });
    }
    
    setParticles(newParticles);

    const createAnimation = (particle: Particle): Animated.CompositeAnimation => {
      const getRandomDelta = () => {
        const maxDelta = Math.min(width, height) * 0.5;
        return {
          deltaX: (Math.random() - 0.5) * maxDelta,
          deltaY: (Math.random() - 0.5) * maxDelta,
        };
      };

      const animateSequence = () => {
        const { deltaX, deltaY } = getRandomDelta();
        const duration = 3000 + Math.random() * 2000;
        
        return Animated.sequence([
          Animated.parallel([
            Animated.timing(particle.translateX, {
              toValue: deltaX,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(particle.translateY, {
              toValue: deltaY,
              duration,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: 0.8,
                duration: 1500,
                useNativeDriver: true,
              }),
              Animated.timing(particle.opacity, {
                toValue: 0.2,
                duration: 1500,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.parallel([
            Animated.timing(particle.translateX, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(particle.translateY, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }),
          ]),
        ]);
      };

      return Animated.loop(animateSequence());
    };

    const animations = newParticles.map(createAnimation);

    animationRefs.current = animations;
    animations.forEach((anim) => anim.start());

    return () => {
      animationRefs.current.forEach((anim) => anim.stop());
    };
  }, []);

  return particles;
};
