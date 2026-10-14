import { defineSlotRecipe } from '@pandacss/dev';

export const horizontalProgressBarRecipe = defineSlotRecipe({
  className: 'horizontalProgressBar',
  slots: [
    'container',
    'progressBar',
    'progressFill',
    'minBar',
    'textContainer',
    'title',
    'value',
  ],
  base: {
    container: {
      width: 'full',
      position: 'relative',
    },
    progressBar: {
      width: 'full',
      backgroundColor: 'background.quarterary',
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: 'full',
      position: 'absolute',
      borderRadius: 4,
      minWidth: '1%',
      backgroundColor: 'fg.brand.primary',
    },
    minBar: {
      position: 'static',
      borderRadius: 4,
      backgroundColor: 'fg.warning.secondary',
    },
    textContainer: {
      display: 'flex',
      marginTop: 1,
    },
    title: {
      color: 'text.tertiary',
      fontWeight: 'normal',
      textStyle: 'md',
    },
    value: {
      color: 'text.primary',
      fontWeight: 'semibold',
    },
  },
  variants: {
    size: {
      xs: {
        progressBar: {
          height: 4,
        },
        minBar: {
          height: 2,
        },
        textContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        title: {
          marginRight: 1.5,
        },
        value: {
          textStyle: 'md',
        },
      },
      sm: {
        progressBar: {
          height: 5,
        },
        minBar: {
          height: 2.5,
        },
        textContainer: {
          marginTop: 1.5,
          flexDirection: 'row',
          alignItems: 'center',
        },
        title: {
          marginRight: 1.5,
        },
        value: {
          textStyle: 'lg',
        },
      },
      md: {
        progressBar: {
          height: 6,
        },
        minBar: {
          height: 3,
        },
        textContainer: {
          marginTop: 2,
          flexDirection: 'row',
          alignItems: 'center',
        },
        title: {
          marginRight: 1.5,
        },
        value: {
          textStyle: 'xl',
        },
      },
      lg: {
        progressBar: {
          height: 7,
        },
        minBar: {
          height: 4,
        },
        textContainer: {
          marginTop: 2.5,
          flexDirection: 'column',
        },
        title: {
          marginBottom: 0.5,
        },
        value: {
          textStyle: 'display.xs',
        },
      },
    },
  },
  defaultVariants: {
    size: 'xs',
  },
  staticCss: ['*'],
});
