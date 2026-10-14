import { defineTokens } from '@pandacss/dev';

export const fonts = defineTokens.fonts({
  primary: { value: ['Inter Variable', 'sans-serif'] },
});

export const fontWeights = defineTokens.fontWeights({
  normal: { value: '400' },
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
});
