import { defineTokens } from '@pandacss/dev';

export const shadows = defineTokens.shadows({
  hiddenAutoFill: { value: '0 0 0 50px rgb(255, 255, 255) inset' },
  xs: { value: '0 1px 2px 0 rgba(16, 24, 40, 0.05)' },
  sm: {
    value:
      '0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0px rgba(16, 24, 40, 0.10)',
  },
  md: {
    value:
      '0 2px 4px -2px rgba(16, 24, 40, 0.06), 0 4px 8px -2px rgba(16, 24, 40, 0.10)',
  },
  lg: {
    value:
      '0 12px 16px -4px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.08)',
  },
  xl: {
    value:
      '0 8px 8px -4px rgba(16, 24, 40, 0.03), 0 20px 24px -4px rgba(16, 24, 40, 0.08)',
  },
  '2xl': { value: '0 24px 48px -12px rgba(16, 24, 40, 0.18)' },
  '3xl': { value: '0 32px 64px -12px rgba(16, 24, 40, 0.14)' },
});
