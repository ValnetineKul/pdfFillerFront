import { defineSlotRecipe } from '@pandacss/dev';

export const multiMonthCalendarRecipe = defineSlotRecipe({
  staticCss: ['*'],
  className: 'calendar__multi-month',
  slots: ['root', 'header', 'body', 'calendar', 'title', 'wrapper', 'table'],
  base: {
    body: {
      '& td[aria-selected="true"]:first-child': {
        borderStartStartRadius: '1',
        borderEndStartRadius: '1',
      },
      '& td[aria-selected="true"]:last-child': {
        borderStartEndRadius: '1',
        borderEndEndRadius: '1',
      },
    },
    header: {
      color: 'text.primary',
      textStyle: 'md',
      textTransform: 'capitalize',
      fontWeight: 'medium',
      width: '10',
      height: '10',
    },
    root: {
      display: 'flex',
      flexDirection: 'row',
      gap: '5',
    },
    title: {
      textStyle: 'md',
      fontWeight: 'medium',
      color: 'text.primary',
      textTransform: 'capitalize',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6',
    },
    table: {
      borderCollapse: 'separate',
      borderSpacing: 'var(--spacing-none) var(--spacing-1)',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          flexDirection: 'row',
        },
      },
      vertical: {
        root: {
          flexDirection: 'column',
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const calendarCellRecipe = defineSlotRecipe({
  staticCss: ['*'],
  className: 'calendar____cell',
  slots: ['cell', 'root'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&[data-selected="true"]': {
        background: 'background.secondary',
      },
      '&[data-selection-start="true"]': {
        borderStartStartRadius: '1',
        borderEndStartRadius: '1',
        color: 'text.primary.onBrand',
        background: 'background.brand.solid',
      },
      '&[data-selection-end="true"]': {
        borderStartEndRadius: '1',
        borderEndEndRadius: '1',
        color: 'text.primary.onBrand',
        background: 'background.brand.solid',
      },
      '&[data-selected="true"] + &[data-selection-end="true"]': {
        background: 'none',
      },
      cursor: 'pointer',
    },
    cell: {
      width: '10',
      height: '10',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2',
      color: 'text.secondary',
      textStyle: 'sm',
    },
  },
  variants: {
    isSelected: {
      true: {
        cell: {
          background: 'background.secondary',
        },
      },
    },
    isSelectionStart: {
      true: {
        cell: {
          borderRadius: '1',
          color: 'text.primary.onBrand',
          background: 'background.brand.solid',
        },
      },
    },
    isSelectionEnd: {
      true: {
        cell: {
          borderRadius: '1',
          color: 'text.primary.onBrand',
          background: 'background.brand.solid',
        },
      },
    },
    isOutsideMonth: {
      true: {
        cell: {
          display: 'none',
        },
      },
    },
    isStartOfWeek: {
      true: {
        cell: {
          borderStartStartRadius: '1',
          borderEndStartRadius: '1',
        },
        root: {
          borderStartStartRadius: '1',
          borderEndStartRadius: '1',
        },
      },
    },
    isEndOfWeek: {
      true: {
        cell: {
          borderStartEndRadius: '1',
          borderEndEndRadius: '1',
        },
        root: {
          borderStartEndRadius: '1',
          borderEndEndRadius: '1',
        },
      },
    },
    isEndOfMonth: {
      true: {
        cell: {
          borderStartEndRadius: '1',
          borderEndEndRadius: '1',
        },
        root: {
          borderStartEndRadius: '1',
          borderEndEndRadius: '1',
        },
      },
    },
    isStartOfMonth: {
      true: {
        cell: {
          borderStartStartRadius: '1',
          borderEndStartRadius: '1',
        },
        root: {
          borderStartStartRadius: '1',
          borderEndStartRadius: '1',
        },
      },
    },
    isDisabled: {
      true: {
        cell: {
          color: 'text.disabled',
        },
      },
    },
  },
});

export const multiMonthCalendarPickerRecipe = defineSlotRecipe({
  staticCss: ['*'],
  className: 'calendar__multi-month__picker',
  slots: ['root', 'wrapper', 'input'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
    },
    wrapper: {
      borderRadius: 'calendarMultiMonth',
      padding: '2.5',
      paddingLeft: '3.5',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      boxShadow: 'xs',
      borderColor: 'border.primary',
      borderStyle: 'solid',
      borderWidth: 'thin',
      background: 'background.primary',
      textStyle: 'md',
      _placeholder: {
        color: 'text.placeholder',
      },
      cursor: 'pointer',
    },
    input: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'text',
    },
  },
  variants: {
    clickable: {
      true: {
        wrapper: {
          cursor: 'pointer',
        },
      },
    },
  },
});
