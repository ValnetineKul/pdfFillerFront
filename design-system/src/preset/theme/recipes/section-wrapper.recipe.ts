import { defineRecipe } from '@pandacss/dev';

export const sectionWrapperRecipe = defineRecipe({
  className: 'section-wrapper',
  staticCss: ['*'],
  base: {
    width: 'full',
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    position: 'relative',
    paddingY: '16',
    paddingX: '4',
    w768: {
      paddingY: '24',
    },
  },
  variants: {
    contentPositionY: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
    },
    contentPositionX: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
    },
    theme: {
      secondary: {
        backgroundColor: 'background.secondary',
      },
      brand: {
        backgroundColor: 'background.brand.section',
      },
    },
    viewType: {
      column: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        w768: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    },
    withClick: {
      true: {
        cursor: 'pointer',
      },
    },
  },
  defaultVariants: {
    contentPositionX: 'center',
    contentPositionY: 'center',
    viewType: 'column',
  },
});
