import { defineRecipe } from '@pandacss/dev';

export const listBoxRecipe = defineRecipe({
  className: 'list-box',
  base: {
    display: 'flex',
    _vertical: { flexDirection: 'column' },
    _horizontal: {
      flexDirection: 'row',
    },
  },

  staticCss: ['*'],
});
