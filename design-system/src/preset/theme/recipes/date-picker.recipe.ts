import { defineSlotRecipe } from '@pandacss/dev';

export const datePickerRecipe = defineSlotRecipe({
  className: 'date-picker',
  slots: [
    'root',
    'label',
    'content',
    'divider',
    'wrapper',
    'dateInput',
    'input',
    'timeWrapper',
    'clearButton',
    'trigger',
    'description',
    'errorMessage',
    'popover',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    popover: {
      boxShadow: 'xl',
      borderStyle: 'solid',
      borderWidth: 'thin',
      rounded: 'datePicker.popover',
      borderColor: 'border.secondary',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
    },
    content: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '3',
    },
    divider: {
      paddingBlock: '2',
      color: 'fg.quarterary',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      textStyle: 'md',
      color: 'text.primary',
      backgroundColor: 'background.primary',
      borderWidth: 'thin',
      borderColor: 'border.primary',
      borderRadius: 'datePicker.wrapper',
      boxShadow: 'xs',

      _placeholder: {
        color: 'text.placeholder',
      },
      _invalid: {
        borderColor: 'border.error',
        _hovered: {
          borderColor: 'border.error',
        },
      },
      _hovered: {
        borderColor: 'border.brand',
        _invalid: {
          borderColor: 'border.error',
        },
      },
      _focusWithin: {
        borderColor: 'border.brand',
        boxShadow: 'focusRing.brand.500',
        _invalid: {
          borderColor: 'border.error',
          boxShadow: 'focusRing.error.500',
        },
      },
      _disabled: {
        color: 'text.disabled',
        borderColor: 'border.primary',
        backgroundColor: 'background.disabled.subtle',
        cursor: 'not-allowed',
        _hovered: {
          borderColor: 'border.primary',
        },
      },
    },
    dateInput: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      paddingInline: '3',
      paddingBlock: '2',
      overflow: 'hidden',
    },
    input: {
      paddingInline: '0',
      paddingBlock: '0',
      fontVariantNumeric: 'tabular-nums',
      outlineWidth: 'none',
      borderRadius: 'datePicker.input.default',

      '&:not([data-type="literal"])': {
        paddingInline: '0.25',
      },

      _focused: {
        rounded: 'datePicker.input.focused',
        color: 'datePicker.fgFocus',
        backgroundColor: 'datePicker.bgFocus',
        outline: 'none',
        caretColor: 'transparent',
      },
    },

    timeWrapper: {
      paddingBlock: '4',
      paddingInline: '6',
      borderTopWidth: 'thin',
      borderTopStyle: 'solid',
      borderTopColor: 'border.primary',
      backgroundColor: 'background.primary',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '2',
    },
    clearButton: {
      padding: '1',
    },
    trigger: {
      padding: '2.5',
      display: 'flex',
    },
    description: {
      textStyle: 'sm',
      color: 'text.tertiary',
    },
    errorMessage: {
      textStyle: 'sm',
      color: 'text.error',
    },
  },
  staticCss: ['*'],
});
