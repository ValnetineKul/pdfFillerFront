import { defineSlotRecipe } from '@pandacss/dev';

export const checkboxControlRecipe = defineSlotRecipe({
  className: 'checkbox-control',
  slots: ['root', 'control'],
  base: {
    root: {
      display: 'flex',
      gap: '2',
      alignItems: 'center',
    },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5',
      borderRadius: 'checkbox.control',
      color: 'transparent',
      backgroundColor: 'background.primary',
      borderColor: 'border.primary',
      borderWidth: 'thin',
    },
  },
  variants: {
    isSelected: {
      true: {
        control: {
          backgroundColor: 'background.brand.solid',
          borderColor: 'transparent',
          color: 'fg.white',
        },
      },
    },
    isIndeterminate: {
      true: {
        control: {
          backgroundColor: 'background.brand.solid',
          borderColor: 'transparent',
          color: 'fg.white',
        },
      },
    },
    isFocusVisible: {
      true: {
        control: { boxShadow: 'focusRing.brand.500' },
      },
    },
    isInvalid: {
      true: {
        control: { borderColor: 'border.error' },
      },
    },
    isDisabled: {
      true: {
        control: {
          color: 'fg.disabled.subtle',
          backgroundColor: 'background.disabled.subtle',
          borderColor: 'border.disabled',
          cursor: 'not-allowed',
        },
      },
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      isFocusVisible: true,
      css: {
        control: { boxShadow: 'focusRing.error.500' },
      },
    },
  ],
  staticCss: ['*'],
});

export const checkboxRecipe = defineSlotRecipe({
  className: 'checkbox',
  slots: ['root', 'control', 'controlIcon', 'description', 'error', 'content'],
  base: {
    root: {
      display: 'flex',
      gap: '2',
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
      position: 'relative',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
    description: {
      textStyle: 'sm',
      color: 'text.tertiary',
    },
    error: {
      marginTop: '1.5',
      textStyle: 'sm',
      color: 'text.error',
    },
  },
  variants: {
    size: {
      sm: {
        control: {
          width: '4',
          height: '4',
        },
        controlIcon: {
          width: '2.5',
          height: '2.5',
        },
        root: { textStyle: 'sm', gap: '1.5' },
        content: {
          marginLeft: '6',
        },
      },
      md: {
        root: { textStyle: 'md', gap: '2' },
        control: {
          width: '5',
          height: '5',
        },
        controlIcon: {
          width: '3.5',
          height: '3.5',
        },
        content: {
          marginLeft: '7',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  staticCss: ['*'],
});
