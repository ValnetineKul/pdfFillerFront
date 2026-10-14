import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  focusRing: {
    brand: {
      500: { value: '0px 0px 0px 4px rgba(23, 131, 142, 0.24)' },
    },
  },
  glow: {
    xs: { value: '0px 2px 4px 0px rgba(23, 131, 142, 0.68)' },
    sm: { value: '0px 2px 8px 0px rgba(23, 131, 142, 0.68)' },
    md: { value: '0px 2px 16px 0px rgba(23, 131, 142, 0.68)' },
    lg: { value: '0px 2px 32px 0px rgba(23, 131, 142, 0.68)' },
    xl: { value: '0px 2px 56px 0px rgba(23, 131, 142, 0.68)' },
  },
});
