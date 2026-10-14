import { defineSlotRecipe } from '@pandacss/dev';

export const featuredCardRecipe = defineSlotRecipe({
  className: 'featuring-card',
  slots: ['root', 'label', 'description', 'icon', 'content'],
  base: {
    root: {
      display: 'flex',
      justifyContent: 'start',
      gap: '3',
      borderRadius: 'featuredCard.root',
      outlineWidth: 'thin',
      outlineColor: 'border.secondary',
      backgroundColor: 'background.primary',
      alignItems: 'center',
      padding: '3',
      outlineStyle: 'solid',
      minHeight: '16',
    },
    label: {
      display: 'block',
      textStyle: 'sm',
      fontWeight: 'semibold',
      wordBreak: 'break-word',
      color: 'text.secondary',
    },
    description: {
      color: 'text.tertiary',
      textStyle: 'sm',
      wordBreak: 'break-word',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  variants: {
    isSelected: {
      true: {
        root: {
          outlineColor: 'border.brand',
          backgroundColor: 'featuredCard.bg',
          color: 'text.brand.primary',
        },

        label: {
          color: 'text.brand.primary',
        },
        description: {
          color: 'text.brand.secondary',
        },
      },
    },
    isPressed: {
      true: {
        root: {
          outlineColor: 'border.brand',
          boxShadow: 'focusRing.brand.500',
          outlineWidth: 'thick',
        },
      },
    },
    isHovered: {
      true: {
        root: {
          outlineStyle: 'solid',
          outlineColor: 'featuredCard.borderHover',
          outlineWidth: 'thick',
        },
      },
    },
    withoutBorder: {
      true: {
        root: {
          outline: 'none',
        },
      },
    },
    isFocusVisible: {
      true: {
        root: { boxShadow: 'focusRing.brand.500' },
      },
    },
  },
  compoundVariants: [
    {
      isHovered: true,
      isSelected: true,
      css: {
        root: { boxShadow: 'focusRing.brand.500' },
      },
    },
  ],
  staticCss: ['*'],
});
