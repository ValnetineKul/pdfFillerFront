import { defineRecipe } from '@pandacss/dev';

export const separatorRecipe = defineRecipe({
  className: 'separator',
  base: {
    borderColor: 'inherit',
    '&:not([aria-orientation="vertical"])': {
      borderTopWidth: 'thin',
      borderTopStyle: 'solid',
      width: 'full',
    },
    '&[aria-orientation="vertical"]': {
      borderRightWidth: 'thin',
      borderRightStyle: 'solid',
    },
  },
  staticCss: ['*'],
});
