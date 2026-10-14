import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5',
    borderRadius: 'button',
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'transparent',
    fontWeight: 'semibold',
    outlineWidth: 'none',
    cursor: 'pointer',
    _disabled: {
      _notPending: {
        cursor: 'not-allowed',
      },
    },
    _pending: {
      pointerEvents: 'none',
    },
  },
  variants: {
    variant: {
      solid: {},
      outline: {},
      subtle: {},
      link: {
        borderRadius: '0',
      },
    },
    width: {
      full: {
        width: 'full',
      },
      auto: {},
    },
    colorScheme: {
      primary: {
        _focusVisible: {
          boxShadow: 'focusRing.brand.500',
        },
      },
      secondary: {
        _focusVisible: {
          boxShadow: 'focusRing.gray.400',
        },
      },
      error: {
        _focusVisible: {
          boxShadow: 'focusRing.error.500',
        },
      },
    },
    size: {
      sm: {
        textStyle: 'sm',
        paddingBlock: '2',
        paddingInline: '3',
      },
      md: {
        textStyle: 'sm',
        paddingBlock: '2.5',
        paddingInline: '4',
      },
      lg: {
        textStyle: 'md',
        paddingBlock: '2.5',
        paddingInline: '4',
        gap: '2',
      },
      xl: {
        textStyle: 'md',
        paddingBlock: '3',
        paddingInline: '4.5',
        gap: '2.5',
      },
    },
    onlyIcon: {
      true: {},
    },
    noWrap: {
      true: {
        whiteSpace: 'nowrap',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      colorScheme: 'primary',
      css: {
        base: {
          bgColor: 'button.primary.default.bg',
          color: 'button.primary.default.fg',
          boxShadow: 'custom.glow.sm',
        },
        _hovered: {
          bgColor: 'button.primary.default.bgHover',
          color: 'button.primary.default.fgHover',
        },
        _pressed: {
          bgColor: 'button.primary.default.bgPressed',
        },
        _selected: {
          base: { bgColor: 'button.primary.default.bgPressed' },
          _hovered: {
            bgColor: 'button.primary.default.bgHover',
            color: 'button.primary.default.fgHover',
          },
          _pressed: {
            bgColor: 'button.primary.default.bgPressed',
          },
        },
        _disabled: {
          _notPending: {
            bgColor: 'button.primary.disabled.bg',
            color: 'button.primary.disabled.fg',
            borderColor: 'button.primary.disabled.border',
            boxShadow: 'none',
          },
        },
      },
    },
    {
      variant: 'solid',
      colorScheme: 'error',
      css: {
        base: {
          bgColor: 'button.primary.error.bg',
          color: 'button.primary.error.fg',
        },
        _hovered: {
          bgColor: 'button.primary.error.bgHover',
          color: 'button.primary.error.fgHover',
        },
        _pressed: {
          bgColor: 'button.primary.error.bgPressed',
        },
        _selected: {
          base: { bgColor: 'button.primary.error.bgPressed' },
          _hovered: {
            bgColor: 'button.primary.error.bgHover',
          },
          _pressed: {
            bgColor: 'button.primary.error.bgPressed',
          },
        },
        _disabled: {
          _notPending: {
            bgColor: 'button.primary.disabled.bg',
            color: 'button.primary.disabled.fg',
            borderColor: 'button.primary.disabled.border',
          },
        },
      },
    },
    {
      variant: 'outline',
      colorScheme: 'primary',
      css: {
        base: {
          color: 'button.secondary.default.fg',
          borderColor: 'button.secondary.default.border',
          bgColor: 'button.secondary.default.bg',
        },
        _hovered: {
          color: 'button.secondary.default.fgHover',
          bgColor: 'button.secondary.default.bgHover',
          borderColor: 'button.secondary.default.borderHover',
          boxShadow: 'custom.glow.sm',
        },
        _pressed: {
          bgColor: 'button.secondary.default.bgPressed',
          borderColor: 'button.secondary.default.borderPressed',
          boxShadow: 'custom.glow.sm',
        },
        _selected: {
          base: {
            bgColor: 'button.secondary.default.bgPressed',
            borderColor: 'button.secondary.default.borderPressed',
            boxShadow: 'custom.glow.sm',
          },
          _hovered: {
            color: 'button.secondary.default.fgHover',
            bgColor: 'button.secondary.default.bgHover',
            borderColor: 'button.secondary.default.borderHover',
          },
          _pressed: {
            bgColor: 'button.secondary.default.bgPressed',
            borderColor: 'button.secondary.default.borderPressed',
          },
        },
        _disabled: {
          _notPending: {
            color: 'button.secondary.disabled.fg',
            borderColor: 'button.secondary.disabled.border',
          },
        },
      },
    },
    {
      variant: 'outline',
      colorScheme: 'secondary',
      css: {
        base: {
          color: 'button.secondary.pale.fg',
          borderColor: 'button.secondary.pale.border',
          bgColor: 'button.secondary.pale.bg',
        },
        _hovered: {
          color: 'button.secondary.pale.fgHover',
          bgColor: 'button.secondary.pale.bgHover',
          borderColor: 'button.secondary.pale.borderHover',
        },
        _pressed: {
          bgColor: 'button.secondary.pale.bgPressed',
          borderColor: 'button.secondary.pale.borderPressed',
        },
        _selected: {
          base: {
            bgColor: 'button.secondary.pale.bgPressed',
            borderColor: 'button.secondary.pale.borderPressed',
          },
          _hovered: {
            color: 'button.secondary.pale.fgHover',
            bgColor: 'button.secondary.pale.bgHover',
            borderColor: 'button.secondary.pale.borderHover',
          },
          _pressed: {
            bgColor: 'button.secondary.pale.bgPressed',
            borderColor: 'button.secondary.pale.borderPressed',
          },
        },
        _disabled: {
          _notPending: {
            bgColor: 'button.secondary.disabled.bg',
            color: 'button.secondary.disabled.fg',
            borderColor: 'button.secondary.disabled.border',
          },
        },
      },
    },
    {
      variant: 'outline',
      colorScheme: 'error',
      css: {
        base: {
          color: 'button.secondary.error.fg',
          borderColor: 'button.secondary.error.border',
        },
        _hovered: {
          color: 'button.secondary.error.fgHover',
          bgColor: 'button.secondary.error.bgHover',
          borderColor: 'button.secondary.error.borderHover',
        },
        _pressed: {
          bgColor: 'button.secondary.error.bgPressed',
          borderColor: 'button.secondary.error.borderPressed',
        },
        _selected: {
          base: {
            bgColor: 'button.secondary.error.bgPressed',
            borderColor: 'button.secondary.error.borderPressed',
          },
          _hovered: {
            color: 'button.secondary.error.fgHover',
            bgColor: 'button.secondary.error.bgHover',
            borderColor: 'button.secondary.error.borderHover',
          },
          _pressed: {
            bgColor: 'button.secondary.error.bgPressed',
            borderColor: 'button.secondary.error.borderPressed',
          },
        },
        _disabled: {
          _notPending: {
            color: 'button.secondary.disabled.fg',
            borderColor: 'button.secondary.disabled.border',
          },
        },
      },
    },
    {
      variant: 'subtle',
      colorScheme: 'primary',
      css: {
        base: {
          color: 'button.tertiary.default.fg',
        },
        _hovered: {
          bgColor: 'button.tertiary.default.bgHover',
          color: 'button.tertiary.default.fgHover',
        },
        _pressed: {
          bgColor: 'button.tertiary.default.bgPressed',
        },
        _selected: {
          base: { bgColor: 'button.tertiary.default.bgPressed' },
          _hovered: {
            bgColor: 'button.tertiary.default.bgHover',
            color: 'button.tertiary.default.fgHover',
          },
          _pressed: {
            bgColor: 'button.tertiary.default.bgPressed',
          },
        },
        _disabled: {
          _notPending: {
            color: 'button.tertiary.disabled.fg',
          },
        },
      },
    },
    {
      variant: 'subtle',
      colorScheme: 'secondary',
      css: {
        base: {
          color: 'button.tertiary.pale.fg',
        },
        _hovered: {
          bgColor: 'button.tertiary.pale.bgHover',
          color: 'button.tertiary.pale.fgHover',
        },
        _pressed: {
          bgColor: 'button.tertiary.pale.bgPressed',
        },
        _selected: {
          base: { bgColor: 'button.tertiary.pale.bgPressed' },
          _hovered: {
            bgColor: 'button.tertiary.pale.bgHover',
            color: 'button.tertiary.pale.fgHover',
          },
          _pressed: {
            bgColor: 'button.tertiary.pale.bgPressed',
          },
        },
        _disabled: {
          _notPending: {
            color: 'button.tertiary.disabled.fg',
          },
        },
      },
    },
    {
      variant: 'subtle',
      colorScheme: 'error',
      css: {
        base: {
          color: 'button.tertiary.error.fg',
        },
        _hovered: {
          bgColor: 'button.tertiary.error.bgHover',
          color: 'button.tertiary.error.fgHover',
        },
        _pressed: {
          bgColor: 'button.secondary.error.bgPressed',
        },
        _selected: {
          base: { bgColor: 'button.secondary.error.bgPressed' },
          _hovered: {
            bgColor: 'button.tertiary.error.bgHover',
            color: 'button.tertiary.error.fgHover',
          },
          _pressed: {
            bgColor: 'button.secondary.error.bgPressed',
          },
        },
        _disabled: {
          _notPending: {
            color: 'button.tertiary.disabled.fg',
          },
        },
      },
    },
    {
      variant: 'link',
      colorScheme: 'primary',
      css: {
        base: {
          color: 'button.tertiary.default.fg',
        },
        _hovered: {
          color: 'button.tertiary.default.fgHover',
        },
        _pressed: {
          color: 'button.tertiary.default.fgPressed',
        },
        _focusVisible: {
          color: 'button.tertiary.default.fg',
          boxShadow: 'focusRing.brand.500',
          borderRadius: '1',
          background: 'button.link.default.bgFocus',
        },
        _disabled: {
          color: 'button.primary.disabled.fg',
        },
      },
    },
    {
      variant: 'link',
      colorScheme: 'secondary',
      css: {
        base: {
          color: 'button.tertiary.pale.fg',
        },
        _hovered: {
          color: 'button.tertiary.pale.fgHover',
        },
        _pressed: {
          color: 'button.tertiary.pale.fgPressed',
        },
        _focusVisible: {
          boxShadow: 'focusRing.gray.400',
          color: 'button.tertiary.pale.fg',
          borderRadius: '1',
          background: 'button.link.default.bgFocus',
        },
        _disabled: {
          color: 'button.secondary.disabled.fg',
        },
      },
    },
    {
      variant: 'link',
      size: 'sm',
      css: {
        textStyle: 'xs',
      },
    },
    {
      variant: 'link',
      size: 'md',
      css: {
        textStyle: 'sm',
      },
    },
    {
      variant: 'link',
      size: 'lg',
      css: {
        textStyle: 'md',
      },
    },
    {
      variant: 'link',
      size: 'xl',
      css: {
        textStyle: 'md',
      },
    },
    {
      onlyIcon: true,
      size: 'sm',
      css: {
        paddingBlock: '2',
        paddingInline: '2',
      },
    },
    {
      onlyIcon: true,
      size: 'md',
      css: {
        paddingBlock: '2.5',
        paddingInline: '2.5',
      },
    },
    {
      onlyIcon: true,
      size: 'lg',
      css: {
        paddingBlock: '3',
        paddingInline: '3',
      },
    },
    {
      onlyIcon: true,
      size: 'xl',
      css: {
        paddingBlock: '3.5',
        paddingInline: '3.5',
      },
    },
    {
      variant: 'link',
      css: {
        paddingBlock: '0',
        paddingInline: '0',
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    width: 'auto',
    onlyIcon: false,
  },
  staticCss: ['*'],
});
