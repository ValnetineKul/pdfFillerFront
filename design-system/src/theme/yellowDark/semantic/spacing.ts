import { defineSemanticTokens } from '@pandacss/dev';

export const spacing = defineSemanticTokens.spacing({
  tabs: {
    modern: {
      shadowOffset: { value: '{sizes.2}' },
    },
  },
});
