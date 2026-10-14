import { defineSlotRecipe } from '@pandacss/dev';

export const tooltipRecipe = defineSlotRecipe({
  className: 'tooltip',
  slots: ['root', 'arrow', 'content', 'title', 'description'],
  base: {
    root: {
      rounded: 'tooltip.root',
      backgroundColor: 'tooltip.default.bg',
      gap: '1',
      boxSizing: 'border-box',
      paddingBlock: '2',
      paddingInline: '3',
      boxShadow: 'sm',

      _placementTop: {
        '--popover-slide-position': 'translateY(2)',
        marginBottom: '1',
        '&:has([slot="arrow"])': {
          marginBottom: '2',
        },
      },
      _placementBottom: {
        '--popover-slide-position': 'translateY(-2)',
        marginTop: '1',
        '&:has([slot="arrow"])': {
          marginTop: '2',
        },
      },
      _placementRight: {
        '--popover-slide-position': 'translateX(-2)',
        marginLeft: '1',
        '&:has([slot="arrow"])': {
          marginLeft: '2',
        },
      },
      _placementLeft: {
        '--popover-slide-position': 'translateX(2)',
        marginRight: '1',
        '&:has([slot="arrow"])': {
          marginRight: '2',
        },
      },
      _entering: {
        animationName: 'popoverSlide',
        animationDuration: '200ms',
      },
      _exiting: {
        animationName: 'popoverSlide',
        animationDirection: 'reverse',
        animationDuration: '200ms',
        animationTimingFunction: 'ease-in',
      },
    },
    arrow: {
      '& svg': {
        display: 'block',
        width: '10px',
        height: '10px',
        transformOrigin: 'center',
        pointerEvents: 'none',
        filter:
          'drop-shadow(0 1px 2px rgba(16, 24, 40, 0.06)) ' +
          'drop-shadow(0 2px 4px rgba(16, 24, 40, 0.10))',
      },
      '& svg path': {
        color: 'tooltip.default.bg',
      },
      '&[data-placement*="bottom"] svg': {
        transform: 'rotate(180deg)',
      },
      '&[data-placement*="top"] svg': {
        transform: 'rotate(0deg)',
      },
      '&[data-placement*="right"] svg': {
        transform: 'rotate(90deg)',
      },
      '&[data-placement*="left"] svg': {
        transform: 'rotate(-90deg)',
      },
    },
    content: {
      maxHeight: 'inherit',
      height: 'full',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      color: 'text.primary',
      textStyle: 'xs',
      fontWeight: 'semibold',
    },
    description: {
      color: 'text.tertiary',
      textStyle: 'xs',
      fontWeight: 'medium',
    },
  },
  staticCss: ['*'],
});
