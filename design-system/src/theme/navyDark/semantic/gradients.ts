import { defineSemanticTokens } from '@pandacss/dev';

export const gradients = defineSemanticTokens.gradients({
  linearGradient: {
    primary: {
      value:
        'linear-gradient(270deg, {colors.grayBlue.600} 0%, {colors.grayBlue.800} 100%)',
    },
  },
});
