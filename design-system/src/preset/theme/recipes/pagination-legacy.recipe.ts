import { defineSlotRecipe } from '@pandacss/dev';

const shiftMargin = 'calc({borderWidths.thin} * -1)';

export const paginationLegacyRecipe = defineSlotRecipe({
  className: 'paginationLegacy',
  staticCss: ['*'],
  slots: [
    'wrapper',
    'prev',
    'changer',
    'next',
    'button',
    'pageInputWrapper',
    'pageInput',
    'pageInputGroup',
    'pageInputGroupLabel',
    'goToPageLabel',
  ],
  base: {
    wrapper: {
      alignItems: 'center',
    },
    changer: {
      gridArea: 'changer',
      display: 'flex',
      color: 'fg.tertiary',
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    pageInputWrapper: {
      display: 'flex',
      gap: '2',
      alignItems: 'center',
    },
    pageInput: {
      width: '17',
    },
    goToPageLabel: {
      color: 'text.secondary',
      textStyle: 'sm',
      fontWeight: 'medium',
    },
    pageInputGroup: {
      minWidth: '32',
      gridArea: 'input',
      display: 'flex',
      gap: '2',
      alignItems: 'center',
      w375: { minWidth: '35' },
    },
    pageInputGroupLabel: {
      color: 'fg.secondary',
      fontWeight: 'medium',
      textStyle: 'sm',
      display: 'flex',
      flexShrink: '0',
    },
    button: {
      minWidth: '11',
      height: 'auto',
      paddingBlock: '2.5',
      paddingInline: '2',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      _hovered: {
        bgColor: 'background.primary.hover',
      },
      _isActive: {
        color: 'fg.primary',
        bgColor: 'background.primary.hover',
      },
      _focusVisible: {
        boxShadow: 'focusRing.gray.400',
        position: 'relative',
        zIndex: 1,
      },
      '&[data-dot="true"]': {
        pointerEvents: 'none',
        _focusVisible: {
          boxShadow: 'none',
        },
      },
    },
  },
  variants: {
    theme: {
      default: {
        wrapper: {
          display: 'grid',
          justifyContent: 'space-between',
          gap: '3',
        },
        prev: {
          gridArea: 'prev',
          display: 'flex',
          justifyContent: 'start',
        },
        changer: {
          justifyContent: 'center',
          gap: '0.5',
          '> first-child': {
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
          },
          '> last-child': {
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
          },
          '& > [slot="pageChangerInfo"]': {
            whiteSpace: 'nowrap',
          },
        },
        next: {
          gridArea: 'next',
          display: 'flex',
          justifyContent: 'end',
        },
        button: {
          borderRadius: 'pagination.default.button',
        },
      },
      secondary: {
        wrapper: {
          display: 'inline-grid',
          width: 'min-content',
        },
        changer: {
          whiteSpace: 'nowrap',
          gap: '0',
          '& > [slot="pageChangerInfo"]': {
            paddingBlock: '2.5',
            paddingInline: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 'thin',
            borderStyle: 'solid',
            borderColor: 'button.secondary.pale.border',
          },
        },
        prev: {
          display: 'flex',
        },
        next: {
          display: 'flex',
        },
        button: {
          borderWidth: 'thin',
          borderStyle: 'solid',
          borderColor: 'button.secondary.pale.border',
        },
      },
    },
    pageChangerPosition: {
      center: {
        wrapper: {
          gridTemplateAreas: `'prev changer input next'`,
          gridTemplateColumns: 'min-content 2fr min-content min-content',
        },
      },
      start: {
        wrapper: {
          gridTemplateAreas: `'input changer prev next'`,
          gridTemplateColumns: 'min-content 1fr min-content min-content',
        },
        changer: {
          justifyContent: 'flex-end',
        },
      },
      end: {
        wrapper: {
          gridTemplateAreas: `'prev next changer input'`,
          gridTemplateColumns: 'min-content min-content 1fr min-content',
        },
        changer: {
          justifyContent: 'flex-start',
        },
      },
      bottom: {
        wrapper: {
          gridTemplateRows: 'auto auto',
          gridTemplateAreas: `
          'input input input'
          'prev changer next'`,
          gridTemplateColumns: 'min-content 1fr min-content',
        },
        pageInputGroup: {
          justifyContent: 'flex-end',
        },
      },
    },
  },

  compoundVariants: [
    {
      theme: 'secondary',
      pageChangerPosition: 'start',
      css: {
        changer: {
          marginEnd: shiftMargin,
          '& > button': {
            _notLast: {
              marginEnd: shiftMargin,
            },
            _first: {
              borderTopLeftRadius: 'pagination.group.start',
              borderBottomLeftRadius: 'pagination.group.start',
            },
          },
          '& > [slot="pageChangerInfo"]': {
            borderTopLeftRadius: 'pagination.group.start',
            borderBottomLeftRadius: 'pagination.group.start',
          },
        },
        prev: {
          marginEnd: shiftMargin,
          '& > button': {
            borderRadius: '0',
          },
        },
        next: {
          '& > button': {
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
          },
        },
      },
    },
    {
      theme: 'secondary',
      pageChangerPosition: 'center',
      css: {
        prev: {
          marginEnd: shiftMargin,
          '& > button': {
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
          },
        },
        changer: {
          '& > button:not(:last-child)': {
            marginEnd: shiftMargin,
          },
        },
        next: {
          marginStart: shiftMargin,
          '& > button': {
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
          },
        },
      },
    },
    {
      theme: 'secondary',
      pageChangerPosition: 'end',
      css: {
        prev: {
          marginEnd: shiftMargin,
          '& > button': {
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
          },
        },
        next: {
          marginEnd: shiftMargin,
          '& > button': {
            borderRadius: '0',
          },
        },
        changer: {
          '& > button': {
            _notLast: {
              marginEnd: shiftMargin,
            },
            _last: {
              borderTopRightRadius: 'pagination.group.end',
              borderBottomRightRadius: 'pagination.group.end',
            },
          },
          '& > [slot="pageChangerInfo"]': {
            borderTopRightRadius: 'pagination.group.end',
            borderBottomRightRadius: 'pagination.group.end',
          },
        },
      },
    },
  ],
});
