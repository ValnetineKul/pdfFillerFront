import { defineConfig } from '@pandacss/dev';

import { defaultPreset } from './design-system/src/preset';
import { yellowLight } from './design-system/src/theme/yellowLight';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', './design-system/src/**/*.{ts,tsx}'],
  exclude: ['./design-system/src/**/*.stories.{ts,tsx}'],
  presets: [defaultPreset],
  outdir: 'styled-system',
  jsxFramework: 'react',
  themes: {
    extend: {
      yellowLight,
    },
  },
  staticCss: {
    themes: ['yellowLight'],
  },
});
