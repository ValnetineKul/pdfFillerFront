import { defineRecipe } from '@pandacss/dev';

export const featuredIconRecipe = defineRecipe({
  className: 'featured-icon',
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    colorScheme: {
      primary: {
        backgroundColor: 'featuredIcon.brand.bg',
        color: 'featuredIcon.brand.fg',
      },
      secondary: {
        backgroundColor: 'featuredIcon.pale.bg',
        color: 'featuredIcon.pale.fg',
      },
      error: {
        backgroundColor: 'featuredIcon.error.bg',
        color: 'featuredIcon.error.fg',
      },
      warning: {
        backgroundColor: 'featuredIcon.warning.bg',
        color: 'featuredIcon.warning.fg',
      },
      success: {
        backgroundColor: 'featuredIcon.success.bg',
        color: 'featuredIcon.success.fg',
      },
      teal: {
        backgroundColor: 'featuredIcon.teal.bg',
        color: 'featuredIcon.teal.fg',
      },
      rose: {
        backgroundColor: 'featuredIcon.rose.bg',
        color: 'featuredIcon.rose.fg',
      },
      purple: {
        backgroundColor: 'featuredIcon.purple.bg',
        color: 'featuredIcon.purple.fg',
      },
      unset: {},
    },
    type: {
      circle: { borderRadius: 'featuredIcon.circle' },
      square: { borderRadius: 'featuredIcon.square' },
      modern: {
        borderRadius: 'featuredIcon.modern',
        borderWidth: 'thin',
        boxShadow: 'xs',
        backgroundColor: 'featuredIcon.modern.bg',
        borderColor: 'featuredIcon.modern.border',
        color: 'featuredIcon.modern.fg',
      },
    },
    size: {
      xs: {
        height: '6',
        width: '6',
        '--icon-size': 'sizes.3',
      },
      sm: {
        height: '8',
        width: '8',
        '--icon-size': 'sizes.4',
      },
      md: {
        height: '10',
        width: '10',
        '--icon-size': 'sizes.5',
      },
      lg: {
        height: '12',
        width: '12',
        '--icon-size': 'sizes.6',
      },
      xl: {
        height: '14',
        width: '14',
        '--icon-size': 'sizes.7',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'unset',
    size: 'md',
    type: 'circle',
  },
  staticCss: ['*'],
});
