import { defineSlotRecipe } from '@pandacss/dev';

export const spinnerRecipe = defineSlotRecipe({
  className: 'spinner',
  slots: ['root', 'path'],
  base: {
    root: {
      position: 'relative',
      width: '3',
      height: '3',
      zIndex: 2,
      animationName: 'rotate',
      animationIterationCount: 'infinite',
      animationDuration: '1s',
      animationTimingFunction: 'linear',
    },
    path: {
      stroke: 'fg.brand.primary',
      strokeLinecap: 'round',
      animationName: 'dashCircle',
      animationIterationCount: 'infinite',
      animationDuration: '1.5s',
      animationTimingFunction: 'ease-in-out',
    },
  },
  variants: {
    size: {
      sm: {
        root: { width: '3', height: '3' },
      },
      md: {
        root: { width: '4', height: '4' },
      },
      lg: {
        root: { width: '5', height: '5' },
      },
      xl: {
        root: { width: '8', height: '8' },
      },
      '2xl': {
        root: { width: '12', height: '12' },
      },
      '3xl': {
        root: { width: '14', height: '14' },
      },
      '4xl': {
        root: { width: '16', height: '16' },
      },
    },
    colorScheme: {
      default: {
        path: {
          stroke: 'fg.brand.primary',
        },
      },
      light: {
        path: {
          stroke: 'fg.white',
        },
      },
      inherit: {
        path: {
          stroke: 'currentColor',
        },
      },
    },
  },
  defaultVariants: {
    size: '2xl',
    colorScheme: 'default',
  },
  staticCss: ['*'],
});
