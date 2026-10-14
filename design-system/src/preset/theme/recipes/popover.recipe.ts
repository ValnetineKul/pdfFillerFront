import { defineSlotRecipe } from '@pandacss/dev';

export const popoverRecipe = defineSlotRecipe({
  className: 'popover',
  slots: ['root', 'arrow', 'content'],
  base: {
    root: {
      rounded: 'popover.root',
      borderWidth: 'thin',
      borderStyle: 'solid',
      borderColor: 'border.primary',
      backgroundColor: 'background.primary',
      gap: '2',
      boxSizing: 'border-box',

      _placementTop: {
        '--popover-slide-position': 'translateY(2)',
        '&:has([slot="arrow"])': {
          marginBottom: '2',
        },
      },
      _placementBottom: {
        '--popover-slide-position': 'translateY(-2)',
        '&:has([slot="arrow"])': {
          marginTop: '2',
        },
      },
      _placementRight: {
        '--popover-slide-position': 'translateX(-2)',
        '&:has([slot="arrow"])': {
          marginLeft: '2',
        },
      },
      _placementLeft: {
        '--popover-slide-position': 'translateX(2)',
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
        fill: 'background.primary',
        stroke: 'border.primary',
      },
      '&[data-placement="bottom"] svg': {
        transform: 'rotate(180deg)',
      },
      '&[data-placement="right"] svg': {
        transform: 'rotate(90deg)',
      },
      '&[data-placement="left"] svg': {
        transform: 'rotate(-90deg)',
      },
    },
    content: {
      maxHeight: 'inherit',
      height: 'full',
      overflow: 'hidden',
      rounded: 'popover.content',
      display: 'flex',
      flexDirection: 'column',
      color: 'text.secondary',
    },
  },
  variants: {
    useOffset: {
      true: {
        root: {
          _placementTop: { marginBottom: '1' },
          _placementBottom: { marginTop: '1' },
          _placementRight: { marginLeft: '1' },
          _placementLeft: { marginRight: '1' },
        },
      },
      false: {
        root: {
          _placementTop: { marginBottom: '0' },
          _placementBottom: { marginTop: '0' },
          _placementRight: { marginLeft: '0' },
          _placementLeft: { marginRight: '0' },
        },
      },
    },
  },
  defaultVariants: {
    useOffset: true,
  },
  staticCss: ['*'],
});
