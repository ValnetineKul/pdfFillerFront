import { defineSemanticTokens } from '@pandacss/dev';

import { colors } from './colors';
import { gradients } from './gradients';
import { shadows } from './shadows';
import { spacing } from './spacing';

export const semanticTokens = defineSemanticTokens({
  colors,
  gradients,
  shadows,
  spacing,
});
