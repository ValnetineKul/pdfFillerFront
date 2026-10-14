import { defineRecipe } from '@pandacss/dev';

export const inputPlugRecipe = defineRecipe({
  className: 'input-plug',
  base: {
    width: 'full',
    height: '11',
    display: 'inline-flex',
    position: 'relative',
    rounded: '2',
    textStyle: 'md',
    borderWidth: 'thin',
    outlineOffset: '-0.5',
    borderStyle: 'solid',
    paddingBlock: '2.5',
    paddingInline: '3.5',
    backgroundColor: 'background.primary',
    gap: '2',
    color: 'text.placeholder',
    borderColor: 'border.primary',
    maxWidth: 'full',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  staticCss: ['*'],
});
