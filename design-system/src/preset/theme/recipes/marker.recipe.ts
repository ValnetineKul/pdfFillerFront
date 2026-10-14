import { defineSlotRecipe } from '@pandacss/dev';

export const markerRecipe = defineSlotRecipe({
  className: 'marker',
  slots: ['root', 'text'],
  base: {
    root: {
      background: 'marker.bg',
    },
    text: {
      color: 'marker.fg',
      textStyle: 'xs',
    },
  },

  variants: {
    type: {
      dot: {
        root: {
          display: 'block',
          width: '2',
          height: '2',
          borderRadius: '50%',
        },
      },
      counter: {
        root: {
          paddingInline: '1',
          paddingBlock: '0.5',
          borderRadius: '2',
          height: '4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  },
  staticCss: ['*'],
  defaultVariants: {
    type: 'dot',
  },
});
