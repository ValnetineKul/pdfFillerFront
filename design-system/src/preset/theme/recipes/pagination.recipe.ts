import { defineSlotRecipe } from '@pandacss/dev';

export const paginationRecipe = defineSlotRecipe({
  className: 'pagination',
  staticCss: ['*'],
  slots: [
    'wrapper',
    'desktopOnly',
    'prev',
    'icon',
    'changer',
    'next',
    'button',
    'pageItem',
    'pageInputWrapper',
    'pageInput',
    'pageInputGroup',
    'goToPageLabel',
    'pageSizeSelectWrapper',
    'mobileControls',
    'mobilePageFieldWrapper',
    'mobilePageTotalSeparator',
    'mobilePageInput',
    'mobilePageTotal',
    'navButton',
    'mobileOnly',
    'pageSizeSelectItemLabel',
    'mobileNavButton',
    'mobileNavButtonIcon',
  ],
  base: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: 'full',
      gap: '3',
      containerType: 'inline-size',
    },
    desktopOnly: {
      display: 'none',
      '@/w768': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        flexShrink: '0',
        alignItems: 'flex-end',
        gap: '3',
        width: 'full',
        minWidth: '0',
      },
    },
    pageSizeSelectItemLabel: {
      whiteSpace: 'nowrap',
      color: 'text.placeholder',
    },
    prev: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: '0',
    },
    icon: {
      width: '5',
      height: '5',
    },
    next: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: '0',
    },
    changer: {
      display: 'flex',
      gap: '1',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      flex: '1 1 0%',
      minWidth: '0',
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },
    pageItem: {
      listStyle: 'none',
    },
    navButton: {
      borderRadius: '2',
      borderWidth: 'thin',
      borderStyle: 'solid',
      borderColor: 'button.secondary.pale.border',
      color: 'button.secondary.pale.fg',
      _disabled: {
        backgroundColor: 'background.primary',
        color: 'fg.disabled.subtle',
      },
    },
    button: {
      minWidth: '10',
      height: '10',
      paddingInline: '3',
      borderRadius: '2',
      cursor: 'pointer',
      color: 'text.secondary',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      _hover: {
        bgColor: 'background.primary.hover',
        color: 'text.secondary.hover',
      },
      '&[data-active="true"]': {
        bgColor: 'background.primary.pressed',
        color: 'text.secondary.hover',
        pointerEvents: 'none',
      },
      '&[data-dot="true"]': {
        bgColor: 'transparent',
        pointerEvents: 'none',
        color: 'text.disabled',
        display: 'flex',
        alignItems: 'center',
      },
    },
    pageInputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      justifyContent: 'flex-end',
      flexShrink: '0',
    },
    pageInputWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
    },
    pageInput: {
      '& input': {
        width: '18',
        textAlign: 'center',
      },
    },
    goToPageLabel: {
      color: 'fg.secondary',
      fontSize: '14px',
      fontWeight: '500',
    },
    pageSizeSelectWrapper: {
      width: 'full',
      order: -1,
      '@/w768': {
        width: 'fit-content',
        flexShrink: '0',
        order: '0',
      },
    },
    mobileOnly: {
      display: 'flex',
      width: 'full',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '5',

      '@/w768': {
        display: 'none',
      },
    },
    mobileControls: {
      display: 'flex',
      width: 'full',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobilePageFieldWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      justifyContent: 'center',
      minWidth: '0',
    },
    mobilePageInput: {
      width: 'fit-content',
      flex: '0 1 auto',
      '& input': {
        textAlign: 'center',
        color: 'text.secondary',
        minWidth: '12',
        maxWidth: '16',
        fieldSizing: 'content',
      },
    },
    mobilePageTotal: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: '0',
      color: 'text.secondary',
      fontSize: '16px',
      fontWeight: '600',
      whiteSpace: 'nowrap',
      wordBreak: 'keep-all',
    },
    mobilePageTotalSeparator: {
      color: 'text.disabled',
      textStyle: 'md',
      fontWeight: '600',
    },
    mobileNavButton: {
      width: '9',
      height: '9',
      _disabled: {
        color: 'fg.disabled.subtle',
      },
    },
    mobileNavButtonIcon: {
      iconSize: 'md',
    },
  },
  variants: {
    theme: {
      default: {},
      secondary: {},
    },
    pageChangerPosition: {
      center: {
        changer: {
          justifyContent: 'center',
        },
      },
      start: {
        changer: {
          justifyContent: 'flex-start',
        },
      },
      end: {
        prev: {
          order: '4',
        },
        next: {
          order: '5',
        },
        changer: {
          order: '3',
          justifyContent: 'flex-end',
        },
        pageInputGroup: {
          order: '1',
        },
        pageSizeSelectWrapper: {
          color: 'text.placeholder',
          '@/w768': {
            order: '2',
          },
        },
      },
    },
  },
  defaultVariants: {
    theme: 'default',
    pageChangerPosition: 'start',
  },
});
