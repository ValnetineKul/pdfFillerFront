import { defineSlotRecipe } from '@pandacss/dev';

export const checkboxGroupRecipe = defineSlotRecipe({
  className: 'checkbox-group',
  slots: ['root', 'description', 'error', 'label'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
    },
    description: {
      textStyle: 'sm',
      color: 'text.tertiary',
    },
    error: {
      textStyle: 'sm',
      color: 'text.error',
    },
  },
  variants: {
    size: {
      sm: {
        root: { textStyle: 'sm', gap: '3' },
      },
      md: {
        root: { textStyle: 'md', gap: '4' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  staticCss: ['*'],
});
