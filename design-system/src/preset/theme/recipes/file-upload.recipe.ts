import { defineSlotRecipe } from '@pandacss/dev';

export const fileUploadRecipe = defineSlotRecipe({
  className: 'file-upload',
  slots: ['root', 'cardsList'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
    },
    cardsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
    },
  },
  staticCss: ['*'],
});
