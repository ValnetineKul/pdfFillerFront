import { defineRecipe } from '@pandacss/dev';

export const glowPulseRecipe = defineRecipe({
  className: 'glowPulseBorder',
  base: {
    position: 'relative',

    _before: {
      content: '""',
      position: 'absolute',
      inset: '-4px',
      borderRadius: 'glowPulseBorder',
      border: '5px solid',
      borderColor: 'button.primary.default.border',
      pointerEvents: 'none',
      zIndex: '-1',
      animationName: 'glowPulse',
      animationDuration: '2.8s',
      animationTimingFunction: 'ease-out',
      animationIterationCount: 'infinite',
      animationDelay: '100ms',
      filter: 'blur(2px)',
    },
  },
});
