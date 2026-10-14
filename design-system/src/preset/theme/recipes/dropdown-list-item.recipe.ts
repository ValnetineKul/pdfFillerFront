import { defineSlotRecipe } from '@pandacss/dev';

export const dropDownListItem = defineSlotRecipe({
  className: 'dropDownListItem',
  slots: [
    'root',
    'optionContent',
    'selectedItemIndication',
    'beforeSlot',
    'afterSlot',
  ],
  base: {
    root: {
      marginBlock: '0.5',
      marginInline: '1.5',
      display: 'flex',
      flexWrap: 'nowrap',
      flexGrow: '1',
      rounded: 'dropDownListItem.root',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBlock: '2',
      paddingInline: '2',
      gap: '2',

      _disabled: {
        color: 'text.disabled',
        cursor: 'not-allowed',
      },
      _hovered: {
        bgColor: 'background.primary.hover',
      },
      _focusVisible: {
        bgColor: 'background.primary.pressed',
      },
      _selected: {
        bgColor: 'background.primary.hover',
        _hovered: {
          bgColor: 'background.primary.pressed',
        },
        _focusVisible: {
          bgColor: 'background.primary.pressed',
        },
      },
    },
    selectedItemIndication: {
      stroke: 'currentColor',
      color: 'fg.brand.primary',
      iconSize: 'md',
      flexShrink: '0',
      display: 'flex',
    },
    optionContent: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 'full',
      overflow: 'hidden',
      fontWeight: 'medium',
      gap: '2',
      cursor: 'default',
      flexGrow: 1,
      color: 'text.primary',
    },
    beforeSlot: {
      textAlign: 'center',
      minWidth: '3.5',
      color: 'fg.quarterary',
    },
    afterSlot: {
      textAlign: 'center',
      marginLeft: '1',
      minWidth: '3.5',
      color: 'fg.quarterary',
    },
  },
  variants: {
    size: {
      sm: {
        optionContent: { textStyle: 'sm' },
      },
      md: {
        optionContent: { textStyle: 'md' },
      },
      lg: {
        optionContent: { textStyle: 'lg' },
      },
    },
    isDisabled: {
      true: {
        root: { color: 'text.disabled', cursor: 'not-allowed' },
        beforeSlot: { color: 'text.disabled' },
        afterSlot: { color: 'text.disabled' },
        optionContent: { cursor: 'not-allowed', color: 'text.disabled' },
      },
    },
    isHovered: {
      true: {
        root: { bgColor: 'background.primary.hover' },
      },
    },
    isFocusVisible: {
      true: {
        root: { bgColor: 'background.primary.pressed' },
      },
    },
    isSelected: {
      true: {
        root: { bgColor: 'background.primary.hover' },
      },
    },
  },
  compoundVariants: [
    {
      isHovered: true,
      isSelected: true,
      css: {
        root: { bgColor: 'background.primary.pressed' },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
  staticCss: ['*'],
});
