import { defineSemanticTokens } from '@pandacss/dev';

export const aspectRatios = defineSemanticTokens.aspectRatios({
  square: { value: '1 / 1' },
  '16/9': { value: '16 / 9' },
  '4/3': { value: '4 / 3' },
  '21/9': { value: '21 / 9' },
});
