import { defineSlotRecipe } from '@pandacss/dev';

export const tableRecipe = defineSlotRecipe({
  className: 'table',
  slots: ['root', 'column', 'row', 'cell'],
  base: {
    root: {
      bgColor: 'background.primary',
    },
    column: {
      paddingBlock: '2.5',
      paddingInline: '6',
      borderBottomWidth: 'thin',
      borderColor: 'border.secondary',
      color: 'text.tertiary',
      textStyle: 'xs',
      fontWeight: 'medium',
      textAlign: 'left',
    },
    cell: {
      paddingBlock: '4',
      minHeight: '18',
      paddingInline: '6',
      borderBottomWidth: 'thin',
      borderColor: 'border.secondary',
      color: 'text.tertiary',
      textStyle: 'sm',
      textAlign: 'left',
    },
  },
  staticCss: ['*'],
});
