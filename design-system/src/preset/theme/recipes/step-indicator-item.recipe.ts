import { defineRecipe } from '@pandacss/dev';

export const stepIndicatorItemRecipe = defineRecipe({
  className: 'paginationItem',
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10',
    cursor: 'default',
  },
  variants: {
    current: {
      true: {
        backgroundColor: 'fg.brand.primary.alt',
      },
      false: {
        backgroundColor: 'background.quarterary',
      },
    },
    type: {
      dot: {},
      line: { flexGrow: 1 },
    },
    size: {
      md: {},
      lg: {},
    },
  },
  compoundVariants: [
    {
      type: 'dot',
      size: 'md',
      css: {
        base: { height: '2', width: '2' },
      },
    },
    {
      type: 'dot',
      size: 'lg',
      css: {
        base: { height: '2.5', width: '2.5' },
      },
    },
    {
      type: 'line',
      size: 'md',
      css: {
        base: {
          height: '1.5',
        },
      },
    },
    {
      type: 'line',
      size: 'lg',
      css: {
        base: {
          height: '2',
        },
      },
    },
  ],
  defaultVariants: {
    current: true,
    size: 'md',
    type: 'dot',
  },
  staticCss: ['*'],
});
