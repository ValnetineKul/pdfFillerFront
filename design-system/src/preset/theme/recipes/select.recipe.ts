import { defineSlotRecipe } from '@pandacss/dev';

export const selectRecipe = defineSlotRecipe({
  className: 'select',
  slots: [
    'root',
    'label',
    'labelHint',
    'trigger',
    'arrow',
    'arrowIcon',
    'dropdown',
    'errorMessage',
    'textMessage',
    'list',
    'selectValue',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
    },
    labelHint: {
      marginLeft: '0.5',
    },
    trigger: {
      width: 'full',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      rounded: 'select.trigger',
      textStyle: 'md',
      borderWidth: 'thin',
      borderStyle: 'solid',
      paddingBlock: '2.5',
      paddingInline: '3.5',
      gap: '1.5',
      bgColor: {
        base: 'background.primary',
        _disabled: 'background.disabled.subtle',
      },
      color: 'text.primary',
      borderColor: {
        base: 'border.primary',
        _invalid: 'border.error',
        _hover: {
          base: 'border.brand',
          _invalid: 'border.error',
        },
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'text.disabled',
        borderColor: {
          base: 'border.primary',
          _hover: 'border.primary',
        },
      },
      _open: { boxShadow: 'focusRing.brand.500' },
      _focused: {
        boxShadow: {
          base: 'focusRing.brand.500',
          _invalid: 'focusRing.error.500',
        },
      },
    },
    textMessage: {
      textStyle: 'sm',
      color: 'text.tertiary',
      fontWeight: 'normal',
    },
    errorMessage: {
      textStyle: 'sm',
      color: 'text.error',
      fontWeight: 'normal',
    },
    arrow: {
      marginLeft: 'auto',
      stroke: 'currentColor',
      color: 'fg.quarterary',
      verticalAlign: 'middle',
    },
    arrowIcon: {
      iconSize: 'md',
    },
    selectValue: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      maxWidth: 'full',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textStyle: 'md',
      fontWeight: 'medium',
      gap: '2',
      _placeholder: {
        color: 'text.placeholder',
        fontWeight: 'normal',
      },
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      rounded: 'select.list',
      backgroundColor: 'background.primary',
      paddingBlock: '1',
      maxHeight: '80',
      overflow: 'auto',
      borderWidth: 'thin',
      borderStyle: 'solid',
      borderColor: 'border.primary',
      minWidth: 'fit-content',
      color: 'text.primary',
    },
    dropdown: {
      width: 'var(--trigger-width)',
      boxShadow: 'lg',
      rounded: 'select.dropdown',
    },
  },
  variants: {
    variant: {
      default: {},
      unstyled: {
        trigger: {
          borderStyle: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
  staticCss: ['*'],
});
