import { defineSemanticTokens } from '@pandacss/dev';

import { colors } from './colors';
import { gradients } from './gradients';
import { radii } from './radii';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { fonts } from './typography';

export const semanticTokens = defineSemanticTokens({
  colors,
  fonts,
  gradients,
  radii,
  shadows,
  spacing,
});
