import { defineSlotRecipe } from '@pandacss/dev';

export const progressBarRecipe = defineSlotRecipe({
  className: 'progressBar',
  slots: [
    'root',
    'circle',
    'valueCircle',
    'text',
    'centerText',
    'textContainer',
    'textWrapper',
  ],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      transition: 'stroke-dashoffset 0.5s ease',
      strokeLinecap: 'round',
      stroke: 'background.quarterary',
    },
    valueCircle: {
      transition: 'stroke-dashoffset 0.5s ease',
      strokeLinecap: 'round',
      stroke: 'fg.brand.primary',
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'full',
      width: 'full',
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: 'full',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text.primary',
    },
    centerText: {
      fill: 'text.secondary',
      textStyle: 'sm',
      fontWeight: 'medium',
    },
    text: {
      fontWeight: 'semibold',
    },
  },
  variants: {
    size: {
      xs: {
        circle: {
          strokeWidth: '4',
        },
        valueCircle: {
          strokeWidth: '4',
        },
        text: {
          textStyle: 'display.xs',
        },
      },
      sm: {
        circle: {
          strokeWidth: '5',
        },
        valueCircle: {
          strokeWidth: '5',
        },
        text: {
          textStyle: 'display.sm',
        },
      },
      md: {
        circle: {
          strokeWidth: '6',
        },
        valueCircle: {
          strokeWidth: '6',
        },
        text: {
          textStyle: 'display.md',
        },
      },
      lg: {
        circle: {
          strokeWidth: '7',
        },
        valueCircle: {
          strokeWidth: '7',
        },
        text: {
          textStyle: 'display.lg',
        },
      },
    },
  },
  staticCss: ['*'],
});
