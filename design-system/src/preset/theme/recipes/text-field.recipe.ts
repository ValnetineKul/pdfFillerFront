import { defineSlotRecipe } from '@pandacss/dev';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const textFieldRecipe = defineSlotRecipe({
  className: 'text-field',
  slots: [
    'root',
    'label',
    'inputElement',
    'input',
    'inputWrapper',
    'inputFocusWrapper',
    'description',
    'addon',
    'button',
    'error',
    'necessity',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
    },
    inputElement: {
      paddingBlock: '2.5',
      backgroundColor: 'background.primary',
      _first: {
        paddingInlineStart: '3.5',
      },
      _last: {
        paddingInlineEnd: '3.5',
      },
      '& + &': {
        paddingInlineStart: '2',
      },
      '[role="separator"] + &': {
        paddingInlineStart: '3.5',
      },
      '&:has(+ [role="separator"])': {
        paddingInlineEnd: '3.5',
      },
    },
    input: {
      display: 'block',
      width: 'full',
      textStyle: 'md',
      color: 'text.primary',
      outlineWidth: 'none',
      borderRadius: 'textField.input',
      borderWidth: 'none',
      backgroundColor: 'background.primary',
      _placeholder: {
        color: 'text.placeholder',
      },
      _disabled: {
        color: 'text.disabled',
        backgroundColor: 'background.disabled.subtle',
        opacity: 1,
        cursor: 'not-allowed',
      },
      _autofill: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: '{colors.text.primary}',
      },
    },
    inputWrapper: {
      display: 'flex',
      backgroundColor: 'background.primary',
      borderRadius: 'textField.inputWrapper',
      borderWidth: 'thin',
      borderColor: 'border.primary',
      boxShadow: 'xs',
      _hovered: {
        borderColor: 'border.brand',
      },
      _disabled: {
        backgroundColor: 'background.disabled.subtle',
        borderColor: 'border.primary',
        _hovered: {
          borderColor: 'border.primary',
        },
      },
      _invalid: {
        borderColor: 'border.error',
      },
    },
    inputFocusWrapper: {
      borderColor: 'border.brand',
      boxShadow: 'focusRing.brand.500',
      _invalid: {
        boxShadow: 'focusRing.error.500',
      },
    },
    addon: {
      display: 'flex',
      alignItems: 'center',
      color: 'fg.quarterary',
      _first: {
        borderLeftRadius: 'textField.addon',
      },
      _last: {
        borderRightRadius: 'textField.addon',
      },
    },
    button: {
      borderWidth: 'none',
      _notFirst: {
        borderLeftRadius: 'none',
      },
      _notLast: {
        borderRightRadius: 'none',
      },
      _focusVisible: {
        zIndex: 1,
        boxShadow: 'focusRing.brand.500!',
      },
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
  staticCss: ['*'],
});
