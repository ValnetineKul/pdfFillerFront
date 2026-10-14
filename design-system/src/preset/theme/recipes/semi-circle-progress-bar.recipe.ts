import { defineSlotRecipe } from '@pandacss/dev';

export const semiCircleProgressBarRecipe = defineSlotRecipe({
  className: 'semiCircleProgressBar',
  slots: [
    'root',
    'circle',
    'text',
    'centerText',
    'textContainer',
    'textWrapper',
    'mainWrapper',
    'valueWrapper',
    'textValue',
    'minCircle',
    'valueCircle',
    'textCurrency',
    'title',
    'container',
    'textTitle',
  ],
  base: {
    mainWrapper: {
      position: 'relative',
    },
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
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
    minCircle: {
      transition: 'stroke-dashoffset 0.5s ease',
      strokeLinecap: 'round',
      stroke: 'fg.warning.secondary',
    },
    textContainer: {
      display: 'flex',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'flex-end',
      left: '50%',
      top: '0',
      transform: 'translateX(-50%)',
      height: 'full',
      width: 'full',
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: 'full',
      alignItems: 'center',
      justifyContent: 'flex-end',
      color: 'text.primary',
    },
    valueWrapper: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'baseline',
    },
    centerText: {
      fill: 'text.secondary',
      textStyle: 'sm',
      fontWeight: 'medium',
    },
    text: {
      fontWeight: 'semibold',
    },
    textValue: {
      fontWeight: 'bold',
      textStyle: 'display.md',
    },
    textCurrency: {
      fontWeight: 'medium',
      textStyle: 'md',
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    textTitle: {
      fontWeight: 'medium',
      textStyle: 'sm',
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
        minCircle: {
          strokeWidth: '2',
        },
        text: {
          textStyle: 'display.xs',
        },
        textValue: {
          textStyle: 'display.xs',
        },
        textCurrency: {
          textStyle: 'md',
        },
      },
      sm: {
        circle: {
          strokeWidth: '5',
        },
        valueCircle: {
          strokeWidth: '5',
        },
        minCircle: {
          strokeWidth: '3',
        },
        text: {
          textStyle: 'display.sm',
        },
        textValue: {
          textStyle: 'display.sm',
        },
        textCurrency: {
          textStyle: 'sm',
        },
      },
      md: {
        circle: {
          strokeWidth: '6',
        },
        valueCircle: {
          strokeWidth: '6',
        },
        minCircle: {
          strokeWidth: '4',
        },
        text: {
          textStyle: 'display.md',
        },
        textValue: {
          textStyle: 'display.md',
        },
        textCurrency: {
          textStyle: 'md',
        },
      },
      lg: {
        circle: {
          strokeWidth: '7',
        },
        valueCircle: {
          strokeWidth: '7',
        },
        minCircle: {
          strokeWidth: '5',
        },
        text: {
          textStyle: 'display.lg',
        },
        textValue: {
          textStyle: 'display.lg',
        },
        textCurrency: {
          textStyle: 'lg',
        },
      },
    },

    withoutTitle: {
      true: {
        text: {
          paddingBottom: '2.5',
        },
      },
      false: {
        text: {
          paddingBottom: '0.5',
        },
      },
    },
  },
  staticCss: ['*'],
});
