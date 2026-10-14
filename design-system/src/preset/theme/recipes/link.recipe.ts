import { defineRecipe } from '@pandacss/dev';

export const linkRecipe = defineRecipe({
  className: 'link',
  base: {
    fontWeight: 'semibold',
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
    },
    _focusVisible: {
      textDecoration: 'underline',
    },
  },
  variants: {
    colorScheme: {
      primary: {
        base: {
          color: 'link.default.fg',
        },
        _hovered: {
          color: 'link.default.fgHover',
        },
        _pressed: {
          color: 'link.default.fg',
        },
        _disabled: {
          color: 'link.disabled.fg',
        },
      },
      secondary: {
        base: {
          color: 'link.pale.fg',
        },
        _hovered: {
          color: 'link.pale.fgHover',
        },
        _pressed: {
          color: 'link.pale.fg',
        },
        _disabled: {
          color: 'link.disabled.fg',
        },
      },
      error: {
        base: {
          color: 'link.error.fg',
        },
        _hovered: {
          color: 'link.error.fgHover',
        },
        _pressed: {
          color: 'link.error.fg',
        },
        _disabled: {
          color: 'link.disabled.fg',
        },
      },
    },
    size: {
      sm: {
        textStyle: 'sm',
      },
      md: {
        textStyle: 'sm',
      },
      lg: {
        textStyle: 'md',
      },
      xl: {
        textStyle: 'md',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
    size: 'md',
  },
  staticCss: ['*'],
});
