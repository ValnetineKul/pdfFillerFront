import { defineSlotRecipe } from '@pandacss/dev';

export const loaderRecipe = defineSlotRecipe({
  className: 'loader',
  slots: ['root', 'text'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'full',
      height: 'full',
    },
    text: {
      color: 'text.secondary',
      fontWeight: 'medium',
      textAlign: 'center',
    },
  },
  variants: {
    size: {
      sm: {
        text: {
          display: 'none',
        },
      },
      md: {
        text: {
          display: 'none',
        },
      },
      lg: {
        text: {
          display: 'none',
        },
      },
      xl: {
        text: {
          textStyle: 'sm',
        },
      },
      '2xl': {
        text: {
          textStyle: 'sm',
        },
      },
      '3xl': {
        text: {
          textStyle: 'lg',
        },
      },
      '4xl': {
        text: {
          textStyle: 'xl',
        },
      },
    },
  },
  defaultVariants: {
    size: '2xl',
  },
  staticCss: ['*'],
});
