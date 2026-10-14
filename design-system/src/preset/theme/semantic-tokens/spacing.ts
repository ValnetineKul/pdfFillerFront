import { defineSemanticTokens } from '@pandacss/dev';

export const spacing = defineSemanticTokens.spacing({
  none: { value: '{spacing.0}' },
  noneValue: { value: 'none' },
});
