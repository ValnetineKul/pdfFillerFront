import { defineSlotRecipe } from '@pandacss/dev';

export const drawerRecipe = defineSlotRecipe({
  className: 'drawer',
  slots: [
    'root',
    'overlay',
    'headerWrapper',
    'header',
    'description',
    'content',
    'footer',
  ],
  base: {
    root: {
      overflow: 'hidden',
      backgroundColor: 'background.primary',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100dvh - env(safe-area-inset-bottom))',
      '& [slot="close"]': {
        position: 'absolute',
        right: '3',
        top: '3',
      },
    },
    headerWrapper: {
      position: 'sticky',
      top: '0',
      paddingInline: '4',
      paddingBlock: '6',
    },
    header: {
      display: 'flex',
      gap: '2',
      textStyle: 'lg',
      fontWeight: 'semibold',
      color: 'text.primary',
    },
    description: {
      textStyle: 'sm',
      color: 'text.tertiary',
      wordBreak: 'break-word',
      display: 'block',
    },
    content: {
      flexGrow: 1,
      overflowY: 'auto',
      paddingInline: '4',
      paddingBottom: '6',
      display: 'flex',
      flexDirection: 'column',
      color: 'text.secondary',
    },
    footer: {
      position: 'sticky',
      bottom: '-6',
      display: 'flex',
      gap: '2',
      paddingBlock: '6',
      marginTop: 'auto',
      marginBottom: '-6',
      backgroundColor: 'background.primary',
    },
    overlay: {
      inset: '0',
      position: 'fixed',
      backdropFilter: 'auto',
      backdropBlur: '1',
      backgroundColor: 'modal.bgOverlay',
      zIndex: 'modal',
    },
  },
  staticCss: ['*'],
});

export const drawerAnimatedRecipe = defineSlotRecipe({
  className: 'drawer-animated',
  slots: ['root', 'overlay'],
  base: {
    root: {},
    overlay: {},
  },
  variants: {
    position: {
      left: {
        root: { left: '0', top: '0', bottom: '0' },
      },
      right: {
        root: { right: '0', top: '0', bottom: '0' },
      },
      top: {
        root: { right: '0', left: '0', top: '0', borderBottomRadius: '4' },
      },
      bottom: {
        root: { borderTopRadius: '4', right: '0', left: '0', bottom: '0' },
      },
    },
    isEntering: {
      true: {
        overlay: {
          opacity: 1,
          transition: 'opacity 200ms ease-in',
        },
      },
    },
    isExiting: {
      true: {
        overlay: {
          opacity: 0,
          transition: 'opacity 200ms ease-out',
        },
      },
    },
    size: {
      auto: {},
      full: {
        root: {
          height: '90%',
        },
      },
    },
  },
  compoundVariants: [
    {
      position: 'top',
      isEntering: true,
      css: {
        root: {
          animationName: 'drawerTopSlide',
          animationDirection: 'reverse',
          animationDuration: '200ms',
          animationTimingFunction: 'ease-in',
        },
      },
    },
    {
      position: 'top',
      isExiting: true,
      css: {
        root: {
          animationName: 'drawerTopSlide',
          animationDuration: '250ms',
          animationTimingFunction: 'ease-out',
        },
      },
    },
    {
      position: 'bottom',
      isEntering: true,
      css: {
        root: {
          animationName: 'drawerBottomSlide',
          animationDirection: 'reverse',
          animationDuration: '200ms',
          animationTimingFunction: 'ease-in',
        },
      },
    },
    {
      position: 'bottom',
      isExiting: true,
      css: {
        root: {
          animationName: 'drawerBottomSlide',
          animationDuration: '250ms',
          animationTimingFunction: 'ease-out',
        },
      },
    },
    {
      position: 'right',
      isEntering: true,
      css: {
        root: {
          animationName: 'drawerRightSlide',
          animationDirection: 'reverse',
          animationDuration: '200ms',
          animationTimingFunction: 'ease-in',
        },
      },
    },
    {
      position: 'right',
      isExiting: true,
      css: {
        root: {
          animationName: 'drawerRightSlide',
          animationDuration: '250ms',
          animationTimingFunction: 'ease-out',
        },
      },
    },
    {
      position: 'left',
      isEntering: true,
      css: {
        root: {
          animationName: 'drawerLeftSlide',
          animationDirection: 'reverse',
          animationDuration: '200ms',
          animationTimingFunction: 'ease-in',
        },
      },
    },
    {
      position: 'left',
      isExiting: true,
      css: {
        root: {
          animationName: 'drawerLeftSlide',
          animationDuration: '250ms',
          animationTimingFunction: 'ease-out',
        },
      },
    },
  ],
  defaultVariants: {
    position: 'right',
    size: 'auto',
  },
  staticCss: ['*'],
});
