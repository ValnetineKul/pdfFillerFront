import { defineSemanticTokens } from '@pandacss/dev';

export const gradients = defineSemanticTokens.gradients({
  linearGradient: {
    primary: {
      value:
        'radial-gradient(50% 85% at 50% 50%, #343185 0%, #0E2248 50%, #070726 100%)',
    },
  },
  surface: {
    value:
      'radial-gradient(60% 30% at 85% 3.17%, rgba(76, 76, 255, 0.20) 0%, rgba(76, 76, 255, 0.00) 100%), linear-gradient(180deg, {colors.grayLight.950} 0%, #182339 100%)',
  },
  border: {
    value: 'linear-gradient(180deg, {colors.brand.600} 0%, #F7A809 100%)',
  },
});
