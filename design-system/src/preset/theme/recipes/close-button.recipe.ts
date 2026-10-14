import { defineSlotRecipe } from '@pandacss/dev';

export const closeButtonRecipe = defineSlotRecipe({
  slots: ['root', 'icon'],
  className: 'close-button',
  base: {
    root: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'closeButton',
      outlineWidth: 'none',
      cursor: 'pointer',
      color: 'fg.quinary',
      zIndex: '1',
      _hovered: {
        color: 'fg.quinary.hover',
        bgColor: 'background.primary.hover',
      },
      _focus: {
        bgColor: 'background.primary',
        boxShadow: 'focusRing.gray.400',
        _pressed: {
          bgColor: 'background.primary.pressed',
          boxShadow: 'none',
        },
      },
    },
    icon: {
      iconSize: 'md',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          width: '9',
          height: '9',
        },
      },
      md: {
        root: {
          width: '10',
          height: '10',
        },
      },
      lg: {
        root: {
          width: '11',
          height: '11',
        },
        icon: {
          iconSize: 'xl',
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
  staticCss: ['*'],
});
