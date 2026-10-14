import { defineSemanticTokens } from '@pandacss/dev';

export const zIndex = defineSemanticTokens.zIndex({
  hover: { value: '1' },
  modal: { value: '1000' },
  toast: { value: '10000' },
});
