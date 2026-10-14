import { defineSlotRecipe } from '@pandacss/dev';

export const otpFieldRecipe = defineSlotRecipe({
  className: 'otp-field',
  slots: [
    'root',
    'label',
    'wrapper',
    'input',
    'description',
    'errorMessage',
    'slot',
    'caret',
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
    wrapper: {
      display: 'flex',
    },
    input: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: '1',
      textAlign: 'center',
      position: 'relative',
      color: 'text.placeholder.subtle',
      backgroundColor: 'background.primary',
      fontWeight: 'medium',
      borderWidth: 'thin',
      borderColor: 'border.primary',
      borderRadius: 'otpField.input',
      boxShadow: 'xs',
      outlineWidth: 'none',
      '&>div': {
        position: 'absolute',
      },
      _placeholder: {
        color: 'text.placeholder.subtle',
      },
      _hover: {
        borderColor: 'border.brand.solid',
        borderWidth: 'thick',
      },
      '&[data-filled="true"]': {
        color: 'text.brand.tertiary.alt',
        borderColor: 'border.brand.solid',
        borderWidth: 'thick',
      },
      _isActive: {
        borderColor: 'border.brand.solid',
        boxShadow: 'focusRing.brand.500',
        borderWidth: 'thick',
      },
      _valid: {
        '&:not(_invalid) &:not(_disabled) &[data-filled="true"]': {
          borderColor: 'border.brand.solid',
          borderWidth: 'thick',
        },
      },
      _invalid: {
        color: 'text.error',
        borderColor: 'border.error',
        backgroundColor: 'background.error.subtle',
        borderWidth: 'thick',
        _hovered: {
          borderColor: 'border.error',
        },
        _isActive: {
          boxShadow: 'focusRing.error.500',
          borderColor: 'border.error',
        },
      },
      _disabled: {
        color: 'text.disabled',
        borderColor: 'border.disabled.subtle',
        backgroundColor: 'background.disabled.subtle',
        borderWidth: 'thin',
        cursor: 'not-allowed',
        _hovered: {
          borderColor: 'border.disabled.subtle',
        },
      },
    },
    caret: {
      position: 'absolute',
      pointerEvents: 'none',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'caretBlink 1.2s ease-out infinite',
      '& > div': {
        height: '6',
        width: '0.25',
        backgroundColor: 'text.primary',
      },
    },
    description: {
      textStyle: 'sm',
      color: 'text.tertiary',
      _valid: {
        color: 'green',
      },
    },
    errorMessage: {
      textStyle: 'sm',
      color: 'text.error',
      fontWeight: 'normal',
    },
  },
  variants: {
    size: {
      sm: {
        input: {
          minWidth: '12',
          height: '16',
          textStyle: 'display.sm',
        },
        wrapper: { gap: '2' },
      },
      md: {
        input: { minWidth: '16', height: '20', textStyle: 'display.md' },
        wrapper: { gap: '3' },
      },
      lg: {
        input: { minWidth: '20', height: '24', textStyle: 'display.lg' },
        wrapper: { gap: '3' },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
  staticCss: ['*'],
});
