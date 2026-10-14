import { defineRecipe } from '@pandacss/dev';

const colorSchemes = [
  'dark',
  'grayLight',
  'brand',
  'error',
  'warning',
  'success',
  'pink',
  'purple',
  'blue',
  'rose',
  'teal',
  'custom',
] as const;

export const badgeRecipe = defineRecipe({
  className: 'badge',
  base: {
    fontWeight: 'medium',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    outlineWidth: 'none',
    borderStyle: 'solid',
  },
  variants: {
    type: {
      pill: { borderRadius: '10' },
      badge: { borderRadius: 'badge.badgeType' },
      label: { borderRadius: '120' },
    },
    border: {
      thin: { borderWidth: 'thin' },
      medium: { borderWidth: 'medium' },
    },
    colorScheme: Object.fromEntries(
      colorSchemes.map((scheme) => [
        scheme,
        {
          color: `badge.${scheme}.color`,
          backgroundColor: `badge.${scheme}.bg`,
          borderColor: `badge.${scheme}.border`,
        },
      ]),
    ),
    size: {
      xs: {
        textStyle: 'xxs',
        gap: '1',
        paddingInline: '1.5',
        '&:has([slot="nestedBadge"])': {
          paddingInline: '1',
        },
      },
      sm: {
        textStyle: 'xs',
        gap: '1',
        paddingInline: '2',
        paddingBlock: '0.5',
      },
      md: {
        textStyle: 'sm',
        gap: '1',
        paddingInline: '2',
        paddingBlock: '0.5',
      },
      lg: {
        textStyle: 'sm',
        gap: '1.5',
        paddingInline: '2.5',
        paddingBlock: '1',
      },
    },
  },
  compoundVariants: colorSchemes.map((colorScheme) => ({
    type: 'label',
    colorScheme,
    css: {
      base: {
        color: `badge.${colorScheme}.flatText`,
        backgroundColor: `badge.${colorScheme}.flatBg`,
        borderColor: `badge.${colorScheme}.flatBg`,
      },
    },
  })),
  defaultVariants: {
    colorScheme: 'brand',
    size: 'md',
    border: 'thin',
    type: 'pill',
  },
  staticCss: ['*'],
});
