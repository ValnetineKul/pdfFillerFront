import { defineSlotRecipe } from '@pandacss/dev';

export const multiSelectRecipe = defineSlotRecipe({
  className: 'multiSelect',
  slots: [
    'root',
    'fieldGroup',
    'tagList',
    'tag',
    'combobox',
    'inputWrapper',
    'label',
    'input',
    'button',
    'chevron',
    'popover',
    'listBox',
    'listBoxItem',
    'description',
    'error',
    'empty',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      minWidth: '16',
      width: 'full',
      height: 'fit',
    },
    fieldGroup: {
      position: 'relative',
      width: 'full',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      rounded: 'multiSelect.fieldGroup',
      textStyle: 'md',
      borderWidth: 'thin',
      borderStyle: 'solid',
      gap: '2',
      padding: '3',
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
        backgroundColor: 'background.disabled.subtle',
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
    tagList: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: '1',
      padding: '1.5',
      outline: 'none',
      width: 'full',
    },
    tag: {
      rounded: 'multiSelect.tag',
      backgroundColor: '',
      color: 'secondary',
    },
    combobox: {
      display: 'flex',
      flex: '1',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      width: 'fit',
    },
    inputWrapper: {
      display: 'flex',
      width: 'full',
      flexDir: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      w: 'full',
      paddingLeft: '1',
      paddingRight: '2',
      textStyle: 'md',
      _placeholder: {
        color: 'text.placeholder',
      },
      _hover: {
        _placeholder: {
          color: 'text.primary',
        },
      },
      _focused: {
        _placeholder: {
          color: 'text.primary',
        },
      },
    },
    button: {
      ml: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      rounded: 'multiSelect.button',
      color: 'muted.fg',
      outline: 'none',
    },
    chevron: {
      color: 'fg.quarterary',
      iconSize: 'md',
    },
    popover: {
      maxWidth: 'var(--trigger-width)',
      backgroundColor: 'background.primary',
      rounded: 'multiSelect.popover',
      boxShadow: 'lg',
      borderWidth: 'thin',
      borderStyle: 'solid',
      borderColor: 'border.primary',
      color: 'text.primary',
      overflow: 'auto',
      padding: '1.5',
    },
    listBox: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      gap: '1',
      maxHeight: '64',
    },
    empty: {
      maxWidth: 'var(--trigger-width)',
      overflow: 'hidden',
    },
    listBoxItem: {
      width: 'full',
      padding: '2',
      rounded: 'multiSelect.listBoxItem',
      display: 'flex',
      cursor: 'pointer',
      _selected: {
        backgroundColor: 'background.primary.hover',
        color: 'text.primary',
      },
      _hover: {
        backgroundColor: 'background.primary.hover',
        color: 'text.primary',
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
      _focused: {
        backgroundColor: 'background.primary.hover',
        color: 'text.primary',
      },
    },
    description: {
      display: 'block',
      padding: '3',
    },
    error: {
      textStyle: 'xs',
      fontWeight: 'medium',
      color: 'text.error',
    },
  },
  variants: {
    isOpen: {
      true: {
        chevron: {
          transform: 'rotate(180deg)',
        },
      },
    },
    isFocused: {
      true: {
        fieldGroup: {
          borderColor: 'border.brand',
          boxShadow: 'focusRing.brand.500',
          _invalid: {
            boxShadow: 'focusRing.error.500',
          },
        },
      },
    },
    isDisabled: {
      true: {
        input: {
          cursor: 'not-allowed',
          color: 'text.placeholder',
          _placeholder: {
            color: 'text.placeholder',
          },
        },
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
  staticCss: ['*'],
});
