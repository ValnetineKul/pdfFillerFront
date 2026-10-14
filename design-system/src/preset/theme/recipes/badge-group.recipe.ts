import { defineSlotRecipe } from '@pandacss/dev';

export const badgeGroupRecipe = defineSlotRecipe({
  className: 'badge-group',
  slots: ['group', 'list'],
  base: {
    group: {
      display: 'flex',
      alignItems: 'center',
    },
    list: {
      gap: '4',
      display: 'inline-flex',
      flexWrap: 'wrap',
    },
  },
  staticCss: ['*'],
});
