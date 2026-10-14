import { defineRecipe } from '@pandacss/dev';

export const scrollIntoViewHocRecipe = defineRecipe({
  className: 'scroll-into-view-hoc',
  base: {
    display: 'contents',
  },
  staticCss: ['*'],
});
