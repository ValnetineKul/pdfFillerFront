import { defineTokens } from '@pandacss/dev';

import { blurs } from './blurs';
import { borderWidths } from './border-widths';
import { colors } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { sizes } from './sizes';
import { spacing } from './spacing';
import { fonts, fontWeights } from './typography';

export const tokens = defineTokens({
  blurs,
  borderWidths,
  colors,
  fontWeights,
  fonts,
  radii,
  shadows,
  sizes,
  spacing,
});
