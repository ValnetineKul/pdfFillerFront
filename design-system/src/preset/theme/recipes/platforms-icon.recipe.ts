import { defineRecipe } from '@pandacss/dev';

export const platformsIconRecipe = defineRecipe({
  className: 'platforms-icon',
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    variant: {
      brand: {},
      primary: {
        color: 'fg.quinary',
        _hovered: {
          color: 'fg.quinary.hover',
        },
      },
      secondary: {
        color: 'fg.white',
        _hovered: {
          color: 'fg.senary',
        },
      },
    },
    size: {
      md: {
        '--icon-size': 'sizes.6',
      },
      lg: {
        '--icon-size': 'sizes.8',
      },
    },
  },
  defaultVariants: {
    variant: 'brand',
    size: 'md',
  },
  staticCss: ['*'],
});
