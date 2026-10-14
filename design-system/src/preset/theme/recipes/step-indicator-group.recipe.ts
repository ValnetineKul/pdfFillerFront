import { defineRecipe } from '@pandacss/dev';

export const stepIndicatorGroupRecipe = defineRecipe({
  className: 'paginationItemGroup',
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
    gap: '2',
    width: 'full',
  },
  variants: {
    framed: {
      true: {
        base: {
          bg: 'background.primary',
          borderRadius: '10',
          padding: '2',
        },
      },
      false: {},
    },
    size: {
      md: {},
      lg: { gap: '3' },
    },
  },
  compoundVariants: [
    {
      framed: true,
      size: 'lg',
      css: {
        padding: '3',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    framed: false,
  },
  staticCss: ['*'],
});
