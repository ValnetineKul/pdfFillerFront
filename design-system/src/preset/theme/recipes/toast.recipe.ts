import { defineSlotRecipe } from '@pandacss/dev';

export const toastRecipe = defineSlotRecipe({
  className: 'toast',
  slots: ['root', 'content', 'region'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: '4',
      borderRadius: '3',
      borderStyle: 'solid',
      borderWidth: 'thin',
      borderColor: 'border.primary',
      maxWidth: '120',
      minWidth: '72',
      width: 'full',
      position: 'relative',
      boxShadow: 'md',
      backgroundColor: 'background.primary.alt',
      '& [slot="close"]': {
        position: 'absolute',
        right: '2',
        top: '2',
      },
    },
    content: { color: 'text.primary' },
    region: {
      flexDirection: 'column',
      gap: '2',
      display: 'flex',
      position: 'fixed',
      padding: '4',
      zIndex: 'toast',
      w768: {
        padding: '6',
      },
    },
  },
  variants: {
    position: {
      top: {
        region: {
          top: '0',
          right: '0',
        },
      },
      bottom: {
        region: {
          bottom: '0',
          right: '0',
        },
      },
    },
  },
  defaultVariants: {
    position: 'bottom',
  },
  staticCss: ['*'],
});
