import { defineTokens } from '@pandacss/dev';

import { spacing } from './spacing';

export const sizes = defineTokens.sizes({
  ...spacing,
});
