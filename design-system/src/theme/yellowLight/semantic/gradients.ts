import { defineSemanticTokens } from '@pandacss/dev';

export const gradients = defineSemanticTokens.gradients({
  linearGradient: {
    primary: {
      value:
        'linear-gradient(270deg, {colors.grayLight.900} 0%, {colors.grayLight.950} 100%)',
    },
  },
});
