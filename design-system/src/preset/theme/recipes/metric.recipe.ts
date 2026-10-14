import { defineRecipe, defineSlotRecipe } from '@pandacss/dev';

export const metricGroupRecipe = defineRecipe({
  className: 'metric',
  staticCss: ['*'],
  base: {
    display: 'grid',
    width: 'full',
    gridTemplateColumns: {
      base: 'repeat(var(--base-columns, 1), minmax(0, 1fr))',
      '@/w320': 'repeat(var(--w320-columns), minmax(0, 1fr))',
      '@/w375': 'repeat(var(--w375-columns), minmax(0, 1fr))',
      '@/w480': 'repeat(var(--w480-columns), minmax(0, 1fr))',
      '@/w560': 'repeat(var(--w560-columns), minmax(0, 1fr))',
      '@/w640': 'repeat(var(--w640-columns), minmax(0, 1fr))',
      '@/w768': 'repeat(var(--w768-columns), minmax(0, 1fr))',
      '@/w940': 'repeat(var(--w940-columns), minmax(0, 1fr))',
      '@/w1024': 'repeat(var(--w1024-columns), minmax(0, 1fr))',
      '@/w1280': 'repeat(var(--w1280-columns), minmax(0, 1fr))',
      '@/w1366': 'repeat(var(--w1366-columns), minmax(0, 1fr))',
      '@/w1440': 'repeat(var(--w1440-columns), minmax(0, 1fr))',
      '@/w1680': 'repeat(var(--w1680-columns), minmax(0, 1fr))',
      '@/w1920': 'repeat(var(--w1920-columns), minmax(0, 1fr))',
    },
    borderRadius: 'var(--gridBorderRadius)',
    gap: 'var(--gridGap)',
  },
});

export const metricItemRecipe = defineSlotRecipe({
  slots: ['container', 'title', 'image', 'content'],
  staticCss: ['*'],
  className: 'metrics-item',
  base: {
    container: {
      paddingTop: '8',
      paddingBottom: '8',
      paddingLeft: '6',
      paddingRight: '6',
      display: 'flex',
      gap: '1',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 'var(--borderToken)',
      background: 'var(--bgItemGradient)',
      wordBreak: 'break-all',
    },
    image: {
      maxHeight: '10',
    },
    title: {
      textStyle: 'display.xl',
      color: 'text.brand.tertiary',
    },
    content: {
      color: 'text.primary',
    },
  },
});
