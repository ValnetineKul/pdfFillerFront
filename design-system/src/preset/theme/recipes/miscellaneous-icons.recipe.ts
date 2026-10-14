import { defineSlotRecipe } from '@pandacss/dev';

export const miscellaneousIconsRecipe = defineSlotRecipe({
  className: 'miscellaneousIcons',
  slots: ['root', 'icon'],
  base: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'full',
      backgroundColor: 'white',
      padding: 1,
    },
    icon: {
      stroke: 'currentColor',
    },
  },
  variants: {
    size: {
      xs: {
        root: {
          width: 5,
          height: 5,
        },
        icon: {
          width: 2.5,
          height: 2.5,
          strokeWidth: '1.67',
        },
      },
      sm: {
        root: {
          width: 6,
          height: 6,
        },
        icon: {
          width: 3,
          height: 3,
          strokeWidth: '2.1',
        },
      },
      md: {
        root: {
          width: 7,
          height: 7,
        },
        icon: {
          width: 3.5,
          height: 3.5,
          strokeWidth: '2.33',
        },
      },
      lg: {
        root: {
          width: 8,
          height: 8,
        },
        icon: {
          width: 4,
          height: 4,
          strokeWidth: '2.67',
        },
      },
    },
    type: {
      primary: {
        root: {
          backgroundColor: 'miscellaneousIcons.brand.bg',
        },
        icon: {
          color: 'miscellaneousIcons.brand.fg',
        },
      },
      success: {
        root: {
          backgroundColor: 'miscellaneousIcons.success.bg',
        },
        icon: {
          color: 'miscellaneousIcons.success.fg',
        },
      },
      pale: {
        root: {
          backgroundColor: 'miscellaneousIcons.pale.bg',
        },
        icon: {
          color: 'miscellaneousIcons.pale.fg',
        },
      },
    },
  },
  staticCss: ['*'],
  defaultVariants: {
    size: 'md',
    type: 'success',
  },
});
