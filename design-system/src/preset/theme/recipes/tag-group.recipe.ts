import { defineSlotRecipe } from '@pandacss/dev';

export const tagGroupRecipe = defineSlotRecipe({
  className: 'tag-group',
  slots: ['group', 'list', 'item'],
  base: {
    group: {
      display: 'flex',
      alignItems: 'center',
    },
    list: {
      gap: '1',
      display: 'inline-flex',
      flexWrap: 'wrap',
    },
    item: {
      color: 'tag.default.fg',
      cursor: 'default',
      fontWeight: 'medium',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      outlineWidth: 'none',
      borderStyle: 'solid',
      borderRadius: 'tagGroup.item',
      borderWidth: 'thin',
      borderColor: 'tag.default.border',
      bgColor: 'tag.default.bg',
      _hovered: {
        bgColor: 'tag.hover.bg',
        borderColor: 'tag.hover.border',

        _pressed: {
          bgColor: 'tag.pressed.bg',
          borderColor: 'tag.pressed.border',
          color: 'tag.pressed.fg',
        },
      },
      _selected: {
        borderColor: 'tag.selected.border',

        _hovered: {
          borderColor: 'tag.selected.border',
          bgColor: 'tag.hover.bg',

          _pressed: {
            bgColor: 'tag.pressed.bg',
            borderColor: 'tag.selected.border',
            color: 'tag.pressed.fg',
          },
        },
      },
      _pressed: {
        bgColor: 'tag.pressed.bg',
        borderColor: 'tag.pressed.border',
        color: 'tag.pressed.fg',
      },
      _focusVisible: { boxShadow: 'focusRing.gray.400' },
    },
  },
  variants: {
    size: {
      sm: {
        item: {
          textStyle: 'xs',
          gap: '1',
          paddingInline: '2',
          paddingBlock: '0.75',
        },
      },
      md: {
        item: {
          textStyle: 'sm',
          gap: '1.25',
          paddingInline: '2.25',
          paddingBlock: '0.5',
        },
      },
      lg: {
        item: {
          textStyle: 'sm',
          gap: '1.5',
          paddingInline: '2.5',
          paddingBlock: '1',
        },
      },
      xl: {
        item: {
          textStyle: 'sm',
          gap: '2',
          paddingInline: '3',
          paddingBlock: '2',
        },
      },
    },
    isScrollable: {
      true: {
        list: {
          flexWrap: 'nowrap',
          scrollPadding: '3',
          scrollSnapType: 'x mandatory',
        },
        item: {
          flexShrink: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          scrollSnapAlign: 'center',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  staticCss: ['*'],
});
