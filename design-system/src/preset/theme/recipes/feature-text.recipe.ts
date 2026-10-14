import { defineSlotRecipe } from '@pandacss/dev';

export const featureTextRecipe = defineSlotRecipe({
  className: 'feature-text',
  slots: ['root', 'icon', 'content', 'title', 'text', 'button'],
  base: {
    root: {
      containerType: 'inline-size',
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
    },
    content: {
      '& > *:last-child': {
        marginBlockEnd: '0',
      },
    },
    title: {
      textStyle: {
        base: 'lg',
        '@/w375': 'xl',
      },
      color: 'text.primary',
      fontWeight: 'semibold',
      marginBlockEnd: {
        base: '2',
        '@/w375': '3',
      },
    },
    text: {
      textStyle: 'md',
      color: 'text.tertiary',
      marginBlockEnd: {
        base: '4',
        '@/w375': '5',
      },
    },
  },
  variants: {
    align: {
      start: {
        root: {
          alignItems: 'start',
          textAlign: 'start',
        },
      },
      center: {
        root: {
          alignItems: 'center',
          textAlign: 'center',
        },
      },
      end: {
        root: {
          alignItems: 'end',
          textAlign: 'end',
        },
      },
    },
  },
  defaultVariants: {
    align: 'start',
  },
  staticCss: ['*'],
});
