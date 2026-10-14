import { defineRecipe } from '@pandacss/dev';

export const asteriskRecipe = defineRecipe({
  className: 'asterisk',
  base: {
    color: 'text.brand.tertiary',
    paddingInlineStart: '0.5',
  },
  staticCss: ['*'],
});
