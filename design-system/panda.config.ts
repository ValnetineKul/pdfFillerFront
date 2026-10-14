import { defineConfig } from '@pandacss/dev';

import { defaultPreset } from './src/preset';
import { navyDark } from './src/theme/navyDark';
import { tealDark } from './src/theme/tealDark';
import { yellowDark } from './src/theme/yellowDark';
import { yellowLight } from './src/theme/yellowLight';

export default defineConfig({
  preflight: true,
  include: [
    './src/components/**/*.stories.{ts,tsx}',
    './src/preset/**/*.{ts,tsx}',
    './src/theme/**/*.{ts,tsx}',
  ],
  exclude: [],
  presets: [defaultPreset],
  outdir: 'styled-system',
  themes: {
    extend: {
      yellowLight,
      navyDark,
      tealDark,
      yellowDark,
    },
  },
  staticCss: {
    patterns: {
      scrollable: ['*'],
    },
    themes: ['yellowLight', 'navyDark', 'tealDark', 'yellowDark'],
  },
  jsxFramework: 'react',
});
