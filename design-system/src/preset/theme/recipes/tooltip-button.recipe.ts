import { defineRecipe } from '@pandacss/dev';

export const tooltipButtonRecipe = defineRecipe({
  className: 'tooltip-button',
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    outlineWidth: 'none',
    color: { base: 'fg.quinary', _invalid: 'fg.error.secondary' },
    padding: '1',
    '& svg': {
      path: 'currentColor',
      stroke: 'currentColor',
    },
    _hovered: {
      color: { base: 'fg.quinary.hover', _invalid: 'fg.error.primary' },
    },
    _pressed: {
      color: { base: 'fg.quinary.hover', _invalid: 'fg.error.primary' },
    },
  },
  staticCss: ['*'],
});
