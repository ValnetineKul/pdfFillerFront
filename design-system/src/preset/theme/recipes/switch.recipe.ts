import { defineSlotRecipe } from '@pandacss/dev';

export const switchIndicatorRecipe = defineSlotRecipe({
  className: 'switch-indicator',
  slots: ['root', 'handle', 'label'],
  base: {
    root: {
      width: '9',
      height: '5',
      borderRadius: '3',
      backgroundColor: 'background.tertiary',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    },
    handle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginInline: '0.5',
      background: 'fg.white',
      width: '4',
      height: '4',
      boxShadow: 'sm',
      borderRadius: 'full',
      position: 'relative',
      transform: 'translateX(0)',
      transition: 'all 0.2s',
    },
    label: {
      width: 'full',
    },
  },
  variants: {
    isSelected: {
      true: {
        root: {
          backgroundColor: 'background.brand.solid',
          transition: 'all 0.2s',
        },
        handle: {
          transform: 'translateX(100%)',
        },
      },
    },
    isFocusVisible: {
      true: {
        root: {
          boxShadow: 'focusRing.gray.400',
        },
      },
    },
    isDisabled: {
      true: {
        root: {
          backgroundColor: 'background.tertiary',
        },
      },
    },
    isPending: {
      true: { root: { pointerEvents: 'none' } },
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      isPending: false,
      css: {
        root: {
          cursor: 'not-allowed',
          backgroundColor: 'background.tertiary',
        },
      },
    },
    {
      isPending: true,
      isSelected: true,
      css: {
        root: {
          backgroundColor: 'background.brand.solid',
        },
      },
    },
  ],
  staticCss: ['*'],
});

export const switchRecipe = defineSlotRecipe({
  className: 'switch',
  slots: ['root', 'description'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      color: 'text.secondary',
      textStyle: 'sm',
      fontWeight: 'medium',
      textAlign: 'left',
      gap: '3',
      width: 'fit',
    },
    description: {
      marginLeft: '12',
      display: 'block',
      color: 'text.tertiary',
      textStyle: 'sm',
      fontWeight: 'normal',
      textAlign: 'left',
    },
  },
  variants: {
    fullWidth: {
      true: {
        root: {
          width: 'full',
        },
      },
    },
    reverse: {
      true: {
        root: {
          flexDirection: 'row-reverse',
        },
        description: {
          marginLeft: '0',
          marginRight: '12',
        },
      },
    },
    isDisabled: {
      true: {
        root: {
          cursor: 'not-allowed',
        },
      },
    },
    isPending: {
      true: { root: { pointerEvents: 'none' } },
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      isPending: false,
      css: {
        root: {
          cursor: 'not-allowed',
        },
      },
    },
  ],
  staticCss: ['*'],
});
