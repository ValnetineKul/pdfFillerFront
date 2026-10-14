import { defineSemanticTokens } from '@pandacss/dev';

import { aspectRatios } from './aspect-ratios';
import { colors } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { sizes } from './sizes';
import { spacing } from './spacing';
import { fonts } from './typography';
import { zIndex } from './z-index';

export const semanticTokens = defineSemanticTokens({
  aspectRatios,
  colors,
  radii,
  shadows,
  sizes,
  spacing,
  zIndex,
  fonts,
});
