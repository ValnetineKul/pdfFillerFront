import { defineSlotRecipe } from '@pandacss/dev';

export const fileTypeIconsRecipe = defineSlotRecipe({
  className: 'file-type-icons',
  slots: ['root', 'icon'],
  base: {
    root: {
      display: 'flex',
      color: 'border.primary',
    },
  },
  staticCss: ['*'],
});
