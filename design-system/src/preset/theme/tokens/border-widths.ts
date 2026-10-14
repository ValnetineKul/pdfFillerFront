import { defineTokens } from '@pandacss/dev';

import { spacing } from './spacing';

export const borderWidths = defineTokens.borderWidths({
  ...spacing,
  none: { value: '0' },
  thin: { value: '1px' },
  medium: { value: '1.5px' },
  thick: { value: '2px' },
});
