import { defineSlotRecipe } from '@pandacss/dev';

export const menuRecipe = defineSlotRecipe({
  className: 'menu',
  slots: ['root'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      rounded: 'menu.root',
      paddingBlock: '1',
      backgroundColor: 'background.primary',
      boxSizing: 'border-box',
      overflow: 'auto',
      outlineWidth: 'none',
      outlineColor: 'transparent',
      outlineOffset: '0.25',
      borderColor: 'border.secondary',
    },
  },
  staticCss: ['*'],
});
