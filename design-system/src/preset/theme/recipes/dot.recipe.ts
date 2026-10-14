import { defineRecipe } from '@pandacss/dev';

export const dotRecipe = defineRecipe({
  className: 'dot',
  base: {
    display: 'inline-block',
    flexShrink: '0',
    borderRadius: '50%',
    position: 'relative',
  },
  variants: {
    size: {
      sm: {
        width: '1.5',
        height: '1.5',
      },
      md: {
        width: '2',
        height: '2',
      },
      lg: {
        width: '2.5',
        height: '2.5',
      },
    },
    variant: {
      filled: {
        backgroundColor: 'currentColor',
      },
      outline: {
        backgroundColor: 'currentColor',
        _before: {
          content: '""',
          position: 'absolute',
          inset: '-50%',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          opacity: '0.2',
          zIndex: '-1',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'filled',
  },
  staticCss: ['*'],
});
