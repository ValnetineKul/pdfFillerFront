import { defineSemanticTokens } from '@pandacss/dev';

export const gradients = defineSemanticTokens.gradients({
  linearGradient: {
    primary: {
      value:
        'linear-gradient(239deg, {colors.brand.600} 0%, {colors.brand.800} 100%)',
    },
  },
});
