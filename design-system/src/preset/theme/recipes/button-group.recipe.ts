import { defineSlotRecipe } from '@pandacss/dev';

export const buttonGroupRecipe = defineSlotRecipe({
  className: 'button-group',
  slots: ['root', 'button'],
  base: {
    root: {
      display: 'flex',
    },
    button: {
      _notFirst: {
        borderTopLeftRadius: 'none',
        borderBottomLeftRadius: 'none',
      },
      _notLast: {
        borderTopRightRadius: 'none',
        borderBottomRightRadius: 'none',
      },
      _hovered: {
        zIndex: 'hover',
      },
    },
  },
  variants: {
    variant: {
      solid: {
        button: {
          _notFirst: {
            marginInlineStart: `{borderWidths.thin}`,
          },
        },
      },
      outline: {
        button: {
          _notFirst: {
            marginInlineStart: `calc({borderWidths.thin} * -1)`,
          },
        },
      },
      subtle: {},
      link: {},
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
  staticCss: ['*'],
});
