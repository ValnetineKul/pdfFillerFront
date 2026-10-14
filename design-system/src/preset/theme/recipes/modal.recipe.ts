import { defineSlotRecipe } from '@pandacss/dev';

export const modalRecipe = defineSlotRecipe({
  className: 'modal',
  slots: ['root', 'rootWrapper', 'overlay'],
  base: {
    root: {
      rounded: 'modal.root',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'background.primary',
      transformOrigin: 'center',
      _entering: {
        animationName: 'modalContentShow',
        animationDuration: '200ms',
        animationTimingFunction: 'ease-out',
      },
      _exiting: {
        animationName: 'modalContentShow',
        animationDirection: 'reverse',
        animationDuration: '200ms',
        animationTimingFunction: 'ease-in',
      },
      '& [slot="title"]': {
        maxWidth: '80%',
        textStyle: 'lg',
        fontWeight: 'semibold',
        color: 'text.primary',
      },
      '& [slot="description"]': {
        textStyle: 'sm',
        color: 'text.tertiary',
        wordBreak: 'break-word',
        display: 'block',
      },
      '& [slot="close"]': {
        position: 'absolute',
        right: '3',
        top: '3',
      },
    },
    rootWrapper: {
      // https://react-spectrum.adobe.com/react-aria/Modal.html#modaloverlay
      height: 'var(--visual-viewport-height)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      inset: '0',
      width: '100vw',
      position: 'fixed',
      backdropFilter: 'auto',
      backdropBlur: '2',
      backgroundColor: 'modal.bgOverlay',
      zIndex: 'modal',
      _entering: {
        animationName: 'modalOverlayFade',
        animationDuration: '200ms',
        animationTimingFunction: 'ease-out',
      },
      _exiting: {
        animationName: 'modalOverlayFade',
        animationDirection: 'reverse',
        animationDuration: '200ms',
        animationTimingFunction: 'ease-in',
      },
    },
  },
  staticCss: ['*'],
});
