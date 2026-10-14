import { defineSlotRecipe } from '@pandacss/dev';

export const navigationRecipe = defineSlotRecipe({
  className: 'navigation',
  slots: ['list'],
  base: {
    list: { display: 'flex', flexDirection: 'column', width: 'full' },
  },
  staticCss: ['*'],
});

export const navigationItemRecipe = defineSlotRecipe({
  className: 'navigation-item',
  slots: [
    'item',
    'contentWrapper',
    'dropdownWrapper',
    'content',
    'dot',
    'chevron',
    'badge',
    'text',
    'icon',
    'addon',
  ],
  base: {
    item: {
      width: 'full',
      display: 'flex',
      backgroundColor: 'background.primary',
      marginBlockEnd: '1',
      borderRadius: 'navigationItem.item',
      cursor: 'pointer',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'text.secondary',
      gap: '3',
    },
    content: {
      maxWidth: 'full',
      display: 'flex',
      textStyle: 'md',
      alignItems: 'center',
      gap: '3',
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexGrow: 1,
      fontWeight: 'semibold',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    dot: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: '0',
      right: '0',
      left: '50%',
      transform: 'translateX(var(--spacing-1))',
      color: 'fg.error.secondary',
      iconSize: 'xs',
      '& svg, path': {
        fill: '{colors.error.500}',
        stroke: 'none',
      },
    },
    dropdownWrapper: {
      display: 'flex',
      gap: '2',
      alignItems: 'center',
    },
    badge: {
      display: 'flex',
    },
    chevron: {
      transform: 'rotate(0)',
      color: 'currentColor',
    },
    addon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
  },
  variants: {
    isHovered: {
      true: {},
      false: {},
    },
    colorScheme: {
      gray: {},
      teal: {
        chevron: {
          color: 'navItem.teal.fg',
        },
      },
      rose: {
        chevron: {
          color: 'navItem.rose.fg',
        },
      },
      purple: {
        chevron: {
          color: 'navItem.purple.fg',
        },
      },
    },
    isExpanded: {
      true: {
        chevron: { transform: 'rotate(180deg)' },
      },
      false: {},
    },
    isPressed: {
      true: {},
      false: {},
    },
    isSelected: {
      true: {},
      false: {},
    },
    size: {
      sm: {},
      md: {},
    },
    iconType: {
      icon: {
        icon: {
          height: '6',
          width: '6',
        },
      },
      featuredIcon: {},
    },
    isCollapsed: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      isCollapsed: true,
      size: 'sm',
      iconType: 'icon',
      css: {
        item: {
          paddingInline: '2',
          paddingBlock: '2',
          maxWidth: '10',
        },
      },
    },
    {
      isCollapsed: true,
      size: 'md',
      iconType: 'icon',
      css: {
        item: {
          paddingInline: '4',
          paddingBlock: '4',
          maxWidth: '14',
        },
      },
    },
    {
      isCollapsed: true,
      size: 'sm',
      iconType: 'featuredIcon',
      css: {
        item: {
          paddingInline: '1',
          paddingBlock: '1',
          maxWidth: '10',
        },
      },
    },
    {
      isCollapsed: true,
      size: 'md',
      iconType: 'featuredIcon',
      css: {
        item: {
          paddingInline: '2',
          paddingBlock: '2',
          maxWidth: '14',
        },
      },
    },
    {
      isCollapsed: false,
      size: 'sm',
      css: {
        item: {
          paddingInline: '3',
          paddingBlock: '2',
        },
      },
    },
    {
      isCollapsed: false,
      size: 'md',
      css: {
        item: {
          paddingInline: '3',
          paddingBlock: '3',
        },
      },
    },
    {
      isHovered: true,
      colorScheme: 'gray',
      css: {
        item: {
          backgroundColor: 'background.primary.hover',
        },
      },
    },
    {
      isHovered: true,
      colorScheme: 'teal',
      css: {
        item: {
          backgroundColor: 'navItem.teal.hover.bg',
          color: 'navItem.teal.hover.color',
        },
      },
    },
    {
      isHovered: true,
      colorScheme: 'rose',
      css: {
        item: {
          backgroundColor: 'navItem.rose.hover.bg',
          color: 'navItem.rose.hover.color',
        },
      },
    },
    {
      isHovered: true,
      colorScheme: 'purple',
      css: {
        item: {
          backgroundColor: 'navItem.purple.hover.bg',
          color: 'navItem.purple.hover.color',
        },
      },
    },
    {
      isPressed: true,
      colorScheme: 'gray',
      css: {
        item: {
          backgroundColor: 'background.primary',
          boxShadow: 'focusRing.gray.400',
        },
      },
    },
    {
      isPressed: true,
      colorScheme: 'teal',
      css: {
        item: {
          backgroundColor: 'background.primary',
          boxShadow: 'focusRing.teal.500',
        },
      },
    },
    {
      isPressed: true,
      colorScheme: 'rose',
      css: {
        item: {
          backgroundColor: 'background.primary',
          boxShadow: 'focusRing.rose.500',
        },
      },
    },
    {
      isPressed: true,
      colorScheme: 'purple',
      css: {
        item: {
          backgroundColor: 'background.primary',
          boxShadow: 'focusRing.purple.500',
        },
      },
    },
    {
      isSelected: true,
      colorScheme: 'gray',
      css: {
        item: {
          backgroundColor: 'navItem.gray.selected.bg',
          color: 'navItem.gray.selected.color',
        },
        chevron: {
          color: 'navItem.gray.selected.color',
        },
      },
    },
    {
      isSelected: true,
      colorScheme: 'teal',
      css: {
        item: {
          backgroundColor: 'navItem.teal.selected.bg',
          color: 'navItem.teal.selected.color',
        },
      },
    },
    {
      isSelected: true,
      colorScheme: 'rose',
      css: {
        item: {
          backgroundColor: 'navItem.rose.selected.bg',
          color: 'navItem.rose.selected.color',
        },
      },
    },
    {
      isSelected: true,
      colorScheme: 'purple',
      css: {
        item: {
          backgroundColor: 'navItem.purple.selected.bg',
          color: 'navItem.purple.selected.color',
        },
      },
    },
    {
      colorScheme: 'gray',
      iconType: 'icon',
      css: {
        icon: {
          color: 'fg.quarterary',
        },
      },
    },
    {
      colorScheme: 'gray',
      iconType: 'featuredIcon',
      css: {
        icon: {
          color: 'fg.quarterary',
          backgroundColor: 'background.tertiary',
        },
      },
    },
    {
      colorScheme: 'teal',
      iconType: 'icon',
      css: {
        icon: { color: 'navItem.teal.fg' },
      },
    },
    {
      colorScheme: 'teal',
      iconType: 'featuredIcon',
      css: {
        icon: {
          color: 'featuredIcon.teal.fg',
          backgroundColor: 'featuredIcon.teal.bg',
        },
      },
    },
    {
      colorScheme: 'rose',
      iconType: 'icon',
      css: {
        icon: { color: 'navItem.rose.fg' },
      },
    },
    {
      colorScheme: 'rose',
      iconType: 'featuredIcon',
      css: {
        icon: {
          color: 'featuredIcon.rose.fg',
          backgroundColor: 'featuredIcon.rose.bg',
        },
      },
    },
    {
      colorScheme: 'purple',
      iconType: 'icon',
      css: {
        icon: { color: 'navItem.purple.fg' },
      },
    },
    {
      colorScheme: 'purple',
      iconType: 'featuredIcon',
      css: {
        icon: {
          color: 'featuredIcon.purple.fg',
          backgroundColor: 'featuredIcon.purple.bg',
        },
      },
    },
  ],
  defaultVariants: {
    colorScheme: 'gray',
    size: 'sm',
    iconType: 'icon',
    isCollapsed: false,
  },
  staticCss: ['*'],
});
