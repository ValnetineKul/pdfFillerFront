import { defineSlotRecipe } from '@pandacss/dev';

export const comboboxRecipe = defineSlotRecipe({
  className: 'combobox',
  slots: [
    'root',
    'label',
    'group',
    'arrow',
    'dropdown',
    'errorMessage',
    'textMessage',
    'list',
    'input',
    'emptyState',
    'emptyStateIcon',
    'emptyStateText',
    'inputWrapper',
    'tagGroupWrapper',
  ],
  base: {
    root: {
      display: 'flex',
      width: 'full',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
    },
    group: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      rounded: 'combobox.group',
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
      _expanded: { boxShadow: 'focusRing.brand.500' },
      _focusVisible: {
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
      color: 'fg.quarterary',
      cursor: 'pointer',
      display: 'inline-flex',
      transform: {
        base: 'rotate(0)',
        _expanded: 'rotate(180deg)',
      },
    },
    inputWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tagGroupWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2',
    },
    input: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: 'full',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textStyle: 'md',
      fontWeight: 'medium',
      gap: '2',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      rounded: 'combobox.list',
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
      rounded: 'combobox.dropdown',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4',
    },
    emptyStateText: {
      color: 'text.primary',
      textStyle: 'md',
      fontWeight: 'semibold',
      paddingTop: '2',
    },
  },
  variants: {
    isMulti: {
      true: {
        group: {
          flexDirection: 'column',
          alignItems: 'initial',
          justifyContent: 'initial',
        },
      },
    },
  },
  defaultVariants: {
    isMulti: false,
  },
  staticCss: ['*'],
});
