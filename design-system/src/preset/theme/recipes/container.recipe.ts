import { defineRecipe } from '@pandacss/dev';

export const containerRecipe = defineRecipe({
  className: 'container',
  staticCss: ['*'],
  base: {
    position: 'relative',
    marginInline: 'auto',
  },
  variants: {
    maxWidth: {
      w320: { maxWidth: 'breakpoint-w320' },
      w375: { maxWidth: 'breakpoint-w375' },
      w480: { maxWidth: 'breakpoint-w480' },
      w560: { maxWidth: 'breakpoint-w560' },
      w640: { maxWidth: 'breakpoint-w640' },
      w768: { maxWidth: 'breakpoint-w768' },
      w940: { maxWidth: 'breakpoint-w940' },
      w1024: { maxWidth: 'breakpoint-w1024' },
      w1280: { maxWidth: 'breakpoint-w1280' },
      w1366: { maxWidth: 'breakpoint-w1366' },
      w1440: { maxWidth: 'breakpoint-w1440' },
      w1680: { maxWidth: 'breakpoint-w1680' },
      w1920: { maxWidth: 'breakpoint-w1920' },
    },
  },
  defaultVariants: {
    maxWidth: 'w1920',
  },
});
