import { defineRecipe, defineSlotRecipe } from '@pandacss/dev';

export const accordionRecipe = defineSlotRecipe({
  className: 'accordion',
  slots: ['root', 'item', 'heading', 'content', 'icon', 'label', 'focusRing'],
  base: {
    root: {
      width: 'full',
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      width: 'full',
      display: 'flex',
      flexDirection: 'column',
      borderTopWidth: 'thin',
      borderColor: 'border.secondary',
      paddingTop: '6',
      paddingBottom: '8',
    },
    heading: {
      width: 'full',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '6',
      cursor: 'pointer',
      _disabled: { cursor: 'not-allowed' },
      _focusVisible: {
        boxShadow: 'focusRing.gray.400',
      },
    },
    content: {
      textStyle: 'md',
      color: 'text.tertiary',
      overflow: 'hidden',
      paddingRight: '8',
      marginTop: '2',
    },
    label: {
      display: 'flex',
      textAlign: 'left',
      flexGrow: '1',
      textStyle: 'lg',
      fontWeight: 'medium',
      color: 'text.primary',
    },
    icon: {
      display: 'flex',
      width: '6',
      flexGrow: 0,
      flexShrink: 0,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'fg.quinary',
      transition: '0.1s ease',
      transitionProperty: 'color',
      _hovered: {
        color: 'fg.primary',
        transition: '0.1s',
        transitionProperty: 'color',
      },
    },
  },
  variants: {
    position: {
      left: {
        heading: {
          flexDirection: 'row-reverse',
        },
      },
      right: {
        heading: {
          flexDirection: 'row',
        },
      },
    },
  },
  staticCss: ['*'],
});

export const accordionItemIndicatorRecipe = defineRecipe({
  className: 'accordion-item-indicator',
  base: {
    display: 'flex',
    width: '6',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'fg.quinary',
    transition: '0.1s ease',
    transitionProperty: 'color',
  },
  variants: {
    isHovered: {
      true: {
        color: 'fg.primary',
        transition: '0.1s',
        transitionProperty: 'color',
      },
    },
    isFocusVisible: {
      true: {
        color: 'fg.primary',
        transition: '0.1s',
        transitionProperty: 'color',
      },
    },
    isDisabled: {
      true: { color: 'fg.quinary', cursor: 'not-allowed' },
    },
  },
  staticCss: ['*'],
});
