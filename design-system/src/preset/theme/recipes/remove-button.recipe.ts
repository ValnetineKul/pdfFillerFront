import { defineSlotRecipe } from '@pandacss/dev';

export const removeButtonRecipe = defineSlotRecipe({
  className: 'remove-button',
  slots: ['root', 'icon'],
  base: {
    root: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'removeButton.root',
      outlineWidth: 'none',
      cursor: 'pointer',
    },
  },
  variants: {
    colorScheme: {
      dark: {
        root: {
          color: 'removeButton.grayLight.color',
          _hovered: {
            bgColor: 'removeButton.grayLight.bgHover',
            color: 'removeButton.grayLight.colorHover',
          },
        },
      },
      pale: {
        root: {
          color: 'removeButton.pale.color',
          _hovered: {
            bgColor: 'removeButton.pale.bgHover',
            color: 'removeButton.pale.colorHover',
          },
        },
      },
      grayLight: {
        root: {
          color: 'removeButton.grayLight.color',
          _hovered: {
            bgColor: 'removeButton.grayLight.bgHover',
            color: 'removeButton.grayLight.colorHover',
          },
        },
      },
      brand: {
        root: {
          color: 'removeButton.brand.color',
          _hovered: {
            bgColor: 'removeButton.brand.bgHover',
            color: 'removeButton.brand.colorHover',
          },
        },
      },
      error: {
        root: {
          color: 'removeButton.error.color',
          _hovered: {
            bgColor: 'removeButton.error.bgHover',
            color: 'removeButton.error.colorHover',
          },
        },
      },
      warning: {
        root: {
          color: 'removeButton.warning.color',
          _hovered: {
            bgColor: 'removeButton.warning.bgHover',
            color: 'removeButton.warning.colorHover',
          },
        },
      },
      success: {
        root: {
          color: 'removeButton.success.color',
          _hovered: {
            bgColor: 'removeButton.success.bgHover',
            color: 'removeButton.success.colorHover',
          },
        },
      },
      pink: {
        root: {
          color: 'removeButton.pink.color',
          _hovered: {
            bgColor: 'removeButton.pink.bgHover',
            color: 'removeButton.pink.colorHover',
          },
        },
      },
      purple: {
        root: {
          color: 'removeButton.purple.color',
          _hovered: {
            bgColor: 'removeButton.purple.bgHover',
            color: 'removeButton.purple.colorHover',
          },
        },
      },
      blue: {
        root: {
          color: 'removeButton.blue.color',
          _hovered: {
            bgColor: 'removeButton.blue.bgHover',
            color: 'removeButton.blue.colorHover',
          },
        },
      },
      rose: {
        root: {
          color: 'removeButton.rose.color',
          _hovered: {
            bgColor: 'removeButton.rose.bgHover',
            color: 'removeButton.rose.colorHover',
          },
        },
      },
      teal: {
        root: {
          color: 'removeButton.teal.color',
          _hovered: {
            bgColor: 'removeButton.teal.bgHover',
            color: 'removeButton.teal.colorHover',
          },
        },
      },
      custom: {
        root: {
          color: 'inherit',
        },
      },
    },
    size: {
      sm: { root: { height: '3.5', width: '3.5' }, icon: { iconSize: 'xs' } },
      md: { root: { height: '4', width: '4' }, icon: { iconSize: 'sm' } },
      lg: { root: { height: '4.5', width: '4.5' }, icon: { iconSize: 'md' } },
      xl: { root: { height: '5', width: '5' }, icon: { iconSize: 'lg' } },
    },
  },

  defaultVariants: {
    colorScheme: 'brand',
    size: 'md',
  },
  staticCss: ['*'],
});
