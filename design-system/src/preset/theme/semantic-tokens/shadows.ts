import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  focusRing: {
    brand: {
      500: { value: '0px 0px 0px 4px rgba(158, 119, 237, 0.24)' },
    },
    gray: {
      400: { value: '0px 0px 0px 4px rgba(152, 162, 179, 0.14)' },
      100: { value: '0px 1px 3px 0px rgba(16, 24, 40, 0.10)' },
    },
    error: {
      500: { value: '0px 0px 0px 4px rgba(240, 68, 56, 0.24)' },
    },
    teal: {
      500: { value: '0px 0px 0px 4px rgba(21, 183, 158, 0.24)' },
    },
    rose: {
      500: { value: '0px 0px 0px 4px rgba(246, 61, 104, 0.24)' },
    },
    purple: {
      500: { value: '0px 0px 0px 4px rgba(122, 90, 248, 0.24)' },
    },
  },
  glow: {
    xs: { value: '0px 2px 4px 0px rgba(158, 119, 237, 0.68)' },
    sm: { value: '0px 2px 8px 0px rgba(158, 119, 237, 0.68)' },
    md: { value: '0px 2px 16px 0px rgba(158, 119, 237, 0.68)' },
    lg: { value: '0px 2px 32px 0px rgba(158, 119, 237, 0.68)' },
    xl: { value: '0px 2px 56px 0px rgba(158, 119, 237, 0.68)' },
  },
});
