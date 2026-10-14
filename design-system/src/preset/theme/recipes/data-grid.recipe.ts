import { defineSlotRecipe } from '@pandacss/dev';

export const dataGridRecipe = defineSlotRecipe({
  className: 'data-grid',
  slots: [
    'wrapper',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'column',
    'row',
    'cell',
    'cellContent',
    'sortIndicator',
    'infoIndicator',
    'pinButton',
    'resizer',
    'resizerButton',
    'columnContent',
    'columnWrapper',
    'tooltip',
    'tooltipContent',
    'tooltipButton',
  ],
  base: {
    wrapper: {
      overflow: 'auto',
      position: 'relative',
      maxWidth: 'full',
      scrollbarWidth: 'thin',
      scrollbarColor: '{colors.grayLight.200} transparent',
    },
    table: {
      bgColor: 'background.primary',
      maxWidth: 'full',
      width: 'full',

      '&[data-is-virtualize="true"]': {
        display: 'grid',
      },
    },
    thead: {
      '[data-is-virtualize="true"] &': {
        display: 'grid',
        position: 'sticky',
        top: '0',
        zIndex: 1,
      },
    },
    tbody: {
      '[data-is-virtualize="true"] &': {
        display: 'grid',
        position: 'relative',
      },
    },
    row: {
      '[data-is-virtualize="true"] &': {
        display: 'flex',
      },
    },
    tfoot: {
      '[data-is-virtualize="true"] &': {
        display: 'grid',
        position: 'sticky',
        bottom: '0',
        zIndex: 1,
      },
    },
    column: {
      bgColor: 'grayLight.50',
      textStyle: 'xs',
      fontWeight: 'medium',
      color: 'text.tertiary',
      textAlign: 'left',
      position: 'relative',
      maxWidth: 'full',

      '&[data-resizing="true"]': {
        background: 'brand.50!',
        borderRightColor: 'brand.600!',
      },
    },
    columnContent: {
      display: 'inline-block',
      verticalAlign: 'middle',
      maxWidth: 'full',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    columnWrapper: {
      display: 'flex',
      gap: '1',
      maxWidth: '100%',
      alignItems: 'center',
    },
    cell: {
      bgColor: 'white',
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'text.tertiary',
      textAlign: 'left',
      position: 'relative',

      '&[data-resizing="true"]': {
        background: 'brand.50!',
        borderRightColor: 'brand.600!',
      },
    },
    cellContent: {
      display: 'inline-block',
      verticalAlign: 'middle',
      maxWidth: 'full',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    sortIndicator: {
      display: 'inline-flex',
    },
    infoIndicator: {
      lineHeight: '0',
      '& > button': {
        padding: '0',
      },
    },
    pinButton: {
      opacity: 0,
      visibility: 'hidden',
      zIndex: '-1',
      transition: '0.2s',
      color: 'fg.quinary',
      display: 'inline-flex',

      'th:hover &': {
        opacity: 1,
        visibility: 'visible',
        zIndex: 1,
      },

      '&[data-is-pin="true"]': {
        opacity: 1,
        visibility: 'visible',
        zIndex: 1,
      },
    },
    resizer: {
      boxSizing: 'border-box',
      position: 'absolute',
      right: 'none',
      top: '50%',
      transform: 'translate(50%, -50%)',
      opacity: 0,
      visibility: 'hidden',
      zIndex: '-1',
      transition: '0.2s',
      width: '5.5',
      height: '5.5',

      _hover: {
        opacity: 1,
        visibility: 'visible',
        zIndex: 1,
      },

      'th:hover &': {
        opacity: 1,
        visibility: 'visible',
        zIndex: 1,
      },

      'th:last-of-type &': {
        transform: 'translate(0, -50%)',
        width: '3',
        overflow: 'hidden',
      },

      '&[data-resizing="true"]': {
        opacity: 1,
        visibility: 'visible',
        zIndex: 1,
      },
    },
    resizerButton: {
      padding: '1!important',
      lineHeight: '1!important',
      backgroundColor: 'fg.white',
      cursor: 'ew-resize',
    },
    tooltip: {
      textStyle: 'sm',
      fontWeight: 'semibold',
      color: 'grayCool.700',
      backgroundColor: 'fg.white',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      paddingInline: '3',
      paddingBlock: '2',
      rounded: '2',
      boxShadow: 'xs',
    },
    tooltipContent: {
      flexGrow: 1,
      wordBreak: 'break-word',
    },
    tooltipButton: {},
  },
  variants: {
    size: {
      sm: {
        column: {
          paddingInline: '3',
          height: '44px',
        },
        cell: {
          paddingInline: '3',
          height: '10',
        },
        tooltip: {
          marginLeft: '-3',
        },
      },
      md: {
        column: {
          paddingInline: '6',
          height: '11',
        },
        cell: {
          paddingInline: '6',
          height: '18',
        },
        tooltip: {
          marginLeft: '-6',
        },
      },
    },
    border: {
      none: {},
      bottom: {
        column: {
          borderBottomWidth: 'thin',
          borderColor: 'border.secondary',
        },
        cell: {
          borderBottomWidth: 'thin',
          borderColor: 'border.secondary',
        },
      },
      full: {
        table: {
          bgColor: 'background.primary',
          borderWidth: 'thin',
          borderColor: 'border.secondary',
          borderCollapse: 'collapse',
        },
        column: {
          borderWidth: 'thin',
          borderColor: 'border.secondary',
        },
        cell: {
          borderWidth: 'thin',
          borderColor: 'border.secondary',
        },
      },
      resizable: {
        wrapper: {
          borderTopWidth: 'thin',
          borderColor: 'border.secondary',
        },
        table: {
          bgColor: 'background.primary',
          borderCollapse: 'collapse',
          boxSizing: 'border-box',
        },
        column: {
          display: 'flex',
          alignItems: 'center',
          borderBottomWidth: 'thin',
          borderColor: 'border.secondary',

          '&[data-resizing="true"]': {
            background: 'brand.50!',
            borderRightWidth: 'thin',
            borderRightColor: 'brand.600!',
          },

          '&[data-is-pin="true"]': {
            borderRightWidth: 'thin',

            '&:hover': {
              zIndex: '2!important',
            },
          },

          '&[data-is-pin="false"] + &[data-is-pin="false"]': {
            borderLeftWidth: 'thin',
          },

          '&[data-is-pin="false"] + &[data-is-pin="true"]': {
            borderLeftWidth: 'thin',
          },
        },
        cell: {
          display: 'flex',
          alignItems: 'center',
          borderBottomWidth: 'thin',
          borderColor: 'border.secondary',

          '&[data-resizing="true"]': {
            background: 'brand.50!',
            borderRightWidth: 'thin',
            borderRightColor: 'brand.600!',
          },

          '&[data-is-pin="true"]': {
            borderRightWidth: 'thin',
          },

          '&[data-is-pin="false"] + &[data-is-pin="false"]': {
            borderLeftWidth: 'thin',
          },

          '&[data-is-pin="false"] + &[data-is-pin="true"]': {
            borderLeftWidth: 'thin',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    border: 'full',
  },
  staticCss: ['*'],
});
