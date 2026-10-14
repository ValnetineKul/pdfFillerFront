import { defineRecipe, defineSlotRecipe } from '@pandacss/dev';

export const radioGroupRecipe = defineSlotRecipe({
  className: 'radio-group',
  slots: ['root', 'label', 'description', 'error'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.primary',
      width: 'fit',
    },
    description: { display: 'block', textStyle: 'sm', color: 'text.tertiary' },
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

export const radioRecipe = defineSlotRecipe({
  className: 'radio',
  slots: ['root', 'description', 'indicator'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      forcedColorAdjust: 'none',
      position: 'relative',
      width: 'fit',
    },
    description: {
      textStyle: 'sm',
      color: 'text.tertiary',
      display: 'block',
    },
    indicator: {},
  },
  variants: {
    size: {
      sm: {
        root: { textStyle: 'sm' },
        description: {
          paddingLeft: '5',
        },
        indicator: { width: '4', height: '4', borderWidth: '1.25' },
      },
      md: {
        description: {
          paddingLeft: '6',
        },
        root: { textStyle: 'md' },
        indicator: { width: '5', height: '5', borderWidth: '1.5' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  staticCss: ['*'],
});

export const radioIndicatorRecipe = defineRecipe({
  className: 'radio-indicator',
  base: {
    display: 'block',
    boxSizing: 'border-box',
    color: 'transparent',
    backgroundColor: 'background.primary',
    borderColor: 'border.primary',
    borderWidth: 'thin',
    borderRadius: 'full',
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'border.brand.solid',
      },
      false: {
        borderWidth: 'thin',
      },
    },
    isInvalid: {
      true: {
        borderColor: 'border.error',
      },
    },
    isDisabled: {
      true: {
        borderColor: 'border.primary',
        borderWidth: 'thin',
        cursor: 'not-allowed',
        boxShadow: 'focusRing.gray.400',
      },
    },
    isFocusVisible: {
      true: {
        boxShadow: 'focusRing.brand.500',
      },
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      isSelected: true,
      css: {
        borderWidth: '1.25',
        backgroundColor: 'fg.disabled.subtle',
        borderColor: 'background.disabled.subtle',
        outlineColor: 'border.disabled',
        outlineStyle: 'solid',
        outlineWidth: 'thin',
      },
    },
    {
      isInvalid: true,
      isFocusVisible: true,
      css: {
        boxShadow: 'focusRing.error.500',
      },
    },
  ],
  staticCss: ['*'],
});
