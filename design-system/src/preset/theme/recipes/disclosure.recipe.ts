import { defineSlotRecipe } from '@pandacss/dev';

export const disclosureRecipe = defineSlotRecipe({
  className: 'disclosure',
  slots: ['trigger', 'description', 'icon', 'chevronIcon', 'label'],
  base: {
    trigger: {
      width: 'full',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      paddingBlock: '2',
      borderRadius: 'disclosure.trigger',
      cursor: 'pointer',
      _focusVisible: {
        boxShadow: 'focusRing.gray.400',
        '& [slot="label"]': {
          color: 'disclosure.text.focus',
        },
        '& [slot="icon"]': {
          color: 'disclosure.icon.focus',
        },
      },
      _hover: {
        _notPressed: {
          '& [slot="label"]': {
            color: 'disclosure.text.hover',
          },
          '& [slot="icon"]': {
            color: 'disclosure.icon.hover',
          },
        },
      },
      _pressed: {
        '& [slot="label"]': {
          color: 'disclosure.text.pressed',
        },
        '& [slot="icon"]': {
          color: 'disclosure.icon.pressed',
        },
      },
    },
    label: {
      color: 'disclosure.text',
      textStyle: 'sm',
      fontWeight: 'medium',
      alignSelf: 'center',
    },
    icon: {
      iconSize: 'md',
      color: 'disclosure.icon',
    },
    chevronIcon: {
      marginInlineStart: 'auto',
      transition: 'transform 0.2s ease',
      _motionReduce: {
        transition: 'none',
      },
    },
    description: {
      textStyle: 'sm',
      color: 'disclosure.description',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      _motionReduce: {
        transition: 'none',
      },
    },
  },
  variants: {
    isDisabled: {
      true: {
        trigger: {
          cursor: 'not-allowed',
          _hover: {
            background: 'transparent',
          },
        },
        label: {
          color: 'disclosure.text.disabled',
        },
        icon: {
          color: 'disclosure.icon.disabled',
        },
      },
    },
    isExpanded: {
      true: {
        chevronIcon: { transform: 'rotate(180deg)' },
        description: {
          opacity: 1,
          paddingBlockStart: '2',
        },
      },
    },
    variant: {
      default: {
        trigger: {
          background: 'disclosure.bg',
          paddingInline: '2',
          _focusVisible: {
            background: 'disclosure.bg.focus',
          },
          _pressed: {
            background: 'disclosure.bg.pressed',
          },
          _hover: {
            _notPressed: {
              background: 'disclosure.bg.hover',
            },
          },
          _disabled: {
            background: 'disclosure.bg.disabled',
          },
        },
        description: {
          paddingInline: '2',
        },
      },
      plain: {
        trigger: {
          paddingInline: '0',
          _hover: {
            background: 'transparent',
          },
        },
        description: {
          paddingInline: '0',
        },
      },
    },
  },
  staticCss: ['*'],
});
