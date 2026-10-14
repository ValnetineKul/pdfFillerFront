import { defineSlotRecipe } from '@pandacss/dev';

export const calendarRecipe = defineSlotRecipe({
  className: 'calendar',
  slots: [
    'root',
    'header',
    'month',
    'wrapper',
    'grid',
    'gridHeader',
    'headerCell',
    'gridBody',
    'cell',
    'errorMessage',
  ],
  base: {
    root: {
      width: 'fit-content',
      maxWidth: 'full',
      backgroundColor: 'background.primary',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      paddingBlock: '4',
      paddingInline: '6',
      borderBottomWidth: 'thin',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.primary',
    },
    month: {
      flex: 1,
      margin: 'none',
      textAlign: 'center',
      textStyle: 'md',
      fontWeight: '600',
      color: 'fg.secondary',
    },
    headerCell: {
      width: '10',
      height: '10',
      textStyle: 'sm',
      fontWeight: 'medium',
      cursor: 'default',
      outline: 'none',
      forcedColorAdjust: 'none',
      color: 'text.secondary',
    },
    wrapper: {
      display: 'flex',
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      paddingBlock: '4',
      paddingInline: '6',
    },
    gridBody: {
      '& td': {
        paddingBlock: '0.5',
      },
    },
    cell: {
      width: '10',
      height: '10',
      textStyle: 'sm',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'default',
      outline: 'none',
      forcedColorAdjust: 'none',
      color: 'text.secondary',
      borderRadius: 'full',

      '&:is(:hover, [data-hover]):not([data-disabled])': {
        backgroundColor: 'background.secondary',
      },

      '&[data-current-date="true"]': {
        position: 'relative',

        _before: {
          content: '""',
          position: 'absolute',
          zIndex: 0,
          width: '5px',
          height: '5px',
          bottom: '4px',
          borderRadius: 'full',
        },
      },

      _disabled: {
        color: 'text.disabled',
        cursor: 'default',
      },

      '&[data-unavailable]': {
        textDecoration: 'line-through',
        cursor: 'default',
      },

      '&[data-outside-month]': {
        display: 'none',
      },
    },
    errorMessage: {},
  },
  variants: {
    type: {
      single: {
        cell: {
          '&[data-current-date="true"]': {
            '&:before': {
              backgroundColor: 'background.brand.solid',
            },

            _selected: {
              '&:before': {
                backgroundColor: 'text.primary.onBrand',
              },
            },
          },

          _selected: {
            backgroundColor: 'background.brand.solid',
            color: 'text.primary.onBrand',

            _hover: {
              backgroundColor: 'background.brand.solid.hover',
            },
          },
        },
      },
      multiple: {
        root: {
          '& tr td:first-of-type': {
            '& [data-selected]': {
              borderTopLeftRadius: 'full',
              borderBottomLeftRadius: 'full',
            },
          },
          '& tr td:last-of-type': {
            '& [data-selected]': {
              borderTopRightRadius: 'full',
              borderBottomRightRadius: 'full',
            },
          },
        },
        grid: {
          _notFirstOfType: {
            borderLeftWidth: 'thin',
            borderLeftStyle: 'solid',
            borderLeftColor: 'border.primary',
          },
        },
        cell: {
          '&[data-current-date="true"]': {
            '&:before': {
              backgroundColor: 'background.brand.solid',
            },
            '&[data-selected="true"][data-selection-start="true"], &[data-selected="true"][data-selection-end="true"]':
              {
                '&:before': {
                  backgroundColor: 'white',
                },
              },
          },

          _selected: {
            background: 'background.secondary',
            borderRadius: 'none',

            '&[data-selection-start="true"], &[data-selection-end="true"]': {
              borderRadius: 'full',
              position: 'relative',

              '&:after': {
                content: '""',
                width: 'inherit',
                height: 'inherit',
                position: 'absolute',
                top: '0',
                left: '0',
                background: 'background.secondary',
                zIndex: -1,
              },
            },
            '&[data-selection-start="true"]:not([data-disabled]):not([data-outside-month]), &[data-selection-end="true"]:not([data-disabled]):not([data-outside-month])':
              {
                background: 'background.brand.solid',
                color: 'text.primary.onBrand',

                _hover: {
                  backgroundColor: 'background.brand.solid.hover',
                },
              },

            '&[data-first-day-on-month="true"]': {
              borderTopLeftRadius: 'full',
              borderBottomLeftRadius: 'full',
            },

            '&[data-last-day-on-month="true"]': {
              borderTopRightRadius: 'full',
              borderBottomRightRadius: 'full',
            },

            '&[data-selection-start="true"]': {
              '&:after': {
                borderTopLeftRadius: 'full',
                borderBottomLeftRadius: 'full',
              },
            },

            '&[data-selection-end="true"]': {
              '&:after': {
                borderTopRightRadius: 'full',
                borderBottomRightRadius: 'full',
              },
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    type: 'single',
  },
  staticCss: ['*'],
});
