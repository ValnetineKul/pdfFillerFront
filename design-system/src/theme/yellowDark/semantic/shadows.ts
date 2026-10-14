import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  focusRing: {
    brand: {
      500: { value: '0 0 0 4px rgba(255, 241, 34, 0)' },
    },
  },
  glow: {
    xs: { value: '0px 2px 4px 0px rgba(78, 91, 166, 0)' },
    sm: { value: '0 0 8px 2px rgba(254, 173, 10, 0)' },
    md: { value: '0px 2px 16px 0px rgba(78, 91, 166, 0)' },
    lg: { value: '0 2px 32px 0 rgba(158, 119, 237, 0)' },
    xl: { value: '0px 2px 56px 0px rgba(78, 91, 166, 0)' },
  },
  custom: {
    glow: {
      sm: { value: '0 0 8px 2px rgba(254, 173, 10, 0.50)' },
      lg: { value: '0 0 16px 2px rgba(254, 173, 10, 0.80)' },
    },
  },
});
