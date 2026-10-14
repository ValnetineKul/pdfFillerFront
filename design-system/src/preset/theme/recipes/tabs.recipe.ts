import { defineSlotRecipe } from '@pandacss/dev';

export const tabsRecipe = defineSlotRecipe({
  className: 'tabs',
  slots: [
    'wrapper',
    'list',
    'item',
    'leftButton',
    'rightButton',
    'scrollChevronIcon',
  ],
  base: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      width: 'full',
      position: 'relative',
    },
    leftButton: {
      position: 'absolute',
      left: '0',
      zIndex: 2,
    },
    rightButton: {
      position: 'absolute',
      right: '0',
      zIndex: 2,
    },
    scrollChevronIcon: {
      iconSize: 'md',
    },
    list: {
      flex: '1',
      width: 'full',
      display: 'flex',
      gap: '1',
      scrollPadding: '3',
      scrollSnapType: 'x mandatory',
    },
    item: {
      position: 'relative',
      textAlign: 'center',
      color: 'fg.quinary',
      cursor: 'pointer',
      outline: 'none',
      fontWeight: 'semibold',
      textStyle: 'sm',
      paddingBlock: '1',
      scrollSnapAlign: 'center',

      '@media (hover: hover)': {
        _hover: {
          color: 'fg.brand.primary',
        },
      },
      flexShrink: 0,
    },
  },
  variants: {
    variant: {
      buttonWhiteBorder: {
        leftButton: {
          backgroundColor: 'background.secondary.alt',
          borderRadius: 'tabs.leftButton.buttonWhiteBorder',
        },
        rightButton: {
          backgroundColor: 'background.secondary.alt',
          borderRadius: 'tabs.rightButton.buttonWhiteBorder',
        },
        wrapper: {
          borderStyle: 'solid',
          borderWidth: 'thin',
          borderRadius: 'tabs.wrapper.buttonWhiteBorder',
          borderColor: 'border.secondary',
          backgroundColor: 'background.secondary.alt',
          paddingBlock: '1',
          paddingInline: '1',
        },
        item: {
          display: 'flex',
          paddingInline: '3',
          paddingBlock: '2',
          justifyContent: 'center',
          alignItems: 'center',
          rounded: 'tabs.item.buttonWhiteBorder',
          color: 'text.tertiary',
          marginBlock: '0.25',

          _first: {
            marginLeft: '0.25',
          },

          _last: {
            marginRight: '0.25',
          },

          _selected: {
            boxShadow: 'sm',
            base: {
              backgroundColor: 'tab.border.current.bg',
              color: 'text.secondary',
            },
            _hovered: {
              backgroundColor: 'tab.border.current.bgHover',
            },
            _focusVisible: {
              backgroundColor: 'tab.border.current.bgFocus',
            },
          },
          _focusVisible: {
            boxShadow: 'focusRing.gray.400',
            backgroundColor: 'tab.border.default.bgFocus',
          },
          _hovered: {
            backgroundColor: 'tab.border.default.bgHover',
            boxShadow: 'sm',
            color: 'text.secondary',
          },
        },
      },
      buttonFilledGray: {
        wrapper: {
          rounded: 'tabs.wrapper.buttonFilledGray',
          backgroundColor: 'tab.basic.default.bg',
          paddingBlock: '1',
          paddingInline: '1',
        },
        leftButton: {
          bgColor: 'tab.basic.default.scrollButtonsBg',
          borderRadius: 'tabs.leftButton.buttonFilledGray',
        },
        rightButton: {
          bgColor: 'tab.basic.default.scrollButtonsBg',
          borderRadius: 'tabs.rightButton.buttonFilledGray',
        },
        item: {
          display: 'flex',
          paddingInline: '3',
          paddingBlock: '2',
          justifyContent: 'center',
          alignItems: 'center',
          rounded: 'tabs.item.buttonFilledGray',
          color: 'text.tertiary',

          flexShrink: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',

          _selected: {
            base: {
              backgroundColor: 'tab.basic.current.bgHover',
              color: 'text.secondary',
            },
            _hovered: {
              backgroundColor: 'tab.basic.current.bgHover',
            },
            _focusVisible: {
              backgroundColor: 'tab.basic.current.bgFocus',
            },
          },

          _hovered: {
            backgroundColor: 'tab.basic.default.bgHover',
          },
          _focusVisible: {
            boxShadow: 'focusRing.gray.400',
            backgroundColor: 'tab.basic.default.bgFocus',
          },
        },
      },
      modern: {
        leftButton: {
          paddingRight: 2,
          bgColor: 'tab.basic.default.scrollButtonsBg',
          borderRadius: 'tabs.leftButton.modern',
        },
        rightButton: {
          paddingLeft: 2,
          bgColor: 'tab.basic.default.scrollButtonsBg',
          borderRadius: 'tabs.rightButton.modern',
        },
        wrapper: {
          padding: 'tabs.modern.shadowOffset',
          margin: '-tabs.modern.shadowOffset',
        },
        list: {
          padding: 'tabs.modern.shadowOffset',
          margin: '-tabs.modern.shadowOffset',
        },
        item: {
          paddingInline: '4',
          paddingBlock: '2.5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          rounded: 'tabs.item.modern',
          color: 'tab.modern.default.fg',
          flexShrink: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          backgroundColor: 'tab.modern.default.bg',
          borderWidth: 'thin',
          boxShadow: 'xs',
          borderColor: 'tab.modern.default.border',

          _selected: {
            color: 'tab.modern.current.fg',
            backgroundColor: 'tab.modern.current.bg',
            borderColor: 'tab.modern.current.border',
            boxShadow: 'custom.glow.sm',

            '@media (hover: hover)': {
              _hovered: {
                color: 'tab.modern.current.fgHover',
                backgroundColor: 'tab.modern.current.bgHover',
                borderColor: 'tab.modern.current.borderHover',
              },
              _focusVisible: {
                color: 'tab.modern.current.fgFocus',
                backgroundColor: 'tab.modern.current.bgFocus',
                borderColor: 'tab.modern.current.borderFocus',
                boxShadow: 'focusRing.brand.500',
              },
            },
          },
          '@media (hover: hover)': {
            _hovered: {
              color: 'tab.modern.default.fgHover',
              backgroundColor: 'tab.modern.default.bgHover',
              borderColor: 'tab.modern.default.borderHover',
            },
            _focusVisible: {
              color: 'tab.modern.default.fgFocus',
              borderColor: 'tab.modern.default.borderFocus',
              backgroundColor: 'tab.modern.default.focus.bg',
              boxShadow: 'focusRing.default.bgFocus',
            },
          },
        },
      },
    },
    size: {
      xs: {
        wrapper: {
          height: '10',
          maxHeight: '10',
          padding: '0',
        },
        list: {
          display: 'flex',
          alignItems: 'center',
          marginLeft: '0.5',
        },
        item: {
          height: '8',
          minHeight: '8',
          maxHeight: '8',
          boxSizing: 'border-box',
          marginBlock: '0',
          textStyle: 'sm',
        },
      },
      sm: {
        item: { textStyle: 'sm' },
      },
      md: {
        item: { textStyle: 'md' },
      },
    },
    hasScrollButton: {
      true: {
        leftButton: {
          display: 'flex',
        },
        rightButton: {
          display: 'flex',
        },
      },
      false: {
        leftButton: {
          display: 'none',
        },
        rightButton: {
          display: 'none',
        },
      },
    },
    orientation: {
      horizontal: {
        wrapper: {
          flexDirection: 'row',
        },
      },
      vertical: {
        wrapper: {
          flexDirection: 'column',
        },
        list: {
          flexDirection: 'column',
        },
      },
    },
    grow: {
      true: {
        item: { flexGrow: 1 },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'buttonWhiteBorder',
      size: 'sm',
      css: {
        wrapper: { paddingBlock: '1', paddingInline: '1' },
      },
    },
    {
      variant: 'buttonWhiteBorder',
      size: 'md',
      css: {
        wrapper: { paddingBlock: '1.5', paddingInline: '1.5' },
      },
    },
    {
      variant: 'modern',
      size: 'sm',
      css: {
        item: { paddingInline: '3', paddingBlock: '2' },
      },
    },
    {
      variant: 'modern',
      size: 'md',
      css: {
        item: { paddingInline: '4', paddingBlock: '2.5' },
      },
    },
    {
      variant: 'modern',
      hasScrollButton: true,
      css: {
        wrapper: {
          borderRadius: 'tabs.wrapper.modern',
        },
        leftButton: {
          borderRadius: 'tabs.leftButton.modernScroll',
        },
        rightButton: {
          borderRadius: 'tabs.rightButton.modernScroll',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'sm',
    orientation: 'horizontal',
    grow: false,
  },
  staticCss: ['*'],
});
